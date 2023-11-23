import Container from "./Container"
import Products from "./Products"
import SolutionContent from "./SolutionContent"
import Image from "next/image.js"

export default function Solution() {
    return (
        <div className="pt-32 md:pt-44" id="solution">
            <Container>
                {/*<div className="flex-row-reverse items-center justify-between space-y-12 text-gray-600 md:flex md:gap-6 lg:gap-12 lg:space-y-0">*/}
                {/*    <div className="relative ml-auto h-full md:w-1/2">*/}
                {/*        <Image className="dark:hidden" src="/images/milestone.webp" alt="app milestone" width="1174" height="1134" />*/}
                {/*        <Image className="hidden dark:block" src="/images/milestone-dark.webp" alt="app milestone" width="1174" height="1134" />*/}
                {/*    </div>*/}

                {/*    <div className="md:w-1/2 lg:w-[47%]">*/}
                {/*        <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">Just focus on your business startegy</h2>*/}
                {/*        <p className="my-12 text-gray-600 dark:text-gray-300">*/}
                {/*            Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at? Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia. <br />*/}
                {/*            <br /> Vitae error, quaerat officia delectus voluptatibus explicabo quo pariatur impedit, at reprehenderit aliquam a ipsum quas voluptatem. Quo pariatur asperiores eum amet.*/}
                {/*        </p>*/}
                {/*        <div className="space-y-4 divide-y divide-gray-100 dark:divide-gray-800">*/}
                {/*            <div className="mt-8 flex gap-4 md:items-center">*/}
                {/*                <div className="flex h-12 w-12 gap-4 rounded border border-gray-200 dark:border-gray-900">*/}
                {/*                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="m-auto h-6 w-6 text-gray-700 dark:text-gray-300">*/}
                {/*                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"></path>*/}
                {/*                    </svg>*/}
                {/*                </div>*/}
                {/*                <div className="w-5/6">*/}
                {/*                    <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Chat Anytime</h3>*/}
                {/*                    <p className="text-gray-500 dark:text-gray-400">Asperiores nemo possimus nesciunt quam mollitia.</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="flex gap-4 pt-4 md:items-center">*/}
                {/*                <div className="flex h-12 w-12 gap-4 rounded border border-gray-200 dark:border-gray-900">*/}
                {/*                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="m-auto h-6 w-6 text-gray-700 dark:text-gray-300">*/}
                {/*                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path>*/}
                {/*                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path>*/}
                {/*                    </svg>*/}
                {/*                </div>*/}
                {/*                <div className="w-5/6">*/}
                {/*                    <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Real Time Location</h3>*/}
                {/*                    <p className="text-gray-500 dark:text-gray-400">Asperiores nemo possimus nesciunt quam mollitia.</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<Products />*/}
                <SolutionContent />
            </Container>
        </div>
    )
}
