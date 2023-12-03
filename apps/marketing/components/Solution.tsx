import Container from "./Container"
import Products from "./Products"
import SolutionContent from "./SolutionContent"
import Image from "next/image.js"

export default function Solution() {
    return (
        <div className="pt-32 md:pt-44" id="solution">
            <Container>
                <div className="flex-row-reverse items-center justify-between space-y-12 text-gray-600 md:flex md:gap-6 lg:gap-12 lg:space-y-0">
                    <div className="relative ml-auto h-full md:w-1/2">
                        <Image className="dark:hidden" src="/images/wizard.png" alt="Wizard" width="1174" height="1134" />
                        <Image className="hidden dark:block" src="/images/milestone-dark.webp" alt="app milestone" width="1174" height="1134" />
                    </div>

                    <div className="md:w-1/2 lg:w-[47%]">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl balance">Put your focus in one place</h2>
                        <p className="my-12 text-gray-600 dark:text-gray-300">
                            Instead of going back and forward between your support channels and your FAQ, you can now focus on one place and delegate the work to your mods and customer success team.
                        </p>
                    </div>
                </div>
                <Products />
                {/*<SolutionContent />*/}
            </Container>
        </div>
    )
}
