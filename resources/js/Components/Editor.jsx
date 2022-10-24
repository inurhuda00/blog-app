import { Fragment } from "react";
// import hljs from "highlight.js";
import { Tab } from "@headlessui/react";
// import { marked } from "marked";
import clsx from "clsx";
// marked.setOptions({
//     highlight: (code) => hljs.highlightAuto(code).value,
// });

export default function Editor({ value, ...props }) {
    return (
        <Tab.Group>
            <Tab.List className="mb-2 flex items-center gap-x-4 pl-2">
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={clsx(
                                "rounded-lg text-sm focus:outline-none",
                                selected
                                    ? "text-semibold font-semibold"
                                    : "text-gray-500"
                            )}
                        >
                            Input
                        </button>
                    )}
                </Tab>
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={clsx(
                                "rounded-lg text-sm focus:outline-none",
                                selected
                                    ? "text-semibold font-semibold"
                                    : "text-gray-500"
                            )}
                        >
                            Preview
                        </button>
                    )}
                </Tab>
            </Tab.List>
            <Tab.Panels className="h-[540px] max-h-[540px] overflow-y-auto rounded-lg border">
                <Tab.Panel>
                    <textarea
                        value={value}
                        className="h-[540px] w-full resize-none border-0 p-4 focus:border-0 focus:ring-0"
                        {...props}
                    ></textarea>
                </Tab.Panel>
                <Tab.Panel>
                    <div
                        className="prose prose-blue max-w-none p-4 prose-img:rounded-lg"
                        dangerouslySetInnerHTML={{ __html: value }}
                    />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
}
