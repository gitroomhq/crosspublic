import Container from "./Container";
import Button from "./Button";
import Faqs from "./Faqs";

export default function Princing() {
    return (
        <div className="relative pt-32 md:pt-44" id="pricing">
            <div aria-hidden="true" className="absolute inset-0 m-auto grid h-max w-full grid-cols-2 -space-x-52 opacity-40 dark:opacity-80">
                <div className="h-56 bg-gradient-to-br from-primary to-purple-400 blur-[106px] dark:from-blue-700"></div>
                <div className="h-32 bg-gradient-to-r from-cyan-400 to-sky-300 blur-[106px] dark:to-indigo-600"></div>
            </div>
            <Container>
                <div className="m-auto text-center lg:w-8/12 xl:w-7/12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">Start managing your company smarter today</h2>
                </div>
                <div className="mt-12 md:mt-20">
                    <div className="relative rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/20 transition duration-500 dark:border-white/10 dark:bg-gray-900 dark:shadow-none">
                        <div className="flex flex-col gap-12 divide-y p-12 dark:divide-gray-800 md:flex-row md:divide-y-0 md:divide-x">
                            <div className="text-center md:w-5/12 flex flex-col gap-2">
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Start for free</h3>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                  Start with our free plan
                                </p>
                                <p className="text-lg text-gray-600 dark:text-gray-300 flex-1">
                                  Or <a href="https://github.com/github-20k/meetqa" className="underline hover:font-bold">self-host the project</a>
                                </p>
                                <div className="flex justify-center">
                                    <Button Element="a" to="/register" label="Get started" emphasis="primary" ui={"max"}/>
                                </div>
                            </div>
                            <div className="relative md:w-7/12 md:pl-12">
                                <ul role="list" className="space-y-4 py-6 text-gray-600 dark:text-gray-300">
                                    <li className="space-x-2">
                                        <span className="font-semibold text-primary dark:text-gray-300">&#x2713;</span>
                                        <span>Add categories and FAQs with AI</span>
                                    </li>
                                    <li className="space-x-2">
                                        <span className="font-semibold text-primary dark:text-gray-300">&#x2713;</span>
                                        <span>Style the FAQ they way you want</span>
                                    </li>
                                    <li className="space-x-2">
                                        <span className="font-semibold text-primary dark:text-gray-300">&#x2713;</span>
                                        <span>Connect your domain</span>
                                    </li>
                                    <li className="space-x-2">
                                        <span className="font-semibold text-primary dark:text-gray-300">&#x2713;</span>
                                        <span>Connect all your communication channels</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Faqs />
            </Container>
        </div>
    )
}
