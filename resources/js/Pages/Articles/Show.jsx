import Articles from "@/Components/Article";
import { Container } from "@/Components/Container";
import Image from "@/Components/Image";
import PrimaryButton from "@/Components/PrimaryButton";
import SocialsLink from "@/Components/SocialsLink";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import { socials } from "../Users/Show";

export default function Show({ auth, ...props }) {
    const { data: article, related: articles } = props.article;

    return (
        <>
            <Head title={article.title} />
            {auth.user?.username === article.author.username && (
                <Link href={route("articles.edit", article.slug)}>
                    <PrimaryButton className="sticky top-0 w-full">
                        edit
                    </PrimaryButton>
                </Link>
            )}
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
                                            className="text-sm font-semibold uppercase text-gray-700"
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
                                                            {article.share.map(
                                                                (share, i) => {
                                                                    return (
                                                                        <a
                                                                            key={
                                                                                i
                                                                            }
                                                                            href={
                                                                                share.uri
                                                                            }
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="flex items-center gap-x-4 font-medium"
                                                                        >
                                                                            {socials[
                                                                                share
                                                                                    .name
                                                                            ]
                                                                                ? socials[
                                                                                      share
                                                                                          .name
                                                                                  ]
                                                                                      .icon
                                                                                : socials[
                                                                                      "website"
                                                                                  ]
                                                                                      .icon}
                                                                        </a>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <div className="prose-sm mx-auto mt-8 box-border w-full max-w-4xl border-0 border-solid border-gray-100 px-5 md:prose lg:col-span-11 lg:max-w-6xl lg:px-0 lg:pl-8">
                                        <p className="mt-0 space-x-2 pt-0">
                                            <Link
                                                href={route("home")}
                                                target="_blank"
                                                rel="noopener"
                                                className="font-semibold"
                                            >
                                                Blog.co
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
                            <section className="inline-flex w-full items-center justify-start border border-gray-300 py-6">
                                <div className="mx-auto  flex max-w-lg flex-col items-center justify-center gap-x-4 px-4 text-center">
                                    <Link
                                        href={route(
                                            "users.show",
                                            article.author.username
                                        )}
                                        className="flex flex-col items-center justify-center gap-x-4 px-4 text-center"
                                    >
                                        <img
                                            className="mb-6 h-12 w-12 rounded-full"
                                            width={20}
                                            height={20}
                                            src={article.author.avatar}
                                            alt="Rounded avatar"
                                        />
                                        <p className="mb-3 text-2xl font-semibold leading-tight text-gray-800">
                                            {article.author.name}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            {article.author.bio}
                                        </p>
                                    </Link>

                                    <SocialsLink
                                        user={article.author}
                                        socials={socials}
                                    />
                                </div>
                            </section>
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
                                                            <h3 className="mb-2 text-xl font-semibold leading-tight text-gray-800 lg:text-2xl">
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
                            {articles.length ? (
                                <Articles
                                    As="section"
                                    className="inline-flex flex-col divide-y divide-gray-300 border-l px-2 md:mx-5 md:px-0"
                                >
                                    <Articles.ListArchive articles={articles} />
                                </Articles>
                            ) : null}
                        </aside>
                    </div>
                </Container>
            </section>
        </>
    );
}

Show.layout = (page) => <AppLayout children={page} />;
