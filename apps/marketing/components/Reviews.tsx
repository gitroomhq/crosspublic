import Container from "./Container";
import Card from "./Card";
import Image from "next/image.js";
import {chunk} from "lodash";

interface Review {
    name: string;
    role: string;
    avatar: string;
    title: string;
    content: string;
}
const reviewsList: Review[] = [
];

const chunkIt = chunk(reviewsList, 3);

export default function Reviews() {
    if (!reviewsList.length) return (<></>);

    return (
        <div className="pt-32 md:pt-20 text-gray-600 dark:text-gray-300" id="reviews">
            <Container>
                <div className="mx-auto md:w-3/5">
                    <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">Trusted by developers</h2>
                </div>
                <div className="mt-12 md:mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {chunkIt.map((reviews, index) => (
                        <div className="space-y-6" key={`review-` + index}>
                            {reviews?.map(r => (
                                <Card key={r.name}>
                                    <div className="flex gap-4">
                                        <Image className="h-12 w-12 rounded-full" src={r.avatar} alt="user avatar" width="400" height="400" loading="lazy" />
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-700 dark:text-white">{r.name}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-300">{r.role}</p>
                                        </div>
                                    </div>
                                    <p>
                                        {r.content}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
