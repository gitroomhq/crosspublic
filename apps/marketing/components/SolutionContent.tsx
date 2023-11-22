import Button from "./Button";
import Image from "next/image.js";

export default function SolutionContent() {
    return (
        <div className="mx-auto flex flex-col items-center gap-6 sm:w-4/5 md:w-full md:flex-row lg:gap-12">
            <div className="relative md:w-1/2">
                <div aria-hidden="true" className="absolute inset-0 m-auto grid h-3/5 w-3/5 grid-cols-2 -space-x-52 opacity-40 dark:opacity-60">
                    <div className="h-full rounded-full bg-gradient-to-br from-primary to-purple-400 blur-[106px] dark:from-blue-700"></div>
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-primary blur-[106px] dark:to-indigo-600"></div>
                </div>
                <Image className="relative dark:hidden" src="/images/illus.webp" alt="stats illustration" width="1746" height="1746" />
                <Image className="relative hidden dark:block" src="/images/illus-dark.webp" alt="stats illustration" width="1746" height="1746" />
            </div>
            <div className="ml-auto h-full md:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">Go beyond with our top products</h3>
                <p className="my-12 text-gray-600 dark:text-gray-300">
                    Nobis minus voluptatibus pariatur dignissimos libero quaerat ? Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia. <br />
                    <br /> Vitae error, quaerat officia delectus voluptatibus explicabo quo pariatur impedit, at reprehenderit aliquam a ipsum quas voluptatem. Quo pariatur asperiores eum amet.
                </p>
                <Button Element="a" label="Get started" emphasis="primary" to="/register" ui="max"/>
            </div>
        </div>
    )
}