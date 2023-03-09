import Articles from "@/Components/Article";
import { Container } from "@/Components/Container";
import Image from "@/Components/Image";
import PrimaryButton from "@/Components/PrimaryButton";
import SocialsLink from "@/Components/SocialsLink";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import { socials } from "../Users/Show";

export default function Show({
    auth,
    can: { editOwnArticles, editAnyArticles },
    ...props
}) {
    const { data: article, related: articles } = props.article;

    return (
        <>
            <Head title={article.title} />
            {(auth.user?.username === article.author.username ||
                editAnyArticles) && (
                <Link href={route("editor", article.slug)}>
                    <PrimaryButton className="sticky top-0 w-full">
                        edit
                    </PrimaryButton>
                </Link>
            )}
            <section className="mb-5 py-12">
                <Container>
                    <div className="mb-6 flex flex-col md:flex-row">
                        <main className="mb-12 md:w-8/12 md:px-3">
                            <article className="mb-24 flex flex-col lg:px-5">
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
                                    <h1 className="mb-2 whitespace-pre-wrap text-4xl font-bold capitalize leading-tight text-gray-800">
                                        {article.title}
                                    </h1>

                                    <ul className="mt-3 flex items-center gap-x-12">
                                        <Link
                                            as="li"
                                            className="flex cursor-pointer items-center gap-2"
                                            href={route(
                                                "users.show",
                                                article.author.username
                                            )}
                                        >
                                            <img
                                                className="h-6 w-6 rounded-full"
                                                src={article.author.avatar}
                                                alt="author avatar"
                                            />
                                            <span className="text-xs">
                                                Oleh:
                                            </span>
                                            <span className="text-sm font-medium">
                                                {article.author.name}
                                            </span>
                                        </Link>
                                        {article.editor ? (
                                            <Link
                                                as="li"
                                                className="flex cursor-pointer items-center gap-2"
                                                href={route(
                                                    "users.show",
                                                    article.editor.username
                                                )}
                                            >
                                                <img
                                                    className="h-6 w-6 rounded-full"
                                                    src={article.editor.avatar}
                                                    alt="editor avatar"
                                                />
                                                <span className="text-xs">
                                                    editor:
                                                </span>
                                                <span className="text-sm font-medium">
                                                    {article.editor.name}
                                                </span>
                                            </Link>
                                        ) : null}
                                    </ul>
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

                                    <div
                                        className="prose-sm mx-auto mt-8 box-border w-full max-w-4xl border-0 border-solid border-gray-100 px-5 md:prose lg:col-span-11 lg:max-w-6xl lg:px-0 lg:pl-8"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                `<p class="mt-0 space-x-2 pt-0">
                                                        <a
                                                            target="_blank"
                                                            rel="noopener"
                                                            class="font-semibold"
                                                            href="http://blog-app.test/"
                                                        >
                                                            Blog.co
                                                        </a>
                                                        <span>–</span>
                                                        <em>
                                                            ${article.excerpt}
                                                        </em>
                                                    </p>` + article.body,
                                        }}
                                    ></div>
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
