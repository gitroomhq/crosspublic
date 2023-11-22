"use client";

import { MouseEventHandler } from "react";

/**
 * @description FAQ component
 * @param {Object} props question: string, id: string, children: any
 * @returns JSX.Element
 */
export default function Faq({question, id, children}: {question: string, id: string, children: any}) {
    /**
     * @description handle click event on the FAQ component
     * @param {MouseEventHandler} event event that was triggered
     */
    function handleClick(event: MouseEventHandler<HTMLDivElement> | any): void {
        let { target } = event; // element that was clicked
        let classList: DOMTokenList = target.classList; // classlist of the element

        // if the element that was clicked doesn't have the id of the parent element,
        // get the parent element and get the classlist of the parent element
        // repeat until the element has the id of the parent element
        // the parent element is the element that contains the answer and the icon
        while (!classList.contains(id)) {
            target = getParentElement(target);
            classList = target.classList;
        }

        const parentElement: HTMLElement = target; // parent element of target
        const answer: HTMLElement | null | any = parentElement.querySelector(".faq-answer"); // answer that will be opened or closed
        const icon: HTMLElement | null | any = parentElement.querySelector(".arrow-down"); // icon that will be rotated

        if ( icon !== null && icon.classList.contains("rotate-180") && answer !== null) {
            // if the answer is open, close the answer and rotate the icon
            answer.style.maxHeight = '0';
            icon.classList.replace("rotate-180", "rotate-0");
        } else { // if the answer is closed, get all the children of the parent element in an array...
            let children: Element[] = [];
            if (parentElement.parentNode !== null) {
                children = [...parentElement.parentNode.children];
            }

            children.forEach((childElement: any) => { // loop through the children
                if (childElement !== parentElement) {
                    // if the child isn't the parent element, close the answer of that child and rotate the icon
                    childElement.querySelector(".faq-answer").style.maxHeight = 0;
                    childElement.querySelector(".arrow-down").classList.replace("rotate-180", "rotate-0");
                } else {
                    // if the child is the parent element, open the answer and rotate the icon
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    icon.classList.replace("rotate-0", "rotate-180");
                }
            })
        }
    }

    /**
     * @description get the parent element of the element that passed as a parameter
     * @param {EventTarget | null} element element that will be used to get the parent element
     * @returns
     */
    function getParentElement(element: EventTarget | null): HTMLElement | null {
        if (element !== null && element instanceof HTMLElement) return element.parentElement;
        return null;
    }

    return (
        <div className={id} onClick={ handleClick.bind(handleClick)  }>
            <dl className="faq mx-auto max-w-2xl">
                <dt className="text-lg">
                    <button type="button" className="flex w-full items-start justify-between py-6 text-left text-gray-400" aria-controls={id} data-active="false">
                        <span className="font-medium text-gray-900 dark:text-white">
                            {question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                            <svg className="arrow-down h-6 w-6 rotate-0 transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </span>
                    </button>
                </dt>
                <dd className="faq-answer block max-h-0 overflow-hidden pr-12 duration-300 ease-in-out" id={id}>
                    {children}
                </dd>
            </dl>
        </div>
    )
}
