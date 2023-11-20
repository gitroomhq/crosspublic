import {wrapModal} from "@meetqa/website/src/helpers/wrap.modal";
import {useForm} from "react-hook-form";
import {Editor} from "@meetqa/website/src/helpers/editor";
import {useFetch} from "@meetqa/website/src/helpers/fetch.context";
import {Button} from "@meetqa/website/src/components/utils/button";
import {useCallback, useEffect, useState} from "react";

export const CreateFAQ = wrapModal<{faq?: string, cat?: string}>((props) => {
  const axios = useFetch();
  const {faq, cat} = props;
  const [loading, setLoading] = useState(!!faq);
  const {formState, register, handleSubmit} = useForm();
  const [editorValue, setEditorValue] = useState('');
  const editor = register('editor', {required: true, minLength: 3});
  const name = register("name", {
    required: true,
    minLength: 3,
  });

  const submit = async (values: any) => {
    try {
      const {data, status} = faq ? await axios.put(`/faq/${faq}`, {
        question: values.name,
        answer: values.editor,
        categoryId: cat,
      }) : await axios.post('/faq', {
        question: values.name,
        answer: values.editor,
        categoryId: cat,
      });
      if (status === 200 || status === 201) {
        props?.modal?.resolve(data);
      }
      props?.modal?.remove();
    }
    catch (err) {}
  }

  const loadFaq = useCallback(async () => {
    if (!faq) {
      return ;
    }
    const {data: {title: nameValue, content: descriptionValue}} = await axios.get(`/faq/${faq}`);
    await name.onChange({target: {name: 'name', value: nameValue}});
    await editor.onChange({target: {name: 'editor', value: descriptionValue}});
    setEditorValue(descriptionValue);
    setLoading(false);
  }, [faq]);

  useEffect(() => {
    loadFaq();
  }, [faq]);

  if (loading) {
    return <></>;
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-[800px] min-w-[800px] h-[80vh] w-full flex flex-col">
      <div className="flex-1 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-scroll overflow-x-hidden">
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
              FAQ Name
            </label>
            <input
              {...name}
              className="p-3 novel-w-full novel-border-stone-200 novel-bg-white sm:novel-rounded-lg sm:novel-border sm:novel-shadow-lg flex-1"
              id="name"
              name="name"
              type="text"
              placeholder="FAQ Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
              Description
            </label>
            <Editor value={editorValue} setValue={(e: string) => editor.onChange({target: {name: 'editor', value: e}})} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <Button
          className="w-full h-full"
          type="submit"
          disabled={!formState.isValid}
        >
          {faq ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  )
});
