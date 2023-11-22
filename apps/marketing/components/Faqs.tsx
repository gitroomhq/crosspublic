import Faq from "./Faq";

export default function Faqs() {
    return (
        <>
            <div className="mt-20 md:mt-32 flex flex-col gap-12 lg:flex-row">
                <div className="text-center lg:w-5/12 lg:pl-12 lg:text-left">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl lg:text-4xl">Frequently Asqued Questions</h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">piente optio repellendus atque illum odio! Fugiat at expedita deserunt dolorum molestias.</p>
                </div>
                <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800 lg:w-7/12">
                    <Faq id="faq-1" question="How to customize the template ?">
                        <p className="pb-6 text-base text-gray-600 dark:text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum quod pariatur possimus at fugit natus aspernatur molestiae. Velit, odio modi provident necessitatibus molestias qui voluptatibus similique magnam a nam rem!</p>
                    </Faq>
                    <Faq id="faq-2" question="How many times can I use the template ?">
                        <div className="pb-6 text-base text-gray-600 dark:text-gray-400">
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum quod pariatur possimus at fugit natus aspernatur molestiae. Velit, odio modi provident necessitatibus molestias qui voluptatibus similique magnam a nam rem!</p>
                            <ul className="mt-4 list-outside list-disc pl-4">
                                <li>Item 1</li>
                                <li>Item 2</li>
                                <li>Item 3</li>
                                <li>Item 4</li>
                            </ul>
                        </div>
                    </Faq>
                    <Faq id="faq-3" question="How to customize the template ?">
                        <p className="pb-6 text-base text-gray-600 dark:text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum quod pariatur possimus at fugit natus aspernatur molestiae. Velit, odio modi provident necessitatibus molestias qui voluptatibus similique magnam a nam rem!</p>
                    </Faq>
                    <Faq id="faq-4" question="How to customize the template ?">
                        <p className="pb-6 text-base text-gray-600 dark:text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum quod pariatur possimus at fugit natus aspernatur molestiae. Velit, odio modi provident necessitatibus molestias qui voluptatibus similique magnam a nam rem!</p>
                    </Faq>
                    <Faq id="faq-5" question="How to customize the template ?">
                        <p className="pb-6 text-base text-gray-600 dark:text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum quod pariatur possimus at fugit natus aspernatur molestiae. Velit, odio modi provident necessitatibus molestias qui voluptatibus similique magnam a nam rem!</p>
                    </Faq>
                </div>
            </div>
        </>
    )
}