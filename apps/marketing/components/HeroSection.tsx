import Button from "./Button";
import Container from "./Container";
import Image from "next/image.js";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden dark:bg-darker lg:overflow-auto" id="home">
      <div className="absolute inset-x-0 top-32 lg:hidden">
        <div aria-hidden="true" className="grid grid-cols-2 -space-x-52 opacity-50 dark:opacity-60 2xl:mx-auto 2xl:max-w-6xl">
          <div className="h-60 bg-gradient-to-br from-primary to-purple-400 blur-3xl dark:from-blue-700"></div>
          <div className="h-72 rounded-full bg-gradient-to-r from-cyan-400 to-sky-300 blur-3xl dark:from-transparent dark:to-indigo-600"></div>
        </div>
      </div>
      <Container>
        <div className="relative ml-auto pt-40 xl:pt-36">
          <div className="gap-12 md:flex md:items-center">
            <div className="text-center sm:px-12 md:w-2/3 md:px-0 md:text-left lg:w-1/2">
              <h1 className="text-5xl font-black dark:text-white md:text-6xl xl:text-7xl balance">Support Channels into a Public FAQ</h1>
              <div className="">
                <p className="mt-8 text-lg text-gray-700 dark:text-gray-100 balance mb-8">
                  Not all of your customers are on your support channels.<br />
                  Extract your FAQ to make it available to everyone.<br />
                </p>
                <div className="mt-12 flex justify-center gap-4 sm:gap-6 md:justify-start">
                  <Button
                    Element="a"
                    emphasis="primary"
                    label="Get started"
                    to="/login"
                    ui="max"
                  />
                </div>
              </div>
            </div>
            <div className="relative mt-20 md:mt-0 md:w-2/5 lg:w-3/5">
              <div className="-ml-6 md:-mr-72 lg:mr-0">
                <Image
                  className="h-full object-cover object-left"
                  src="/images/supportman.png"
                  alt="app screenshot"
                  width="1628"
                  height="1233"
                  priority={true}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 text-center md:mt-32 lg:mt-20 xl:mt-16">
            <span className="text-sm font-semibold tracking-wider text-gray-800 dark:text-white">
              TRUSTED BY DEVELOPERS AT
            </span>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-7 brightness-75 contrast-200 grayscale sm:justify-between">
              <a href="https://www.llmonitor.com" target="_blank">
                <Image
                  className="h-8 w-auto lg:h-14"
                  src="images/clients/llmonitor.svg"
                  loading="lazy"
                  alt="llmonitor"
                  width="100"
                  height="100"
                />
              </a>
              <a href="https://flagsmith.com" target="_blank">
                <Image
                  className="h-6 w-auto lg:h-10"
                  src="images/clients/flagsmith.svg"
                  loading="lazy"
                  alt="bissell"
                  width="100"
                  height="100"
                />
              </a>
              <a href="https://firecamp.io" target="_blank">
                <Image
                  className="h-6 w-auto lg:h-10"
                  src="images/clients/firecamp.svg"
                  loading="lazy"
                  alt="ge"
                  width="100"
                  height="100"
                />
              </a>
              <a href="https://keephq.dev/" target="_blank">
                <Image
                  className="h-6 w-auto lg:h-10"
                  src="/images/clients/keep.png"
                  loading="lazy"
                  alt="lilly"
                  width="100"
                  height="100"
                />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
