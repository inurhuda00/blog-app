import { MenuBar, TopBar } from "@/Components/Editor/Menu";
import Settings from "@/Components/Editor/Settings";
import { Link, useForm, usePage } from "@inertiajs/react";
import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import { Link as TiptapLink } from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { EditorContent, isString, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Datepicker from "react-tailwindcss-datepicker";

function isObject(value) {
    var type = typeof value;

    return value != null && (type == "object" || type == "function");
}

const CHAR_LIMIT = 5000;
const DEBOUNCE_SAVE_DELAY_MS = 1;
const DEFAULT_CONTENT = `
<h1>
It’ll always have a heading …
</h1>

  <p>"Tuhaaaaaaaaaaan, mereka memang keparaaaaaat!"</p>
  <p>
      Aku tentu mendengar bunyi yang amat keras itu. Hampir menyerupai bunyi kaleng yang remuk
      terlindas benda berat, tetapi lebih kencang, volumenya sepuluh kali lipat. Aku berlari
      kencang menuju sumber suara itu. Firasatku yang tak beres membuat langkahku berkejaran tanpa
      aturan, semakin cepat. Aku bisa merasakannya. Aku bisa menciumnya. Berpuluh-puluh tahun aku
      hidup di wilayah ini. Aku sangat hafal dan sejauh ini aku tak pernah meleset. Bunyi macam
      itu, aroma sesudahnya, tak salah lagi, ini bau kematian!
  </p>
  <p>
      Apa kubilang! Aku tak mungkin salah! Duhai betapa bengisnya takdir. Satu hal yang sampai
      saat ini belum bisa kupahami cara kerjanya. Padahal baru beberapa saat lalu aku
      berjalan-jalan mencari makan bersamanya. Dia sedikit membagi cerita. Katanya, dia sedang
      mengandung, dan sampai saat ini belum ditemukan kejelasan siapa gerangan ayah dari anak yang
      sedang dikandungnya. "Akibat terlalu banyak seks bebas," katanya. Belum sempat aku memberi
      jawaban untuk keluh kesah terakhirnya itu, dan kini ia keburu mati. Terkapar di pinggir
      jalan. Sebuah mobil plat merah dengan kecepatan tinggi mengoyak tengkorak bagian
      belakangnya.
  </p>
  <p>
      Mobilnya lari. Tidak bertanggung jawab kepada nyawanya, juga nyawa yang sedang dikandungnya.
      Tidak pula sekadar berhenti atau menampakkan raut wajah sedih. Yang seperti ini pun aku
      sudah hafal. Aku pergi menuju tubuh kaku itu, aku kelilingi meski tak tahu harus berbuat
      apa. Ada beberapa yang berkerumun. Aku hampiri satu per satu dari mereka yang dengan mata
      batu hanya berkumpul memandangi mayat anyir calon ibu dan kandungannya itu.
  </p>
  <p>Aku berteriak minta bantuan, "ayo angkat!"</p>
  <p>Mereka mematung.</p>
  <p>Aku coba lagi, "ayo sorong dia ke tepian!"</p>
  <p>Mereka malah memandangiku.</p>
  <p>
      Aku tak patah, "kalau begitu setidaknya tutupi dia dengan sesuatu, darah adalah momok bagi
      kehidupan, adalah kesenyapan dari tiap kurun zaman!"
  </p>
  <p>
      Mereka hanya dingin, mereka benar-benar dingin. Membuat seluruhnya juga jadi dingin. Darah
      menjadi lebih cepat rekat dengan aspal jalan yang basah. Mereka tetap dingin dan aku tetap
      tidak mengerti apa yang harus kuperbuat. Bahkan kematian tak menggetarkan mereka. Mungkin
      karena bagi mereka kami hanya umpatan. Hanya pelampiasan atas nasib sial. Semacam lubang
      ventilasi ketika semua tak lagi tertangguhkan. Jauh di dalam diri mereka, sesungguhnya kami
      amat hidup. Bahkan telah menyatu dengan darah, bibir, mulut, hati mereka sehari-hari. Mereka
      bawa kami ke dalam setiap percakapan, dalam setiap dongeng-dongeng nasihat kebajikan, atau
      ke dalam seburuk-buruknya perumpamaan. Bagi mereka kami adalah kebaikan, juga keburukan.
      Simbol cinta, juga simbol kebencian.
  </p>
  <p>
      Mereka meletakkan kami semau-maunya. Memperlakukan kami seenaknya. Padahal kami amat hidup
      di dalam kamus budaya mereka. Tetapi kenapa, apakah begitu sukar untuk sekadar mengubur
      tubuh beku beserta anak yang dikandungnya itu?
  </p>
  <p>"Tuhaaaaaan, mereka memang keparaaaaat!"</p>
  <p><strong>***</strong></p>
  <p>"Halo Bu, ada apa?"</p>
  <p>
      "Setelah seluruh pekerjaanmu di kantor selesai, cepat pulang ke rumah. Parsi dan keluarganya
      datang ke rumah mencarimu."
  </p>
  <p>"Loh, ada apa, Bu?"</p>
  <p>"Minta pertanggung jawaban."</p>
  <p>
      Suara Ibu di seberang terputus seketika. Tiga puluh tujuh&nbsp;<em>notif</em>&nbsp;telepon
      dan&nbsp;<em>chat</em>&nbsp;di&nbsp;<em>WhatsApp</em>&nbsp;tidak kubuka. Segera kukemasi
      seluruh barang-barangku di ruang kerja dan memacu penuh kecepatan mobil. Dari nada bicaranya
      Ibu nampak serius. Ini pasti bukan masalah sepele. Dua hari lalu aku memang meniduri Parsi.
      Tapi aku pakai kondom! Harusnya yang datang ke rumah adalah Nani, atau Yanis, atau seorang
      perempuan entah siapa namanya yang tempo lalu mabuk berat dan menumpang di mobilku. Atau
      seorang anak gadis tetangga yang kebetulan minta kuajari kiat-kiat lolos tes CPNS waktu
      rumahnya kosong. Atau Kirana, dari beberapa wanita di kantor memang hanya dia yang mau
      diajak tidur oleh siapa saja. Atau...
  </p>
  <p><em>Braaaaaak</em>!</p>
  <p>
      Nama-nama itu seketika lenyap dari tempurung kepalaku. Celaka, aku menabrak sesuatu. Sedikit
      kuperlambat laju mobilku. Kutengok spion untuk memastikan gerangan apa yang baru saja
      kutabrak karena suaranya memang sangat keras.
  </p>
  <p>"Bajingan, anjing bunting!"</p>
  <p>
      Masa bodoh pikirku. Melaju terus saja. Aku masih mencari satu nama terakhir yang kutiduri
      dalam sepekan terakhir ini.
  </p>
  <p>
      <strong><em>Sinangoh Prendeng, Desember 2019.</em></strong>
  </p>
  <p></p>
  <p>
      Sobrun Jamil, tinggal dan bekerja di Pekalongan. Ikut ngurusi hal-hal kecil di Buletin
      Lintang. Kalau mau jadi saudara, bisa lewat Instagram: @sobrunjamil_ atau hubungi nomor
      WhatsApp: 082141506300.
  </p>
  <p>&nbsp;</p>

`;

const getMessage = (status) => {
    let message;

    switch (status) {
        case "review":
            message =
                "Karya Anda saat ini sedang direview oleh tim kami. Mohon bersabar dan tunggu informasi selanjutnya dari kami.";
            break;
        case "published":
            message =
                "Selamat, artikel Anda berhasil dipublikasikan! Terima kasih telah berbagi ide-ide Anda dengan kami.";
            break;
        case "rejected":
            message =
                "Maaf, artikel Anda belum bisa dipublikasikan. Tolong perbaiki beberapa bagian sesuai saran editor dan kirim kembali. Terima kasih!";
            break;
        default:
            message =
                "Tolong lengkapi informasi judul, ringkasan, gambar utama, kategori, dan konten artikel sebelum mengirim untuk ditinjau. Terima kasih!";
            break;
    }

    return message;
};

export default function Editor({ auth, article, status, errors }) {
    const { data, setData, processing, post } = useForm({
        title: article.title,
        excerpt: article.excerpt,
        category_id: article.category_id,
        body: article.body,
        picture: article.picture ? article.picture : null,
        tags: article.tags || [],
        status: article.status || 0,
        published_at: article.published_at
            ? {
                  startDate: article.published_at,
                  endDate: article.published_at,
              }
            : null,
    });

    useEffect(() => {
        Object.keys(errors).length !== 0 &&
            Object.values(errors).map((error) => toast.error(error));
    }, [errors]);

    const isSaved = false;
    const handleChange = (e) => setData(e.target.name, e.target.value);
    // Debounce callback
    const debounced =
        // function
        (value) => {
            setData((data) => {
                return {
                    ...data,
                    title: value.content[0].content
                        ? value.content[0].content[0].text
                        : null,
                    body: value,
                };
            });
        };

    const [settingsOpen, setSettingsOpen] = useState(true);

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
                topNode: true,
            }),
            StarterKit.configure({
                document: false,
                heading: {
                    levels: [1, 2, 3, 4],
                },
                horizontalRule: {},
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
                limit: CHAR_LIMIT,
            }),
            TiptapLink.configure({
                openOnClick: false,
                validate: (href) => /^https?:\/\//.test(href),
            }),
        ],
        content: article.body || DEFAULT_CONTENT,
        onUpdate: ({ editor }) => {
            debounced(editor.getJSON());
        },
    });

    if (!editor) return null;

    return (
        <EditorWrapper className="absolute inset-0">
            <header className="flex items-center border-b bg-white">
                <div className="flex flex-grow-0">
                    <Link
                        href="/"
                        className="flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center bg-black text-white"
                    >
                        {/* logo */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            fill="currentColor"
                            className="h-6 w-6 flex-shrink-0 rounded-full"
                        >
                            <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z" />
                        </svg>
                    </Link>
                </div>
                <TopBar editor={editor} />
                <ActionsButton
                    editor={editor}
                    data={data}
                    post={post}
                    setData={setData}
                    processing={processing}
                    settingsOpen={settingsOpen}
                    setSettingsOpen={setSettingsOpen}
                />
            </header>
            <div className="flex items-center justify-center gap-x-6 bg-gray-900 py-2.5 px-6 sm:px-3.5">
                <p className="text-sm leading-6 text-white">
                    {getMessage(status)}
                </p>
            </div>

            <section className="relative flex grow overflow-auto overscroll-none">
                <main className="relative flex h-full min-h-full w-full grow flex-col overflow-auto overscroll-none">
                    {/* mobile */}
                    <MenuBar editor={editor} />
                    {/* end mobile */}
                    <EditorContent editor={editor} />
                </main>
                {settingsOpen && (
                    <>
                        <aside className="relative inset-0 hidden w-auto shrink-0 overflow-auto border-l md:block">
                            <Settings
                                editor={editor}
                                data={data}
                                setData={setData}
                                handleChange={handleChange}
                                limit={CHAR_LIMIT}
                            >
                                <Settings.Status defaultOpen />
                                <Settings.Images defaultOpen />
                                <Settings.Excerpt defaultOpen />
                                {/* <Settings.Images /> */}
                                <Settings.Categories defaultOpen />
                                <Settings.Tags defaultOpen />
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
                                                        Visibility
                                                    </span>
                                                    <button className="text-sm">
                                                        public
                                                    </button>
                                                </div>
                                                <div className="flex min-h-[3.5rem] w-full items-center justify-start p-4">
                                                    <span className="w-2/5 text-sm">
                                                        URL
                                                    </span>
                                                    <button className="text-sm">
                                                        theme.test/hello-world
                                                    </button>
                                                </div>
                                                <div className="flex min-h-[3.5rem] w-full items-center justify-start p-4">
                                                    <span className="w-2/5 text-sm">
                                                        Feature
                                                    </span>
                                                    <button className="text-sm">
                                                        true
                                                    </button>
                                                </div>
                                                <div className="flex min-h-[3.5rem] w-full items-center justify-start p-4">
                                                    <span className="w-2/5 text-sm">
                                                        Penulis
                                                    </span>
                                                    <button className="text-sm">
                                                        {auth.user.username}
                                                    </button>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        {/* end mobile */}
                    </>
                )}
            </section>
        </EditorWrapper>
    );
}

const ActionsButton = ({
    data,
    post,
    setData,
    processing,
    settingsOpen,
    setSettingsOpen,
}) => {
    const {
        auth,
        article,
        can: { createArticles, acceptOrRejectArticle, editAnyArticles },
        is: { draft, review, published, rejected },
    } = usePage().props;

    const handleDraftArticle = (e) => {
        e.preventDefault();
        post(route("editor.store", article.uuid), {});
    };

    const handleSubmitArticle = (e) => {
        e.preventDefault();
        post(route("editor.review", article.uuid), {});
    };

    const handleRejectArticle = (e) => {
        post(route("editor.reject", article.uuid), {});
    };

    const handlePublishArticle = (e) => {
        post(route("editor.publish", article.uuid), {});
    };

    const handleEditArticle = (e) => {
        post(route("editor.edit", article.uuid), {});
    };

    const acceptAndBelongToOther = useMemo(
        () =>
            acceptOrRejectArticle &&
            article.author.username !== auth.user.username &&
            (!published || data?.status !== 2),
        [data.status, published]
    );

    const createAndDraft = useMemo(
        () =>
            createArticles &&
            isString(data.title) &&
            isString(data.excerpt) &&
            (isObject(data.body) || isString(data.body)) &&
            data.category_id,

        [data.title, data.excerpt, data.body, data.category_id]
    );

    const requiredField = useMemo(
        () =>
            isObject(data.picture) &&
            !!data.tags.length &&
            isString(data.title) &&
            isString(data.excerpt) &&
            (isObject(data.body) || isString(data.body)) &&
            data.category_id,
        [data]
    );

    const createReview = createArticles && requiredField;

    return (
        <div className="relative flex items-center justify-end gap-x-4 pr-4">
            {article.author ? (
                <Link
                    href={route("articles.show", {
                        user: article.author.username,
                        article: article.slug,
                    })}
                    className="initial-flex items-center justify-center border border-black px-3 py-1 text-xs"
                    title="petinjauan"
                >
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
                </Link>
            ) : null}
            {article.author ? (
                <>
                    {editAnyArticles && !review && !draft ? (
                        <button
                            disabled={
                                !(editAnyArticles && requiredField) ||
                                processing
                            }
                            onClick={
                                editAnyArticles && requiredField
                                    ? handleEditArticle
                                    : null
                            }
                            title="edit artikel"
                            className="initial-flex items-center justify-center bg-gray-900 px-3 py-2 text-xs text-white disabled:bg-slate-500"
                        >
                            Edit
                        </button>
                    ) : null}
                </>
            ) : null}
            {acceptAndBelongToOther ? (
                <>
                    <button
                        disabled={!acceptAndBelongToOther || processing}
                        onClick={
                            acceptAndBelongToOther ? handleRejectArticle : null
                        }
                        title="tolak artikel"
                        className="initial-flex items-center justify-center bg-gray-900 px-3 py-2 text-xs text-white disabled:bg-slate-500"
                    >
                        Tolak
                    </button>
                    <Datepicker
                        inputClassName="w-48"
                        useRange={false}
                        asSingle={true}
                        value={data.published_at}
                        onChange={(value) =>
                            setData((data) => ({
                                ...data,
                                published_at: value,
                            }))
                        }
                    />
                    <button
                        disabled={
                            !acceptAndBelongToOther ||
                            processing ||
                            !data.published_at
                        }
                        onClick={
                            acceptAndBelongToOther ? handlePublishArticle : null
                        }
                        title="publish artikel"
                        className="initial-flex items-center justify-center bg-gray-900 px-3 py-2 text-xs text-white disabled:bg-slate-500"
                    >
                        Terbitkan
                    </button>
                </>
            ) : null}

            {!article?.author ||
            article?.author.username === auth.user.username ? (
                <>
                    {draft && (
                        <button
                            disabled={!createAndDraft || processing}
                            onClick={createAndDraft ? handleDraftArticle : null}
                            className="initial-flex items-center justify-center bg-gray-900 px-3 py-2 text-xs text-white disabled:bg-slate-500"
                            title="simpan ke draft"
                        >
                            Draft
                        </button>
                    )}
                    {rejected && (
                        <button
                            disabled={!createReview || processing}
                            onClick={createReview ? handleSubmitArticle : null}
                            className="initial-flex items-center justify-center bg-gray-900 px-3 py-2 text-xs text-white disabled:bg-slate-500"
                            title="kirimkan artikel"
                        >
                            Kirim Tulisan
                        </button>
                    )}
                </>
            ) : null}

            <button
                title="buka pengaturean editor"
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="flex items-center justify-center bg-gray-900 p-2 text-white"
            >
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
        <>
            <Toaster />
            <section {...props}>
                <div className="fixed inset-0 flex h-auto max-h-full w-full">
                    <div className="flex w-full shrink grow-0 basis-full flex-col">
                        {props.children}
                    </div>
                </div>
            </section>
        </>
    );
};
