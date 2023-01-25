import { MenuBar, TopBar } from "@/Components/Editor/Menu";
import Settings from "@/Components/Editor/Settings";
import Dropcursor from "@tiptap/extension-dropcursor";
import { EditorContent, useEditor } from "@tiptap/react";

import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import { Link as TiptapLink } from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";

export default function Editor(props) {
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: "prose focus:outline-none px-4 mx-auto max-w-3xl py-8 h-auto ",
            },
        },
        extensions: [
            Typography,
            Document.extend({
                content: "heading block*",
            }),
            StarterKit.configure({
                document: false,
                heading: {
                    levels: [1, 2, 3, 4],
                },
            }),
            Placeholder.configure({
                showOnlyCurrent: false,
                placeholder: ({ node }) => {
                    if (node.type.name === "heading") {
                        return "What’s the title?";
                    }

                    return "Can you add some further context?";
                },
            }),
            Dropcursor,
            CharacterCount.configure({
                limit: 500,
            }),
            TiptapLink.configure({
                openOnClick: false,
                validate: (href) => /^https?:\/\//.test(href),
            }),
        ],

        content: `
          <h1>
          It’ll always have a heading …
          </h1>
          <p>
            this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
          </p>
          <ul>
            <li>
              That’s a bullet list with one …
            </li>
            <li>
              … or two list items.
            </li>
          </ul>
          <p>
            Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
          </p>
          <pre><code class="language-css">body {
      display: none;
    }</code></pre>
          <p>
            I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
          </p>
          <blockquote>
            Wow, that’s amazing. Good work, boy! 👏
            <br />
            — Mom
          </blockquote>
          <h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That’s a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
        </p>
        <pre><code class="language-css">body {
    display: none;
  }</code></pre>
        <p>
          I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that’s amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
        `,
    });

    return (
        <EditorWrapper className="absolute inset-0">
            <header className="flex items-center border-b bg-white">
                <div className="flex flex-grow-0">
                    <div className="flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center bg-black text-white">
                        {/* logo */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            fill="currentColor"
                            className="h-6 w-6 flex-shrink-0 rounded-full"
                        >
                            <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z" />
                        </svg>
                    </div>
                </div>
                <TopBar editor={editor} />
                <ActionsButton />
            </header>

            <section className="relative flex grow overflow-auto overscroll-none">
                <main className="relative flex h-full min-h-full w-full grow flex-col overflow-auto overscroll-none">
                    {/* mobile */}
                    <MenuBar editor={editor} />
                    {/* end mobile */}
                    <EditorContent editor={editor} />
                </main>
                <aside className="relative inset-0 hidden w-auto shrink-0 overflow-auto border-l md:block">
                    <Settings editor={editor}>
                        <Settings.Status defaultOpen />
                    </Settings>
                </aside>
                {/* start mobile*/}
                <aside className="fixed inset-0 z-10 hidden h-auto max-h-full overflow-y-auto">
                    <div className="flex shrink grow-0 basis-full flex-col overflow-hidden">
                        <div className="flex grow overflow-auto overscroll-y-none bg-white">
                            <div className="w-full">
                                <div className="sticky top-0 z-10 flex h-12 items-center justify-between border-b bg-white px-4">
                                    <span className="w-full overflow-hidden whitespace-nowrap">
                                        Title
                                    </span>
                                    <button id="modal">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={16}
                                            height={16}
                                            className="h-5 w-5 fill-current"
                                            focusable="false"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </button>
                                </div>
                                <ul
                                    className="overflow-auto overscroll-none pb-6"
                                    id="aside"
                                >
                                    <li className="relative border-b">
                                        <button className="relative inline-flex h-auto min-h-[3.5rem] w-full items-center border-b p-4 text-left hover:bg-slate-200">
                                            <h2 className="text-sm">
                                                Status &amp; Visibility
                                            </h2>
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2">
                                                <svg
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 fill-current"
                                                    focusable="false"
                                                >
                                                    <path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" />
                                                </svg>
                                            </span>
                                        </button>
                                        <div className="flex min-h-[3.5rem] w-full items-center justify-start p-4">
                                            <span className="w-2/5 text-sm">
                                                Visibility{" "}
                                            </span>
                                            <button className="text-sm">
                                                public
                                            </button>
                                        </div>
                                        <div className="flex min-h-[3.5rem] w-full items-center justify-start p-4">
                                            <span className="w-2/5 text-sm">
                                                {" "}
                                                URL{" "}
                                            </span>
                                            <button className="text-sm">
                                                theme.test/hello-world
                                            </button>
                                        </div>
                                        <div className="flex min-h-[3.5rem] w-full items-center justify-start p-4">
                                            <span className="w-2/5 text-sm">
                                                Feature{" "}
                                            </span>
                                            <button className="text-sm">
                                                true
                                            </button>
                                        </div>
                                        <div className="flex min-h-[3.5rem] w-full items-center justify-start p-4">
                                            <span className="w-2/5 text-sm">
                                                {" "}
                                                Penulis{" "}
                                            </span>
                                            <button className="text-sm">
                                                suckpoet
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>
                {/* end mobile */}
            </section>
        </EditorWrapper>
    );
}

const ActionsButton = () => {
    return (
        <div className="flex items-center justify-end gap-x-4 pr-4">
            <button className="initial-flex items-center justify-center border border-black px-3 py-1 text-xs">
                {/* petinjauan */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="h-6 w-6"
                    viewBox="0 0 16 16"
                >
                    <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                </svg>
            </button>
            <button className="initial-flex items-center justify-center bg-gray-900 px-3 py-2 text-xs text-white">
                Terbitkan
            </button>
            <button className="flex items-center justify-center bg-gray-900 p-2 text-white">
                {/* settings */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="h-4 w-4"
                    viewBox="0 0 16 16"
                >
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
            </button>
        </div>
    );
};

const EditorWrapper = (props) => {
    return (
        <section {...props}>
            <div className="fixed inset-0 flex h-auto max-h-full w-full">
                <div className="flex w-full shrink grow-0 basis-full flex-col">
                    {props.children}
                </div>
            </div>
        </section>
    );
};
