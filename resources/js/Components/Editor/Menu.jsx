import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

const OptionsTeks = ({ editor, className, mobile = false }) => {
    if (!editor) return null;

    const options = [
        {
            id: 1,
            name: "Paragraph",
            active: editor.isActive("paragraph"),
        },
        {
            id: 2,
            name: "Heading 2",
            active: editor.isActive("heading", { level: 2 }),
        },
        {
            id: 3,
            name: "Heading 3",
            active: editor.isActive("heading", { level: 3 }),
        },
        {
            id: 4,
            name: "Heading 4",
            active: editor.isActive("heading", { level: 4 }),
        },
    ];

    const [selected, setSelected] = useState(options[0]);

    useEffect(() => {
        if (!editor.isEditable) return;

        options.filter((style) => style.active).length
            ? setSelected(options.filter((style) => style.active)[0])
            : setSelected(options[0]);
    }, [JSON.stringify(options), editor.isActive()]);

    return (
        <Listbox
            value={selected}
            onChange={(value) => {
                switch (value.id) {
                    case 1:
                        editor.chain().focus().setParagraph().run();
                        break;
                    case 2:
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run();
                        break;
                    case 3:
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 3 })
                            .run();
                        break;
                    case 4:
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 4 })
                            .run();
                        break;
                    default:
                        break;
                }
                setSelected(value);
            }}
        >
            <div className={clsx(className, "relative z-50")}>
                <Listbox.Button className="initial-flex h-12 w-28 items-center justify-center border-r px-3 py-1.5 text-sm">
                    {selected.name}
                </Listbox.Button>
                <Listbox.Options className="relative z-50 mt-1 max-h-60 w-28 overflow-y-visible bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {options.map((style) => (
                        <Listbox.Option
                            key={style.id}
                            value={style}
                            disabled={style.active}
                            className={({ active }) =>
                                `relative cursor-default select-none px-5 py-2 ${
                                    (active
                                        ? "bg-amber-100 text-amber-900"
                                        : "text-gray-900",
                                    style.active ? "bg-slate-100" : null)
                                }`
                            }
                        >
                            {style.name}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    );
};

export const TopBar = ({ editor }) => {
    if (!editor) return null;

    return (
        <nav className="flex-1 items-center justify-start pr-4 md:flex">
            <div className="flex items-center gap-x-2 pl-4 md:gap-x-4 md:pl-6">
                <button
                    className=" border border-black bg-white p-1 disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:shadow-none"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="h-6 w-6"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                        />
                    </svg>
                </button>
                <button
                    className=" border border-black bg-white p-1 disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:shadow-none"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="h-6 w-6"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                        />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export const MenuBar = ({ editor }) => {
    if (!editor) return null;
    const [url, setUrl] = useState(null);
    const [urlModal, setUrlModal] = useState(false);

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();

            return;
        }

        // update link
        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    }, [editor]);

    return !editor.isActive("heading", { level: 1 }) ? (
        <nav className="sticky top-2 z-50 m-2 min-h-[3rem] max-w-3xl border border-black bg-white lg:mx-auto">
            <div className="relative flex overflow-x-auto overflow-y-hidden">
                <OptionsTeks editor={editor} className="h-full" />
                <button
                    className={`flex h-12 flex-nowrap items-center justify-center border-r p-3 ${
                        editor.isActive("bold") ? "text-gray-300" : ""
                    }`}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="h-6 w-6"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z" />
                    </svg>
                </button>
                <button
                    className={`flex h-12 flex-nowrap items-center justify-center border-r p-3 ${
                        editor.isActive("italic") ? "text-gray-300" : ""
                    }`}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can().chain().focus().toggleItalic().run()
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="h-6 w-6"
                        viewBox="0 0 16 16"
                    >
                        <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z" />
                    </svg>
                </button>
                {editor.isActive("link") ? (
                    <button
                        className="inline-flex h-12 w-12 flex-nowrap items-center justify-center border-r p-3"
                        onClick={() => editor.chain().focus().unsetLink().run()}
                        disabled={!editor.isActive("link")}
                    >
                        un
                    </button>
                ) : (
                    <button
                        className="inline-flex h-12 flex-nowrap items-center justify-center border-r p-3"
                        onClick={setLink}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="h-6 w-6"
                            viewBox="0 0 16 16"
                        >
                            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                        </svg>
                    </button>
                )}
                <button
                    className={`flex h-12 flex-nowrap items-center justify-center border-r p-3 ${
                        editor.isActive("strike") ? "text-gray-300" : ""
                    }`}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can().chain().focus().toggleStrike().run()
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="h-6 w-6"
                        viewBox="0 0 16 16"
                    >
                        <path d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z" />
                    </svg>
                </button>
                <button
                    className={`flex h-12 flex-nowrap items-center justify-center border-r p-3 ${
                        editor.isActive("bulletList") ? "text-gray-300" : ""
                    }`}
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="h-6 w-6"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                        />
                    </svg>
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    className={`flex h-12 flex-nowrap items-center justify-center border-r p-3 ${
                        editor.isActive("blockquote") ? "text-gray-300" : ""
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="h-6 w-6"
                        viewBox="0 0 16 16"
                    >
                        <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                    </svg>
                </button>
                <button
                    className="flex h-12 flex-nowrap items-center justify-center border-r p-3"
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="h-6 w-6"
                        viewBox="0 0 16 16"
                    >
                        <path d="M12 3H4a1 1 0 0 0-1 1v2.5H2V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2.5h-1V4a1 1 0 0 0-1-1zM2 9.5h1V12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9.5h1V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5zm-1.5-2a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H.5z" />
                    </svg>
                </button>
            </div>
        </nav>
    ) : (
        <nav className="invisible sticky top-2 z-50 m-2 min-h-[3rem] max-w-3xl p-1.5">
            hide
        </nav>
    );
};
