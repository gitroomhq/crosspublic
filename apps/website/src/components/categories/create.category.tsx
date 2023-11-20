"use client";

import {wrapModal} from "@meetqa/website/src/helpers/wrap.modal";
import {useForm} from "react-hook-form";
import {Editor} from "@meetqa/website/src/helpers/editor";
import {useFetch} from "@meetqa/website/src/helpers/fetch.context";
import {Button} from "@meetqa/website/src/components/utils/button";
import {useCallback, useEffect, useState} from "react";

export const CreateCategory = wrapModal<{cat?: string}>((props) => {
  const fetchObject = useFetch();
  const {cat} = props;
  const [loading, setLoading] = useState(!!cat);
  const {formState, register, handleSubmit} = useForm();
  const [editorValue, setEditorValue] = useState('');
  const editor = register('editor', {required: true, minLength: 3});
  const name = register("name", {
    required: true,
    minLength: 3,
  });

  const submit = async (values: any) => {
    try {
      const {data, status} = cat ? await fetchObject.put(`/categories/${cat}`, values) : await fetchObject.post('/categories', values);
      if (status === 200 || status === 201) {
        props?.modal?.resolve(data);
      }
      props?.modal?.remove();
    }
    catch (err) {}
  }

  const loadCategories = useCallback(async () => {
    if (!cat) {
      return ;
    }
    const {data: {name: nameValue, description: descriptionValue}} = await fetchObject.get(`/categories/${cat}`);
    await name.onChange({target: {name: 'name', value: nameValue}});
    await editor.onChange({target: {name: 'editor', value: descriptionValue}});
    setEditorValue(descriptionValue);
    setLoading(false);
  }, [cat]);

  useEffect(() => {
    loadCategories();
  }, [cat]);

  if (loading) {
    return <></>;
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="min-w-[600px]">
      <div className="mb-4">
        <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
          Category Name
        </label>
        <input
          {...name}
          className="p-3 novel-w-full novel-border-stone-200 novel-bg-white sm:novel-rounded-lg sm:novel-border sm:novel-shadow-lg flex-1"
          id="name"
          name="name"
          type="text"
          placeholder="Category Name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
          Description
        </label>
        <Editor value={editorValue} setValue={(e: string) => editor.onChange({target: {name: 'editor', value: e}})} />
      </div>
      <div className="flex items-center justify-between">
        <Button
          className="w-full h-full"
          type="submit"
          disabled={!formState.isValid}
        >
          {cat ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  )
});
