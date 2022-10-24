import { Container } from "@/Components/Container";
import Image from "@/Components/Image";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Show({ ...props }) {
    const { data: article, related: articles } = props.article;
    const { update_article } = props.can;

    return (
        <>
            <Head title={article.title} />

            <section className="mb-5 py-12">
                <Container>
                    <div className="mb-6 flex flex-col md:flex-row">
                        <main className="mb-12 md:w-8/12 md:px-3">
                            <article className="flex flex-col lg:px-5">
                                <Image
                                    src={article.picture}
                                    className="mb-10 w-full"
                                />
                                <div className="flex-initial flex-col px-5 md:px-3 lg:px-0">
                                    <span className="mb-5 flex items-center gap-x-2">
                                        <Link
                                            class="text-sm font-semibold uppercase text-gray-700"
                                            href={route(
                                                "categories.show",
                                                article.category.slug
                                            )}
                                        >
                                            {article.category.name}
                                        </Link>
                                        <span className="text-gray-600">
                                            &#x2022;
                                        </span>
                                        <time
                                            className="text-sm font-medium text-gray-600"
                                            dateTime={article.time.datetime}
                                            title={article.time.published_at}
                                        >
                                            {article.time.published_at}
                                        </time>
                                    </span>

                                    <h1 className="mb-2 whitespace-pre-wrap text-4xl font-bold leading-tight text-gray-800">
                                        {article.title}
                                    </h1>
                                </div>

                                <div className="lg:grid lg:grid-cols-12">
                                    <div className="hidden lg:col-span-1 lg:block">
                                        <section className="sticky top-10 mt-0 py-12 print:hidden">
                                            <div className="flex flex-col items-center">
                                                <div>
                                                    <button className="flex flex-col items-center gap-x-4 gap-y-2.5 text-slate-900">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="fade h-6 w-6 text-slate-400 hover:text-rose-600"
                                                            width={24}
                                                            height={24}
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={2}
                                                            stroke="currentColor"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path
                                                                stroke="none"
                                                                d="M0 0h24v24H0z"
                                                                fill="none"
                                                            />
                                                            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                                        </svg>
                                                        <span className="text-base font-medium leading-none dark:text-white">
                                                            0
                                                        </span>
                                                    </button>
                                                </div>
                                                <div className="mt-10 flex flex-col items-center gap-y-5">
                                                    <div className="text-center">
                                                        <h4 className="text-primary-500 shadow-down-strike dark:shadow-underline-sky-dark inline font-semibold uppercase dark:text-sky-500">
                                                            Share
                                                        </h4>
                                                        <div className="mt-4 flex flex-col items-center gap-y-6">
                                                            <a
                                                                href="https://twitter.com/intent/tweet?url=https://parsinta.com/s/VbP74&text=PHPStorm"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-x-4 font-medium"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-4 w-4 text-[#1da1f2]"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <path
                                                                        stroke="none"
                                                                        d="M0 0h24v24H0z"
                                                                        fill="none"
                                                                    />
                                                                    <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
                                                                </svg>
                                                            </a>
                                                            <a
                                                                href="https://www.facebook.com/sharer/sharer.php?u=https://parsinta.com/s/VbP74"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-x-4 font-medium"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-4 w-4 text-blue-600"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <path
                                                                        stroke="none"
                                                                        d="M0 0h24v24H0z"
                                                                        fill="none"
                                                                    />
                                                                    <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                                                                </svg>
                                                            </a>
                                                            <a
                                                                href="https://www.linkedin.com/shareArticle?mini=true&url=https://parsinta.com/s/VbP74&summary=PHPStorm"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-x-4 font-medium"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-4 w-4 text-sky-700"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <path
                                                                        stroke="none"
                                                                        d="M0 0h24v24H0z"
                                                                        fill="none"
                                                                    />
                                                                    <rect
                                                                        x={4}
                                                                        y={4}
                                                                        width={
                                                                            16
                                                                        }
                                                                        height={
                                                                            16
                                                                        }
                                                                        rx={2}
                                                                    />
                                                                    <line
                                                                        x1={8}
                                                                        y1={11}
                                                                        x2={8}
                                                                        y2={16}
                                                                    />
                                                                    <line
                                                                        x1={8}
                                                                        y1={8}
                                                                        x2={8}
                                                                        y2="8.01"
                                                                    />
                                                                    <line
                                                                        x1={12}
                                                                        y1={16}
                                                                        x2={12}
                                                                        y2={11}
                                                                    />
                                                                    <path d="M16 16v-3a2 2 0 0 0 -4 0" />
                                                                </svg>
                                                            </a>
                                                            <a
                                                                href="https://pinterest.com/pin/create/button/?media=&url=https://parsinta.com/s/VbP74=PHPStorm"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-x-4 font-medium"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-4 w-4 text-rose-500"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <path
                                                                        stroke="none"
                                                                        d="M0 0h24v24H0z"
                                                                        fill="none"
                                                                    />
                                                                    <line
                                                                        x1={8}
                                                                        y1={20}
                                                                        x2={12}
                                                                        y2={11}
                                                                    />
                                                                    <path d="M10.7 14c.437 1.263 1.43 2 2.55 2c2.071 0 3.75 -1.554 3.75 -4a5 5 0 1 0 -9.7 1.7" />
                                                                    <circle
                                                                        cx={12}
                                                                        cy={12}
                                                                        r={9}
                                                                    />
                                                                </svg>
                                                            </a>
                                                            <a
                                                                href="https://t.me/share/url?url=https://parsinta.com/s/VbP74&text=PHPStorm"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-x-4 font-medium"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-4 w-4 text-sky-600"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <path
                                                                        stroke="none"
                                                                        d="M0 0h24v24H0z"
                                                                        fill="none"
                                                                    />
                                                                    <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                                                                </svg>
                                                            </a>
                                                            <a
                                                                href="https://wa.me/?text=PHPStorm+https%3A%2F%2Fparsinta.com/articles/phpstorm-cw2rsu"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-x-4 font-medium"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-4 w-4 text-emerald-500"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <path
                                                                        stroke="none"
                                                                        d="M0 0h24v24H0z"
                                                                        fill="none"
                                                                    />
                                                                    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                                                                    <path d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1" />
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <div className="prose prose-slate mx-auto mt-8 box-border w-full max-w-4xl border-0 border-solid border-gray-100 px-5 dark:prose-invert md:prose-lg lg:col-span-11 lg:max-w-6xl lg:px-0 lg:pl-8">
                                        <p className="mt-0 space-x-2 pt-0">
                                            <Link
                                                href={route("home")}
                                                target="_blank"
                                                rel="noopener"
                                                className="font-semibold"
                                            >
                                                GOAHIRA.CO
                                            </Link>
                                            <span>–</span>
                                            <em>{article.title}</em>
                                        </p>
                                        <p>
                                            "Tuhaaaaaaaaaaan, mereka memang
                                            keparaaaaaat!"
                                        </p>
                                        <p>
                                            Aku tentu mendengar bunyi yang amat
                                            keras itu. Hampir menyerupai bunyi
                                            kaleng yang remuk terlindas benda
                                            berat, tetapi lebih kencang,
                                            volumenya sepuluh kali lipat. Aku
                                            berlari kencang menuju sumber suara
                                            itu. Firasatku yang tak beres
                                            membuat langkahku berkejaran tanpa
                                            aturan, semakin cepat. Aku bisa
                                            merasakannya. Aku bisa menciumnya.
                                            Berpuluh-puluh tahun aku hidup di
                                            wilayah ini. Aku sangat hafal dan
                                            sejauh ini aku tak pernah meleset.
                                            Bunyi macam itu, aroma sesudahnya,
                                            tak salah lagi, ini bau kematian!
                                        </p>
                                        <p>
                                            Apa kubilang! Aku tak mungkin salah!
                                            Duhai betapa bengisnya takdir. Satu
                                            hal yang sampai saat ini belum bisa
                                            kupahami cara kerjanya. Padahal baru
                                            beberapa saat lalu aku
                                            berjalan-jalan mencari makan
                                            bersamanya. Dia sedikit membagi
                                            cerita. Katanya, dia sedang
                                            mengandung, dan sampai saat ini
                                            belum ditemukan kejelasan siapa
                                            gerangan ayah dari anak yang sedang
                                            dikandungnya. "Akibat terlalu banyak
                                            seks bebas," katanya. Belum sempat
                                            aku memberi jawaban untuk keluh
                                            kesah terakhirnya itu, dan kini ia
                                            keburu mati. Terkapar di pinggir
                                            jalan. Sebuah mobil plat merah
                                            dengan kecepatan tinggi mengoyak
                                            tengkorak bagian belakangnya.
                                        </p>
                                        <p>
                                            Mobilnya lari. Tidak bertanggung
                                            jawab kepada nyawanya, juga nyawa
                                            yang sedang dikandungnya. Tidak pula
                                            sekadar berhenti atau menampakkan
                                            raut wajah sedih. Yang seperti ini
                                            pun aku sudah hafal. Aku pergi
                                            menuju tubuh kaku itu, aku kelilingi
                                            meski tak tahu harus berbuat apa.
                                            Ada beberapa yang berkerumun. Aku
                                            hampiri satu per satu dari mereka
                                            yang dengan mata batu hanya
                                            berkumpul memandangi mayat anyir
                                            calon ibu dan kandungannya itu.
                                        </p>
                                        <p>
                                            Aku berteriak minta bantuan, "ayo
                                            angkat!"
                                        </p>
                                        <p>Mereka mematung.</p>
                                        <p>
                                            Aku coba lagi, "ayo sorong dia ke
                                            tepian!"
                                        </p>
                                        <p>Mereka malah memandangiku.</p>
                                        <p>
                                            Aku tak patah, "kalau begitu
                                            setidaknya tutupi dia dengan
                                            sesuatu, darah adalah momok bagi
                                            kehidupan, adalah kesenyapan dari
                                            tiap kurun zaman!"
                                        </p>
                                        <p>
                                            Mereka hanya dingin, mereka
                                            benar-benar dingin. Membuat
                                            seluruhnya juga jadi dingin. Darah
                                            menjadi lebih cepat rekat dengan
                                            aspal jalan yang basah. Mereka tetap
                                            dingin dan aku tetap tidak mengerti
                                            apa yang harus kuperbuat. Bahkan
                                            kematian tak menggetarkan mereka.
                                            Mungkin karena bagi mereka kami
                                            hanya umpatan. Hanya pelampiasan
                                            atas nasib sial. Semacam lubang
                                            ventilasi ketika semua tak lagi
                                            tertangguhkan. Jauh di dalam diri
                                            mereka, sesungguhnya kami amat
                                            hidup. Bahkan telah menyatu dengan
                                            darah, bibir, mulut, hati mereka
                                            sehari-hari. Mereka bawa kami ke
                                            dalam setiap percakapan, dalam
                                            setiap dongeng-dongeng nasihat
                                            kebajikan, atau ke dalam
                                            seburuk-buruknya perumpamaan. Bagi
                                            mereka kami adalah kebaikan, juga
                                            keburukan. Simbol cinta, juga simbol
                                            kebencian.
                                        </p>
                                        <p>
                                            Mereka meletakkan kami semau-maunya.
                                            Memperlakukan kami seenaknya.
                                            Padahal kami amat hidup di dalam
                                            kamus budaya mereka. Tetapi kenapa,
                                            apakah begitu sukar untuk sekadar
                                            mengubur tubuh beku beserta anak
                                            yang dikandungnya itu?
                                        </p>
                                        <p>
                                            "Tuhaaaaaan, mereka memang
                                            keparaaaaat!"
                                        </p>
                                        <p>
                                            <strong>***</strong>
                                        </p>
                                        <p>"Halo Bu, ada apa?"</p>
                                        <p>
                                            "Setelah seluruh pekerjaanmu di
                                            kantor selesai, cepat pulang ke
                                            rumah. Parsi dan keluarganya datang
                                            ke rumah mencarimu."
                                        </p>
                                        <p>"Loh, ada apa, Bu?"</p>
                                        <p>"Minta pertanggung jawaban."</p>
                                        <p>
                                            Suara Ibu di seberang terputus
                                            seketika. Tiga puluh tujuh&nbsp;
                                            <em>notif</em>
                                            &nbsp;telepon dan&nbsp;<em>chat</em>
                                            &nbsp;di&nbsp;<em>WhatsApp</em>
                                            &nbsp;tidak kubuka. Segera kukemasi
                                            seluruh barang-barangku di ruang
                                            kerja dan memacu penuh kecepatan
                                            mobil. Dari nada bicaranya Ibu
                                            nampak serius. Ini pasti bukan
                                            masalah sepele. Dua hari lalu aku
                                            memang meniduri Parsi. Tapi aku
                                            pakai kondom! Harusnya yang datang
                                            ke rumah adalah Nani, atau Yanis,
                                            atau seorang perempuan entah siapa
                                            namanya yang tempo lalu mabuk berat
                                            dan menumpang di mobilku. Atau
                                            seorang anak gadis tetangga yang
                                            kebetulan minta kuajari kiat-kiat
                                            lolos tes CPNS waktu rumahnya
                                            kosong. Atau Kirana, dari beberapa
                                            wanita di kantor memang hanya dia
                                            yang mau diajak tidur oleh siapa
                                            saja. Atau...
                                        </p>
                                        <p>
                                            <em>Braaaaaak</em>!
                                        </p>
                                        <p>
                                            Nama-nama itu seketika lenyap dari
                                            tempurung kepalaku. Celaka, aku
                                            menabrak sesuatu. Sedikit
                                            kuperlambat laju mobilku. Kutengok
                                            spion untuk memastikan gerangan apa
                                            yang baru saja kutabrak karena
                                            suaranya memang sangat keras.
                                        </p>
                                        <p>"Bajingan, anjing bunting!"</p>
                                        <p>
                                            Masa bodoh pikirku. Melaju terus
                                            saja. Aku masih mencari satu nama
                                            terakhir yang kutiduri dalam sepekan
                                            terakhir ini.
                                        </p>
                                        <p>
                                            <strong>
                                                <em>
                                                    Sinangoh Prendeng, Desember
                                                    2019.
                                                </em>
                                            </strong>
                                        </p>
                                        <p />
                                        <p>
                                            Sobrun Jamil, tinggal dan bekerja di
                                            Pekalongan. Ikut ngurusi hal-hal
                                            kecil di Buletin Lintang. Kalau mau
                                            jadi saudara, bisa lewat Instagram:
                                            @sobrunjamil_ atau hubungi nomor
                                            WhatsApp: 082141506300.
                                        </p>
                                        <p>&nbsp;</p>
                                    </div>
                                </div>
                            </article>
                        </main>
                        <aside className="inline-flex flex-col md:w-4/12 md:px-3">
                            <section className="mb-5 inline-flex items-center justify-start border border-gray-300 px-5 md:mx-5">
                                {articles.length &&
                                    articles.map((article, i) => {
                                        return (
                                            i === 0 && (
                                                <article
                                                    className="z-0 flex py-10 md:px-3"
                                                    key={i}
                                                >
                                                    <div className="flex-initial flex-col">
                                                        <Link
                                                            href={route(
                                                                "articles.show",
                                                                {
                                                                    user: article
                                                                        .author
                                                                        .username,
                                                                    article:
                                                                        article.slug,
                                                                }
                                                            )}
                                                        >
                                                            <h3 className="mb-2 text-2xl font-semibold leading-tight text-gray-800">
                                                                {article.title}
                                                            </h3>
                                                        </Link>
                                                        <span className="mb-1 flex items-center gap-x-2">
                                                            <Link
                                                                href={route(
                                                                    "users.show",
                                                                    article
                                                                        .author
                                                                        .username
                                                                )}
                                                                className="flex items-center gap-x-2"
                                                            >
                                                                <p className="text-[10px] text-gray-700">
                                                                    {
                                                                        article
                                                                            .author
                                                                            .name
                                                                    }
                                                                </p>
                                                            </Link>
                                                            <span className="text-gray-600">
                                                                &#x2022;
                                                            </span>
                                                            <time
                                                                className="text-[10px] text-gray-600"
                                                                dateTime={
                                                                    article.time
                                                                        .datetime
                                                                }
                                                                title={
                                                                    article.time
                                                                        .published_at
                                                                }
                                                            >
                                                                {
                                                                    article.time
                                                                        .published_at
                                                                }
                                                            </time>
                                                        </span>
                                                    </div>
                                                </article>
                                            )
                                        );
                                    })}
                            </section>

                            <div className="mb-5 inline-flex items-center justify-start px-5">
                                <h2 className="text-lg font-bold uppercase tracking-wide text-gray-500">
                                    Kategori Yang Sama
                                </h2>
                            </div>
                            <section className="inline-flex flex-col divide-y divide-gray-300 border-l px-2 md:mx-5 md:px-0">
                                {articles.length &&
                                    articles.map((article, i) => {
                                        return (
                                            i > 0 &&
                                            i <= 4 && (
                                                <article
                                                    className="z-0 flex py-5 first:pt-0 md:px-5"
                                                    key={i}
                                                >
                                                    <div className="flex-initial flex-col px-3">
                                                        <span className="mb-1 flex items-center gap-x-2">
                                                            <Link
                                                                href={route(
                                                                    "users.show",
                                                                    article
                                                                        .author
                                                                        .username
                                                                )}
                                                                className="flex items-center gap-x-2"
                                                            >
                                                                <p className="text-[10px] text-gray-700">
                                                                    {
                                                                        article
                                                                            .author
                                                                            .name
                                                                    }
                                                                </p>
                                                            </Link>
                                                            <span className="text-gray-600">
                                                                &#x2022;
                                                            </span>
                                                            <time
                                                                className="text-[10px] text-gray-600"
                                                                dateTime={
                                                                    article.time
                                                                        .datetime
                                                                }
                                                                title={
                                                                    article.time
                                                                        .published_at
                                                                }
                                                            >
                                                                {
                                                                    article.time
                                                                        .published_at
                                                                }
                                                            </time>
                                                        </span>
                                                        <Link
                                                            href={route(
                                                                "articles.show",
                                                                {
                                                                    user: article
                                                                        .author
                                                                        .username,
                                                                    article:
                                                                        article.slug,
                                                                }
                                                            )}
                                                        >
                                                            <h3 className="mb-2 font-medium leading-tight text-gray-800">
                                                                {article.title}
                                                            </h3>
                                                        </Link>
                                                    </div>
                                                </article>
                                            )
                                        );
                                    })}
                            </section>
                        </aside>
                    </div>
                </Container>
            </section>
        </>
    );
}

Show.layout = (page) => <AppLayout children={page} />;
