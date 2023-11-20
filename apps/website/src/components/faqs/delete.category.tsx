"use client";

import {wrapModal} from "@meetqa/website/src/helpers/wrap.modal";
import {ExtendedCategory} from "@meetqa/website/src/components/faqs/faq.component";
import {FieldValues, useForm} from "react-hook-form";
import {useCallback} from "react";
import {useFetch} from "@meetqa/website/src/helpers/fetch.context";

export const DeleteCategory = wrapModal<{cat?: string, isFaq?: boolean, categories?: ExtendedCategory[]}>((props) => {
  const {modal, isFaq, categories} = props;
  const axios = useFetch();
  const {handleSubmit, register, formState} = useForm();
  const submitForm = useCallback(async (data: FieldValues) => {
    await axios.delete(`/categories/${props.cat}`, {data});
    modal?.resolve({
      from: props.cat,
      to: data?.category
    });

    modal?.remove();
  }, []);

  return (
    <div className="swal2-container swal2-center" onClick={() => modal?.remove()}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          aria-labelledby="swal2-title"
          aria-describedby="swal2-html-container"
          className="swal2-popup swal2-modal swal2-icon-warning swal2-show grid"
          tabIndex={-1}
          role="dialog"
          aria-live="assertive"
          aria-modal="true"
        >
          <form onSubmit={handleSubmit(submitForm)} className="w-full flex flex-col">
            <div
              className="swal2-icon swal2-warning swal2-icon-show flex"
            >
              <div className="swal2-icon-content">!</div>
            </div>
            <h2 className="swal2-title" id="swal2-title">
              Are you sure?
            </h2>
            <div
              className="swal2-html-container"
              id="swal2-html-container"
            >
              {isFaq ? 'There are some FAQ in this category, where should we move them?' : 'You won\'t be able to revert this!'}
            </div>
            {isFaq && (
              <select
                id="swal2-select"
                className="swal2-select border border-gray rounded-xl"
                {...register('category', {required: isFaq})}
              >
                <option value="">Select a category</option>
                {categories?.map((c) => (
                  <option key={c.name} value={c.id}>{c.name}</option>
                ))}
              </select>
            )}
            <div className="swal2-actions flex">
              <div className="swal2-loader" />
              <button
                type="submit"
                className="swal2-confirm swal2-styled inline-block"
                aria-label=""
                disabled={!formState.isValid}
              >
                {isFaq ? 'Yes, delete and move' : 'Yes, delete it!'}
              </button>
              <button
                type="button"
                className="swal2-cancel swal2-styled inline-block"
                aria-label=""
                onClick={() => modal?.remove()}
              >
                No, cancel!
              </button>
            </div>
            <div className="swal2-timer-progress-bar-container" />
          </form>
        </div>
    </div>
  );
});
