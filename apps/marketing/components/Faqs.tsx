import Faq from "./Faq";
import { pricing } from "@meetfaq/helpers/src/pricing/pricing";

export default function Faqs() {
    return (
        <>
            <div className="mt-20 md:mt-32 flex flex-col gap-12 lg:flex-row">
                <div className="text-center lg:w-5/12 lg:pl-12 lg:text-left">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl lg:text-4xl balance">Frequently Asked Questions</h2>
                </div>
                <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800 lg:w-7/12">
                    <Faq id="faq-1" question="Do I have to pay for MeetFAQ?">
                        <p className="mb-1 text-base text-gray-600 dark:text-gray-400">
                          You can either use the cloud version and enjoy the free-tier
                        </p>
                        <ul className="mb-1 pl-5 list-disc flex flex-col gap-1">
                          <li className="text-gray-600 font-bold">{pricing.FREE.faq} FAQs</li>
                          <li className="text-gray-600 font-bold">{pricing.FREE.categories} Categories</li>
                          <li className="text-gray-600 font-bold">{pricing.FREE.user} Users</li>
                          <li className="text-gray-600 font-bold">Free subdomain</li>
                        </ul>
                        <p className="pb-6 text-base text-gray-600">
                          Or <a href="https://github.com/github-20k/meetqa" className="underline hover:font-bold">self-host</a> the app and enjoy unlimited features
                        </p>
                    </Faq>
                    <Faq id="faq-2" question="What communication methods are currently supported?">
                        <div className="pb-6 text-base text-gray-600 dark:text-gray-400">
                            <p>At the moment we support only Discord.</p>
                        </div>
                    </Faq>
                </div>
            </div>
        </>
    )
}
