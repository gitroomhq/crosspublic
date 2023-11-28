import {Category} from "@prisma/client";
import {ChangeEvent, useCallback, useMemo} from "react";
import NiceModal from "@ebay/nice-modal-react";
import {CreateCategory} from "@meetfaq/website/src/components/categories/create.category";

export const CategoriesSelectComponent = (props: {current: Category|undefined, categories: Category[], addToList: (categories: Category) => void, setCategory: (categories: Category|undefined) => void}) => {
  const value = useMemo(() => {
    return props?.current?.id;
  }, [props.current]);
  const setSelect = useCallback(async (e: ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      props.setCategory(undefined);
      return;
    }
    if (e.target.value === 'new') {
      const createCat: Category = await NiceModal.show(CreateCategory, {title: 'Create a new category'});
      props.addToList(createCat);
      props.setCategory(createCat);
      return false;
    }

    const category = props.categories.find(cat => cat.id === e.target.value);
    if (category) {
      props.setCategory(category);
    }
  }, []);
  return (
    <select value={value} onChange={setSelect} className="p-3 novel-w-full novel-border-stone-200 novel-bg-white sm:novel-rounded-lg sm:novel-border sm:novel-shadow-lg flex-1">
      <option value="">Select Category</option>
      <option value="new">Create a new category</option>
      {props.categories.map((category) => (
        <option key={category.id} value={category.id}>{category.name}</option>
      ))}
    </select>
  )
}
