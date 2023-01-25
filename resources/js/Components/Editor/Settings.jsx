import { Disclosure } from "@headlessui/react";
import { createContext, useContext } from "react";

const settingsContext = createContext();

const Settings = (props) => {
    return (
        <settingsContext.Provider value={{ editor: props.editor }}>
            <ul className="w-72 overflow-auto overscroll-none">
                {props.children}
            </ul>
        </settingsContext.Provider>
    );
};

function Status(props) {
    const { editor } = useContext(settingsContext);

    if (!editor) return null;

    return (
        <Disclosure as="ul" className="relative border-b" {...props}>
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
                    <Disclosure.Panel className="py-3 text-xs">
                        <div className="flex h-10 w-full items-center justify-start p-4">
                            <span className="w-2/5">Visibility </span>
                            <button>public</button>
                        </div>
                        <div className="flex h-10 w-full items-center justify-start p-4">
                            <span className="w-2/5"> URL </span>
                            <button>theme.test/hello-world</button>
                        </div>
                        <div className="flex h-10 w-full items-center justify-start p-4">
                            <span className="w-2/5">Feature </span>
                            <button>true</button>
                        </div>
                        <div className="flex h-10 w-full items-center justify-start p-4">
                            <span className="w-2/5"> Penulis </span>
                            <button>suckpoet</button>
                        </div>
                        <div className="flex h-10 w-full items-center justify-start p-4">
                            {editor.storage.characterCount.characters()}/{500}{" "}
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

Settings.Status = Status;

export default Settings;
