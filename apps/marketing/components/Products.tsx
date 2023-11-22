import Card from "./Card";
import Image from "next/image.js";

export default function Products() {
    return (
        <div className="my-20 md:my-32">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white md:w-2/3 md:text-3xl lg:text-4xl">Customize your customer experience, Go beyond with our top products</h3>
            <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <Image className="w-10" src="/images/security.webp" alt="safety icon illustration" height="512" width="512" />
                    <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Safelus</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-400">Dolorem aliquid officiis quae ipsum nobis libero alias Iure nobis dicta.</p>
                    </div>
                </Card>
                <Card>
                    <Image className="w-10" src="/images/card.webp" alt="payment card icon illustration" height="512" width="512" />
                    <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Paylus</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-400">Dolorem aliquid officiis quae ipsum nobis libero alias Iure nobis dicta.</p>
                    </div>
                </Card>
                <Card>
                    <Image className="w-10" src="/images/xp.webp" alt="xp icon illustration" height="512" width="512" />
                    <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">TL Certification</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-400">Dolorem aliquid officiis quae ipsum nobis libero alias Iure nobis dicta.</p>
                    </div>
                </Card>
            </div>
        </div>
    )
}