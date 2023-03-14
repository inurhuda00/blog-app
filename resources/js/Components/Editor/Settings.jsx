import { Disclosure } from "@headlessui/react";
import { usePage } from "@inertiajs/react";
import { isString } from "@tiptap/react";
import clsx from "clsx";
import { createContext, useCallback, useContext } from "react";
import Filepond from "../Filepond";

const settingsContext = createContext();

function isObject(value) {
    var type = typeof value;

    return value != null && (type == "object" || type == "function");
}

const Settings = (props) => {
    return (
        <settingsContext.Provider
            value={{
                editor: props.editor,
                handleChange: props.handleChange,
                data: props.data,
                limit: props.limit,
                setData: props.setData,
            }}
        >
            <ul className="w-72 overflow-auto overscroll-none">
                {props.children}
            </ul>
        </settingsContext.Provider>
    );
};

function Status(props) {
    const { editor, data, limit, handleChange } = useContext(settingsContext);
    const {
        auth,
        article,
        can: { createArticles, manageArticles, editAnyArticles },
        is,
        statuses,
    } = usePage().props;

    if (!editor) return null;

    const requirements = [
        { name: "picture", fill: isObject(data.picture) },
        { name: "tags", fill: !!data.tags.length },
        { name: "title", fill: isString(data.title) },
        { name: "excerpt", fill: isString(data.excerpt) },
        { name: "body", fill: isObject(data.body) || isString(data.body) },
        { name: "category", fill: data.category_id },
    ];

    return (
        <Disclosure as="li" className="relative border-b" {...props}>
            {({ open }) => (
                <>
                    <Disclosure.Button
                        className={`relative inline-flex h-auto min-h-[3.5rem] w-full items-center p-4 text-left text-sm  font-medium hover:bg-gray-100 ${
                            open ? "border-b" : ""
                        }`}
                    >
                        <span className="text-xs">Status & Visibility</span>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2">
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${
                                    open ? "rotate-180 transform" : ""
                                } h-5 w-5 text-purple-500`}
                                focusable="false"
                            >
                                <path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" />
                            </svg>
                        </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-xs">
                        <div className="flex w-full items-center justify-start p-4">
                            <ul className="space-y-2">
                                {requirements.map((req) => (
                                    <li
                                        className="flex items-center"
                                        key={req.name}
                                    >
                                        <svg
                                            className={clsx(
                                                "stroke h-6 w-6 flex-none fill-sky-100 stroke-emerald-500",
                                                !req.fill
                                                    ? "opacity-0"
                                                    : "opacity-100"
                                            )}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="8" />
                                            <path
                                                d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                                                fill="none"
                                            />
                                        </svg>
                                        <p className="ml-4">{req.name}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex h-10 w-full items-center justify-start p-4">
                            <span className="w-2/5">Visibility </span>
                            {manageArticles ? (
                                <label className="flex h-10 w-full items-center justify-start p-4">
                                    <select
                                        className="mt-1 block w-full text-xs"
                                        value={data.status || 0}
                                        onChange={handleChange}
                                        name="status"
                                    >
                                        {!data.status ? (
                                            <option value={Number(0)}>
                                                Draft
                                            </option>
                                        ) : null}
                                        {statuses.map((status) => {
                                            return (
                                                <option
                                                    key={status.id}
                                                    value={Number(status.id)}
                                                >
                                                    {status.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </label>
                            ) : (
                                <>
                                    {editAnyArticles ? (
                                        <p>
                                            {
                                                statuses.find(
                                                    (status) =>
                                                        status.id ===
                                                        data.status
                                                ).name
                                            }
                                        </p>
                                    ) : (
                                        <>
                                            {is.review ? (
                                                <p>Review</p>
                                            ) : (
                                                <p>Draft</p>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>

                        {createArticles
                            ? auth.user.username &&
                              (article.author ? (
                                  <div className="flex h-10 w-full items-center justify-start p-4">
                                      <span className="w-2/5"> Penulis </span>
                                      <button>{article.author.username}</button>
                                  </div>
                              ) : (
                                  <div className="flex h-10 w-full items-center justify-start p-4">
                                      <span className="w-2/5"> Penulis </span>
                                      <button>{auth.user.username}</button>
                                  </div>
                              ))
                            : null}

                        <div className="flex h-10 w-full items-center justify-start p-4">
                            {editor.storage.characterCount.characters()}/{limit}{" "}
                            characters
                            <br />
                            {editor.storage.characterCount.words()} words
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

function Excerpt(props) {
    const { handleChange, data, editor, setData } = useContext(settingsContext);

    const handleGenerateExcerpt = () => {
        setData(
            "excerpt",
            editor
                .getJSON()
                .content.find(
                    (obj) =>
                        obj.type === "paragraph" && obj.content !== undefined
                ).content[0].text
        );
    };
    return (
        <Disclosure as="li" className="relative border-b" {...props}>
            {({ open }) => (
                <>
                    <Disclosure.Button
                        className={`relative inline-flex h-auto min-h-[3.5rem] w-full items-center p-4 text-left text-sm  font-medium hover:bg-gray-100 ${
                            open ? "border-b" : ""
                        }`}
                    >
                        <span className="text-xs">Excerpt</span>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2">
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${
                                    open ? "rotate-180 transform" : ""
                                } h-5 w-5 text-purple-500`}
                                focusable="false"
                            >
                                <path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" />
                            </svg>
                        </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="p-4 py-3 text-xs">
                        <>
                            <button
                                onClick={() => handleGenerateExcerpt()}
                                className="initial-flex items-center justify-center bg-gray-900 px-3 py-2 text-xs text-white"
                            >
                                generate
                            </button>
                            <textarea
                                name="excerpt"
                                className="mt-3 flex h-10 w-full items-center justify-start p-1 text-xs"
                                onChange={handleChange}
                                value={data.excerpt || undefined}
                            ></textarea>
                        </>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

function Images(props) {
    const { data, setData } = useContext(settingsContext);
    return (
        <Disclosure as="li" className="relative border-b" {...props}>
            {({ open }) => (
                <>
                    <Disclosure.Button
                        className={`relative inline-flex h-auto min-h-[3.5rem] w-full items-center p-4 text-left text-sm  font-medium hover:bg-gray-100 ${
                            open ? "border-b" : ""
                        }`}
                    >
                        <span className="text-xs">Images</span>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2">
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${
                                    open ? "rotate-180 transform" : ""
                                } h-5 w-5 text-purple-500`}
                                focusable="false"
                            >
                                <path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" />
                            </svg>
                        </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="p-4 py-3 text-xs">
                        <Filepond
                            onChange={(fileItems) =>
                                setData((data) => {
                                    return {
                                        ...data,
                                        picture: fileItems.map(
                                            (fileItem) => fileItem.file
                                        )[0],
                                    };
                                })
                            }
                            className="w-full"
                            files={data.picture ? [data.picture] : []}
                        />
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

function Categories(props) {
    const { handleChange, data } = useContext(settingsContext);
    const { categories } = usePage().props;
    return (
        <Disclosure as="li" className="relative border-b" {...props}>
            {({ open }) => (
                <>
                    <Disclosure.Button
                        className={`relative inline-flex h-auto min-h-[3.5rem] w-full items-center p-4 text-left text-sm  font-medium hover:bg-gray-100 ${
                            open ? "border-b" : ""
                        }`}
                    >
                        <span className="text-xs">Categories</span>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2">
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${
                                    open ? "rotate-180 transform" : ""
                                } h-5 w-5 text-purple-500`}
                                focusable="false"
                            >
                                <path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" />
                            </svg>
                        </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="py-3 ">
                        <label className="flex h-10 w-full items-center justify-start p-4">
                            <select
                                className="mt-1 block w-full text-xs"
                                value={data.category_id}
                                onChange={handleChange}
                                name="category_id"
                            >
                                {!data.category_id ? (
                                    <option>pilih kategori</option>
                                ) : null}
                                {categories.map((category) => {
                                    return (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </label>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

function Tags(props) {
    const { data, setData } = useContext(settingsContext);

    const handleKeyDown = useCallback((e) => {
        if (e.key !== "Enter") return;
        const value = e.target.value;
        if (!value.trim()) return;
        setData((data) => {
            return { ...data, tags: [...data.tags, value] };
        });
        e.target.value = "";
    });

    const removeTag = useCallback((index) => {
        setData((data) => {
            return {
                ...data,
                tags: [...data.tags.filter((el, i) => i !== index)].reverse(),
            };
        });
    });

    return (
        <Disclosure as="li" className="relative border-b" {...props}>
            {({ open }) => (
                <>
                    <Disclosure.Button
                        className={`relative inline-flex h-auto min-h-[3.5rem] w-full items-center p-4 text-left text-sm  font-medium hover:bg-gray-100 ${
                            open ? "border-b" : ""
                        }`}
                    >
                        <span className="text-xs">Tags</span>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2">
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${
                                    open ? "rotate-180 transform" : ""
                                } h-5 w-5 text-purple-500`}
                                focusable="false"
                            >
                                <path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" />
                            </svg>
                        </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="py-3 ">
                        <label className="flex w-full min-w-full flex-wrap items-center justify-start gap-2 px-4">
                            <input
                                onKeyDown={handleKeyDown}
                                type="text"
                                className="mt-1 block w-full text-xs"
                                placeholder="Type somthing"
                            />
                            {data.tags.map((tag, index) => (
                                <div
                                    className="inline-block cursor-pointer space-x-2 rounded-xl bg-slate-300 px-2 py-1"
                                    key={index}
                                    onClick={() => removeTag(index)}
                                >
                                    <span className="text-sm">{tag}</span>
                                </div>
                            ))}
                        </label>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

Settings.Status = Status;
Settings.Categories = Categories;
Settings.Images = Images;
Settings.Excerpt = Excerpt;
Settings.Tags = Tags;

export default Settings;
