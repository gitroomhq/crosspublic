import {useCallback, useEffect, useState} from "react";
import { Oval } from 'react-loader-spinner'
import {useFetch} from "@meetfaq/panel/src/helpers/fetch.context";
import {Editor} from "@meetfaq/panel/src/helpers/editor";
import {Category} from "@prisma/client";
import {CategoriesSelectComponent} from "@meetfaq/panel/src/components/categories/categories.select.component";
import Swal from "sweetalert2";
import {Button} from "@meetfaq/panel/src/components/utils/button";
import {Block} from "@meetfaq/panel/src/components/utils/block";

export function Question (props: {question: string, addQuestion: (question: string) => void}) {
    const {question, addQuestion} = props;
    const [selected, setSelected] = useState(false);

    return (
      <>
        <div onClick={() => {
            setSelected(!selected);
            addQuestion(question);
        }}
         className={`border border-[#000]/5 p-2 rounded-container text-sm hover:bg-btnHover hover:text-white cursor-pointer ${selected ? 'bg-btn text-white' : 'bg-white'}`}>
            <strong>{question}</strong>
        </div>
      </>
    )
}

export function ShowEditor(props: {
  categories: Category[],
  index: number,
  question: string,
  totalQuestions: number,
  remove: () => void;
  messagesList: any[]
}) {
    const {index, question, categories, totalQuestions, messagesList} = props;
    const [categoriesState, setCategoriesState] = useState<Category[]>(categories);
    const [loading, setLoading] = useState(true);
    const [editorValue, setEditorValue] = useState(``);
    const [currentCat, setCurrentCat] = useState<undefined|Category>();
    const fetchObject = useFetch();
    const [newQuestionValue, setNewQuestionValue] = useState(question);

    const addToList = useCallback((category: Category) => {
        setCategoriesState((prev) => [...prev, category]);
    }, [categoriesState]);

    const loadAnswer = useCallback(async () => {
        setLoading(true);
        try {
          const {data: {answer}} = await fetchObject.post('/faq/answers', {question: newQuestionValue, messagesList});
          setEditorValue(answer.trim());
        }
        catch (err) {}
        setLoading(false);
    }, [newQuestionValue, messagesList]);

    useEffect(() => {
        loadAnswer();
    }, []);

    const save = useCallback(() => {
      if (!currentCat || !editorValue || !newQuestionValue) {
        return;
      }

      fetchObject.post('/faq', {question: newQuestionValue, answer: editorValue, categoryId: currentCat.id});
      Swal.fire({
        title: 'Success!',
        text: 'Your FAQ has been added',
        icon: 'success',
        confirmButtonText: 'Ok'
      });

      props.remove();
    }, [currentCat]);

    if (loading) {
        return (
            <div>
                <div className="my-5"><strong>[{index + 1}/{totalQuestions}]</strong> {newQuestionValue}</div>
                <div className="relative">
                    <Oval color="#412AFB" secondaryColor="#412AFB" strokeWidth={5} />
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className="my-5"><strong>[{index + 1}/{totalQuestions}]</strong></div>
            <div className="flex mb-5">
                <input className="p-3 novel-w-full novel-border-stone-200 novel-bg-white sm:novel-rounded-lg sm:novel-border sm:novel-shadow-lg flex-1" type="text" value={newQuestionValue} onChange={(e) => setNewQuestionValue(e.target.value)} />
                <div className="ml-3">
                  <CategoriesSelectComponent addToList={addToList} categories={categoriesState} current={currentCat} setCategory={setCurrentCat} />
                </div>
                <div>
                    <Button className="ml-3 h-full" onClick={loadAnswer}>Regenerate</Button>
                </div>
            </div>
            <div className="relative">
                <Editor value={editorValue} setValue={setEditorValue} />
            </div>
            <div className="mt-5 w-[150px]">
              <Button onClick={save}>Add to FAQ!</Button>
            </div>
        </div>
    )
}
export function MessageWizard(props: {id: string, messagesList: any[], categories: Category[]}) {
    const {messagesList, categories} = props;
    const fetchObject = useFetch();
    const [loadingStepOne, setLoadingStepOne] = useState(false);
    const [questions, setQuestions] = useState([] as Array<{question: string}>);
    const [selectedQuestions, setSelectedQuestions] = useState([] as string[]);

    const addOrRemoveQuestion = useCallback((question: string) => {
        if (selectedQuestions.includes(question)) {
            setSelectedQuestions(selectedQuestions.filter(q => q !== question));
        } else {
            setSelectedQuestions([...selectedQuestions, question]);
        }
    }, [selectedQuestions]);

    const sendMessages = useCallback(async () => {
        setLoadingStepOne(true);
        setSelectedQuestions([]);
        setQuestions([]);
        try {
          const {data} = await fetchObject.post('/faq/jobs/questions', {messagesList: messagesList.filter(f => !f.deleted)});
          setQuestions(data.questions);
        }
        catch (err) {
          setSelectedQuestions([]);
          setQuestions([]);
        }
        setLoadingStepOne(false);
    }, [messagesList]);

    return (
        <Block className="flex-1">
            <strong>Step 1</strong>
            <div className="my-5">Delete irrelevant messages from the right menu.</div>
            <div className="w-[150px]">
              <Button loading={loadingStepOne} onClick={sendMessages} className="bg-btn">
                I am done!
              </Button>
            </div>
            {questions.length > 0 && (
                <div className="mt-5 pt-5 border-t border-t-[#000]/5 mr-4">
                    <strong>Step 2</strong>
                    <div className="my-5">Select the questions you want to answer based on the context of the conversation</div>
                    <div className="space-y-3 mt-5">
                        {questions.map(question => (
                            <Question addQuestion={addOrRemoveQuestion} key={question.question} question={question.question} />
                        ))}
                    </div>
                </div>
            )}
            {selectedQuestions.length > 0 && (
                <div className="mt-5 pt-5 border-t border-t-[#000]/5 mr-4">
                    <strong>Step 3</strong>
                    {selectedQuestions.map((question, index) => (
                        <ShowEditor
                            remove={() => {
                              setSelectedQuestions(selectedQuestions.filter(q => q !== question));
                              setQuestions(questions.filter(q => q.question !== question));
                            }}
                            key={question}
                            question={question}
                            index={index}
                            totalQuestions={selectedQuestions.length}
                            categories={categories}
                            messagesList={messagesList}
                        />
                    ))}
                </div>
            )}
        </Block>
    )
}
