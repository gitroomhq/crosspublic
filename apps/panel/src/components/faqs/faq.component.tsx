"use client";

import {createContext, FC, useCallback, useContext, useEffect, useState} from "react";
import {Category, Faq} from "@prisma/client";
import {closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import {useFetch} from "@meetfaq/panel/src/helpers/fetch.context";
import {deleteDialog} from "@meetfaq/panel/src/helpers/delete.dialog";
import {Button} from "@meetfaq/panel/src/components/utils/button";
import {CreateCategory} from "@meetfaq/panel/src/components/categories/create.category";
import {DivModal} from "@meetfaq/panel/src/components/utils/div.modal";
import {EditComponent} from "@meetfaq/panel/src/components/icons/edit.component";
import {DeleteComponent} from "@meetfaq/panel/src/components/icons/delete.component";
import {MoveComponent} from "@meetfaq/panel/src/components/icons/move.component";
import {DeleteCategory} from "@meetfaq/panel/src/components/faqs/delete.category";
import {useRouter} from "next/navigation";
import {CreateFAQ} from "@meetfaq/panel/src/components/faqs/create.faq";
import {ChangeCategory} from "@meetfaq/panel/src/components/categories/change.category";
import {wrapMeta} from "@meetfaq/panel/src/helpers/wrap.meta";

export const CategoriesContext = createContext<ExtendedCategory[]>([]);

export interface ExtendedCategory extends Category {
  faqs: Array<{
    faq: Faq
  }>
}

const FaqComponent = wrapMeta<{categories: ExtendedCategory[]}>((props) => {
  const {categories} = props;
  const fetchObject = useFetch();
  const [items, setItems] = useState(categories);
  useEffect(() => {
    setItems(categories);
  }, [categories]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addToList = useCallback((category: Category) => {
    setItems((items) => {
      return [...items, {...category, faqs: []}];
    });
  }, [items]);

  const handleDragEnd = (event: any) => {
    const {active, over} = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(p => p.id === active.id);
        const newIndex = items.findIndex(p => p.id === over.id);
        const move = arrayMove(items, oldIndex, newIndex);
        const dbOrderUpdate = move.filter((m, index) => {
          return m.id !== items[index].id;
        }).map(p => ({id: p.id, order: move.indexOf(p) + 1}));

        fetchObject.post('/categories/order', {order: dbOrderUpdate});

        return move;
      });
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-end">
        <Button
            className="mb-5"
            modal={{
               component: CreateCategory,
               callback: addToList,
               args: {title: 'Create a new category'}
            }}
        >Create a new category</Button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
          <CategoriesContext.Provider value={items}>
            {items.map(cat => (
              <Categories key={cat.id} cat={cat} id={cat.id} />
            ))}
          </CategoriesContext.Provider>
        </SortableContext>
      </DndContext>
    </div>
  )
});

export const Categories: FC<{cat: ExtendedCategory, id: string}> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  const fetchObject = useFetch();
  const {cat} = props;
  const [catState, setCatState] = useState(cat);
  useEffect(() => {
    setCatState(cat);
    setFaq(cat.faqs.map(p => p.faq));
  }, [cat]);
  const [faq, setFaq] = useState<any[]>([]);
  const categories = useContext(CategoriesContext);
  const router = useRouter();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updateCat = useCallback(async (values: any) => {
    setCatState((cat) => {
      return {...cat, ...values};
    });
  }, []);

  const handleDragEnd = (event: any) => {
    const {active, over} = event;

    if (active.id !== over.id) {
      setFaq((items) => {
        const oldIndex = items.findIndex(p => p.id === active.id);
        const newIndex = items.findIndex(p => p.id === over.id);
        const move = arrayMove(items, oldIndex, newIndex);
        const dbOrderUpdate = move.filter((m, index) => {
          return m.id !== items[index].id;
        }).map(p => ({id: p.id, order: move.indexOf(p) + 1}));

        fetchObject.post('/faq/order', {order: dbOrderUpdate});
        return move;
      });
    }
  }

  const deleteFAQ = (faqProp: Faq) => () => {
    setFaq((items) => {
      return items.filter(p => p.id !== faqProp.id);
    });
  }

  const style = {
    transform: CSS.Transform.toString(transform)?.split(' ')?.slice(0, -1)?.join(' '),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className="mb-5 relative flex flex-col bg-white py-[23px] px-[30px] rounded-container p-4 select-none"
      style={{
        ...style,
      }}
    >
      <div className="relative flex items-center justify-between">
        <div className="flex items-center w-full">
          <div {...attributes} {...listeners} className="cursor-move text-secondary">
            <MoveComponent className="w-6 h-6" />
          </div>
          <div className="ml-2 flex flex-1 text-navy-700 items-center">
            <div className="text-xl font-bold">
              {catState.name}
            </div>
            <DivModal modal={{
              component: CreateCategory,
              callback: updateCat,
              args: {title: 'Edit category', cat: catState.id}
            }} className="ml-2">
              <EditComponent />
            </DivModal>
            <DivModal
              className="flex-1 ml-2"
              modal={{
                component: DeleteCategory,
                callback: () => router.refresh(),
                args: {
                  title: 'Delete category',
                  cat: catState.id,
                  isFaq: cat.faqs.length > 0,
                  categories: categories.filter(f => f.id !== catState.id)
                }
              }}
            >
              <DeleteComponent />
            </DivModal>
          </div>
          <div>
            <Button modal={{
              component: CreateFAQ,
              callback: (faq: Faq) => setFaq((items) => [...items, faq]),
              args: {title: 'Create a new faq', cat: catState.id}
            }} className="ml-2" btnStyle="secondary" size="small">Create a new faq</Button>
          </div>
        </div>
      </div>
      {!!faq.length &&
        (
          <div className="h-full overflow-x-scroll xl:overflow-x-hidden">
            <table
              role="table"
              className="mt-8 h-max w-full"
              color="gray-500"
            >
              <thead>
              <tr role="row">
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray/20 pr-32 pb-[10px] text-start dark:!border-navy-700 "
                  style={{ cursor: "pointer" }}
                >
                  <div className="text-xs font-bold tracking-wide text-gray-600">
                    NAME
                  </div>
                </th>
              </tr>
              </thead>
              <tbody role="rowgroup">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={faq}
                  strategy={verticalListSortingStrategy}
                >
                  {faq.map(faq => (
                    <Faqs key={faq.id} faq={faq} id={faq.id} cat={cat.id} deleteFAQFunc={deleteFAQ(faq)} />
                  ))}
                </SortableContext>
              </DndContext>
              </tbody>
            </table>
          </div>
        )}
    </div>
  )
}

export const Faqs: FC<{faq: Faq, cat: string, id: string, deleteFAQFunc: () => void}> = (props) => {
  const {faq, cat, deleteFAQFunc} = props;
  const [faqState, setFaqState] = useState(faq);
  const categories = useContext(CategoriesContext);
  const router = useRouter();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: props.id,
    transition: {
      duration: 150, // milliseconds
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  });
  const fetchObject = useFetch();

  const style = {
    transform: CSS.Transform.toString(transform)?.split(' ')?.slice(0, -1)?.join(' '),
    transition,
  };

  const deleteFaq = useCallback(async () => {
    try {
      const success = await deleteDialog('You will not be able to recover this faq!');
      await fetchObject.delete(`/faq/${faqState.id}`);
      success();
      deleteFAQFunc();
    }
    catch (err) {}
  }, [faqState]);

  return (
    <tr key={faqState.id} ref={setNodeRef} style={style}>
      <td role="cell" className="pt-[14px] pb-3 text-[14px] hover:bg-[#efefef]">
        <div className="text-sm font-normal text-navy-700 dark:text-white flex items-center">
          <div {...attributes} {...listeners}>
            <MoveComponent
              className="w-3 h-3 text-secondary" />
          </div>
          <div className="ml-2 flex items-center w-full">
            <div>
              {faqState.title}
            </div>
            <DivModal modal={{
              component: CreateFAQ,
              callback: (val) => {
                setFaqState((faq) => {
                  return {...faq, ...val};
                });
              },
              args: {title: 'Edit faq', faq: faqState.id, cat}
            }} className="ml-2">
              <EditComponent />
            </DivModal>
            <div className="ml-2 flex-1">
              <DeleteComponent onClick={deleteFaq} />
            </div>
            <div className="ml-2">
              <ChangeCategory categories={categories.filter(p => p.id !== cat)} faq={faqState.id} changeCategory={() => router.refresh()} />
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default FaqComponent;
