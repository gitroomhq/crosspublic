import Card from "./Card";
import Image from "next/image.js";

export default function Products() {
    return (
        <div className="my-20 md:my-32">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white md:w-2/3 md:text-3xl lg:text-4xl">All in one</h3>
            <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                <Card>
                    <Image className="w-10" src="/images/integrations.svg" alt="safety icon illustration" height="512" width="512" />
                    <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Add communication channels</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-400">
                          Add all your communication channels such as Discord, Slack and Intercom and convert them into a public FAQ
                        </p>
                    </div>
                </Card>
                <Card>
                    <Image className="w-10" src="/images/style.svg" alt="payment card icon illustration" height="512" width="512" />
                    <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Fully customized styling</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-400">Design your FAQ the way you want and connect it to your domain</p>
                    </div>
                </Card>
                <Card>
                    <Image className="w-10" src="/images/api.svg" alt="xp icon illustration" height="512" width="512" />
                    <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">API and customized components</h4>
                        <p className="mt-3 text-gray-600 dark:text-gray-400">Customized the FAQ the way you want, implement it into your website directly</p>
                    </div>
                </Card>
                <Card>
                  <Image className="w-10" src="/images/search.svg" alt="safety icon illustration" height="512" width="512" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Super fast search</h4>
                    <p className="mt-3 text-gray-600 dark:text-gray-400">Algolia super fast search implemented into the FAQ</p>
                  </div>
                </Card>
            </div>
        </div>
    )
}
