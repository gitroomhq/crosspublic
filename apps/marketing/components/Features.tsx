import Container from "./Container";

export default function Features() {
    return (
        <div className="relative pt-32 md:pt-44" id="features">
            <Container>
              <div className="drop-shadow-2xl">
                <div className="mx-auto md:w-3/5">
                    <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl balance">
                      Never miss a client question again
                    </h2>
                    <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
                      Prevent clients from churning by providing them with a public FAQ.<br />
                    </p>
                </div>

                <div className="mt-16 md:mt-20 flex justify-center">
                    <div className="relative rounded-3xl border border-gray-200 p-1 lg:grid-cols-2 flex bg-white overflow-hidden max-w-[800px]">
                        <video src="/action.mp4" className="flex-1 bg-white rounded-3xl clip-path" autoPlay={true} loop={true} muted={true} />
                    </div>
                </div>
              </div>
            </Container>
        </div>
    )
}
