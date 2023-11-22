import Container from "./Container";
import Card from "./Card";
import Image from "next/image.js";

export default function Reviews() {
    return (
        <div className="pt-32 md:pt-20 text-gray-600 dark:text-gray-300" id="reviews">
            <Container>
                <div className="mx-auto md:w-3/5">
                    <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">Trusted by thousands</h2>
                    <p className="mt-4 text-center text-gray-600 dark:text-gray-300">Repellendus atque illum odio! Fugiat at expedita deserunt dolorum molestias.</p>
                </div>
                <div className="mt-12 md:mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-6">
                        <Card>
                            <div className="flex gap-4">
                                <Image className="h-12 w-12 rounded-full" src="/images/avatars/avatar.webp" alt="user avatar" width="400" height="400" loading="lazy" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-700 dark:text-white">Daniella Doe</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Mobile dev</p>
                                </div>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aliquid quo eum quae quos illo earum ipsa doloribus nostrum minus libero aspernatur laborum cum, a suscipit, ratione ea totam ullam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.</p>
                        </Card>
                        <Card>
                            <div className="flex gap-4">
                                <Image className="h-12 w-12 rounded-full" src="/images/avatars/avatar-1.webp" alt="user avatar" width="400" height="400" loading="lazy" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-700 dark:text-white">Daniella Doe</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">@hundler</p>
                                </div>
                            </div>
                            <p>Illum aliquid quo eum quae quos illo laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.</p>
                        </Card>
                    </div>
                    <div className="space-y-6">
                        <Card>
                            <div className="flex gap-4">
                            <Image className="h-12 w-12 rounded-full" src="/images/avatars/avatar-1.webp" alt="user avatar" width="400" height="400" loading="lazy" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-700 dark:text-white">Daniella Doe</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Mobile dev</p>
                                </div>
                            </div>
                            <p>Nostrum minus libero sit amet consectetur, adipisicing elit ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.</p>
                        </Card>
                        <Card>
                            <div className="flex gap-4">
                                <Image className="h-12 w-12 rounded-full" src="/images/avatars/avatar-3.webp" alt="user avatar" width="400" height="400" loading="lazy" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-700 dark:text-white">Daniella Doe</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Mobile dev</p>
                                </div>
                            </div>
                            <p>Nostrum minus libero sit amet consectetur, adipisicing elit ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.</p>
                        </Card>
                        <Card>
                            <div className="flex gap-4">
                                <Image className="h-12 w-12 rounded-full" src="/images/avatars/avatar-2.webp" alt="user avatar" width="400" height="400" loading="lazy" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-700 dark:text-white">Daniella Doe</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">@hundler</p>
                                </div>
                            </div>
                            <p>Illum aliquid quo eum quae quos illo laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.</p>
                        </Card>
                    </div>
                    <div className="space-y-6 sm:hidden lg:block">
                        <Card>
                            <div className="flex gap-4">
                                <Image className="h-12 w-12 rounded-full" src="/images/avatars/avatar.webp" alt="user avatar" width="400" height="400" loading="lazy" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-700 dark:text-white">Daniella Doe</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Mobile dev</p>
                                </div>
                            </div>
                            <p>Architecto laboriosam. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.</p>
                        </Card>
                        <Card>
                            <div className="flex gap-4">
                                <Image className="h-12 w-12 rounded-full" src="/images/avatars/avatar-4.webp" alt="user avatar" width="400" height="400" loading="lazy" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-700 dark:text-white">Daniella Doe</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">@hundler</p>
                                </div>
                            </div>
                            <p>Illum aliquid quo deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.</p>
                        </Card>
                        <Card>
                            <div className="flex gap-4">
                                <Image className="h-12 w-12 rounded-full" src="/images/avatars/avatar.webp" alt="user avatar" width="400" height="400" loading="lazy" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-700 dark:text-white">Daniella Doe</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">@hundler</p>
                                </div>
                            </div>
                            <p>Illum aliquid quo deleniti aperiam ab veniam Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.</p>
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    )
}