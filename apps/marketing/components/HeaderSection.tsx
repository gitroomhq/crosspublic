import Container from "./Container";
import React from "react";
import Image from "next/image.js";

const links: { to: string, label: string}[] = [
  {
    to: "/docs",
    label: "Documentation",
  },
  {
    to: "/blog",
    label: "Blog",
  },
];

export default function HeaderSection({stars}: {stars: string}) {
  return (
    <header>
      <nav className="absolute z-10 w-full border-b border-black/5 dark:border-white/5 lg:border-transparent">
        <Container>
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-2 md:gap-0 md:py-4">
            <input
              aria-hidden="true"
              type="checkbox"
              name="toggle_nav"
              id="toggle_nav"
              className="peer hidden"
            />
            <div className="relative z-20 flex w-full justify-between md:px-0 lg:w-max">
              <a
                href="components#home"
                aria-label="logo"
                className="flex items-center space-x-2"
              >
                <div aria-hidden="true" className="flex space-x-1">
                  <Image src="/logo.png" alt="MeetFAQ" width={32} height={32} />
                  {/*<div className="h-4 w-4 rounded-full bg-gray-900 dark:bg-white"></div>*/}
                  {/*<div className="h-6 w-2 bg-primary"></div>*/}
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  MeetFAQ
                </span>
              </a>

              <div className="relative flex max-h-10 items-center lg:hidden">
                <label
                  role="button"
                  htmlFor="toggle_nav"
                  aria-label="humburger"
                  id="hamburger"
                  className="relative -mr-6 p-6"
                >
                  <div
                    aria-hidden="true"
                    id="line"
                    className="m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300"
                  ></div>
                  <div
                    aria-hidden="true"
                    id="line2"
                    className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300"
                  ></div>
                </label>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="fixed inset-0 z-10 h-screen w-screen origin-bottom scale-y-0 bg-white/70 backdrop-blur-2xl transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 dark:bg-gray-900/70 lg:hidden"
            ></div>
            <div className="invisible absolute top-full left-0 z-20 w-full origin-top translate-y-1 scale-95 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-100 bg-white p-8 opacity-0 shadow-2xl shadow-gray-600/10 transition-all duration-300 peer-checked:visible peer-checked:scale-100 peer-checked:opacity-100 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none lg:visible lg:relative lg:flex lg:w-7/12 lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:peer-checked:translate-y-0">
              <div className="w-full text-gray-600 dark:text-gray-200 lg:w-auto lg:pr-4 lg:pt-0">
                <ul className="flex flex-col gap-6 tracking-wide lg:flex-row lg:gap-0 lg:text-sm">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.to}
                        className="block transition hover:text-primary dark:hover:text-white md:px-4"
                      >
                        <span>{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between mt-12 lg:mt-0 mb-4 lg:mb-0 pr-4">
                <a
                  className="before:w-full before:h-full before:absolute before:left-0 before:top-0 before:border-[1px] before:border-dark/20 before:rounded-3xl before:duration-300 hover:before:scale-105 relative group flex cursor-pointer items-center gap-[10px] px-4 h-9 text-[15px] text-black transition-all max-lg:w-full max-lg:justify-center"
                  href="https://github.com/github-20k/meetqa"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 21 20"
                    className="h-[19px] w-[19px]"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M10.472.5C5.125.5.802 4.854.802 10.24c0 4.307 2.77 7.952 6.612 9.242.48.097.656-.21.656-.468 0-.226-.015-1-.015-1.806-2.69.58-3.25-1.161-3.25-1.161-.432-1.13-1.073-1.42-1.073-1.42-.88-.596.064-.596.064-.596.977.064 1.49 1 1.49 1 .863 1.483 2.256 1.064 2.816.806.08-.629.337-1.064.609-1.306-2.145-.226-4.402-1.065-4.402-4.806 0-1.065.384-1.936.992-2.613-.096-.242-.432-1.242.096-2.58 0 0 .817-.258 2.657 1a9.296 9.296 0 0 1 2.418-.323c.816 0 1.648.113 2.417.323 1.84-1.258 2.657-1 2.657-1 .529 1.338.192 2.338.096 2.58.625.677.993 1.548.993 2.613 0 3.741-2.257 4.564-4.418 4.806.352.306.656.887.656 1.806 0 1.306-.016 2.355-.016 2.677 0 .258.176.565.656.468a9.733 9.733 0 0 0 6.612-9.241C20.14 4.854 15.802.5 10.472.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Star us</span>
                  <div className="h-[16px] w-[2px] bg-dark/20" />
                  <span>{stars}</span>
                </a>
              </div>

              <div className="">
                <a
                  target="_blank"
                  href={`https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT}&permissions=1084748200000&scope=bot`}
                  className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 lg:w-max"
                >
                  <span className="relative text-sm font-semibold text-white">
                    {" "}
                    Start with Discord
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}
