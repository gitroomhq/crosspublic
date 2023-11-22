import Container from "./Container";
import Button from "./Button";
import Faqs from "./Faqs";
import Image from "next/image.js";

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
                            <div className="text-center md:w-5/12">
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Suite Enterprise</h3>
                                <p className="text-lg text-gray-600 dark:text-gray-300">For your company of any size</p>
                                <span className="mb-6 mt-12 inline-block text-6xl font-bold text-gray-900 dark:text-white"><span className="text-4xl text-primary dark:text-gray-200">$</span>234</span>
                                <div className="flex justify-center">
                                    <Button Element="a" to="/register" label="Get started" emphasis="primary" ui={"max"}/>
                                </div>
                                <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">Includes : Security, Unlimited Storage, Payment, Search engine, and all features</p>
                            </div>
                            <div className="relative md:w-7/12 md:pl-12">
                                <ul role="list" className="space-y-4 py-6 text-gray-600 dark:text-gray-300">
                                    <li className="space-x-2">
                                        <span className="font-semibold text-primary dark:text-gray-300">&check;</span>
                                        <span>First premium advantage</span>
                                    </li>
                                    <li className="space-x-2">
                                        <span className="font-semibold text-primary dark:text-gray-300">&check;</span>
                                        <span>Second advantage weekly</span>
                                    </li>
                                    <li className="space-x-2">
                                        <span className="font-semibold text-primary dark:text-gray-300">&check;</span>
                                        <span>Third advantage donate to project</span>
                                    </li>
                                    <li className="space-x-2">
                                        <span className="font-semibold text-primary dark:text-gray-300">&check;</span>
                                        <span>Fourth, access to all components weekly</span>
                                    </li>
                                </ul>
                                <p className="text-gray-700 dark:text-white">Team can be any size, and you can add or switch members as needed. Companies using our platform include:</p>
                                <div className="mt-12 flex flex-wrap items-center justify-between gap-6 grayscale">
                                    <Image className="h-8 w-auto lg:h-12" src="images/clients/airbnb.svg" width="100" height="100" alt="airbnb" />
                                    <Image className="h-6 w-auto lg:h-8" src="images/clients/netflix.svg" width="100" height="100" alt="bissell" />
                                    <Image className="h-8 w-auto lg:h-10" src="images/clients/ge.svg" width="100" height="100" alt="ge" />
                                    <Image className="ww-auto h-8 lg:h-12" src="images/clients/microsoft.svg" width="100" height="100" alt="microsoft" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Faqs />
            </Container>
        </div>
    )
}