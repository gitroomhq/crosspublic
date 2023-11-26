"use client";

import React from "react";

export default function Button(props: { Element: string; label: any; type?: string; emphasis: string; to?: string; ui: string }) {
  const { Element, label, type, emphasis, to, ui } = props;

  const spanElement = React.createElement("span", {
    className: (emphasis === "primary" ? "text-white" : "text-primary dark:text-white") + ' span',
    children: label,
  });

  return React.createElement(Element, {
    href: to,
    className: ui +
        (emphasis === "primary"
            ? " py-3 bg-primary px-5 rounded-2xl text-xl font-bold "
            : " px-5 py-2 rounded-2xl border border-transparent bg-primary/10"),
    type: type,
    children: spanElement
  });
}
