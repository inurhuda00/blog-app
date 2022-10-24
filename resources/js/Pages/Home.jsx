import { Container } from "@/Components/Container";
import Image from "@/Components/Image";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Home({ articles }) {
    return (
        <>
            <Head title="Seorang Kapiten" />

            {/* hero */}
            <section className="bg-gray-900 py-10 md:px-12">
                <Container>
                    <div className="mb-6 grid grid-cols-10">
                        {articles.length &&
                            articles.map((article, i) => {
                                return (
                                    i === 0 && (
                                        <article
                                            className="relative col-span-full mb-10 flex flex-col items-start justify-start gap-5 md:col-span-5 md:px-5"
                                            key={i}
                                        >
                                            <span className="absolute top-0 left-0 mx-2 mt-2.5 bg-white px-2 py-1.5 text-[10px] font-bold uppercase text-gray-900 md:mx-7">
                                                {article.category.name}
                                            </span>
                                            <Image
                                                src={article.picture}
                                                alt={`thumbnail ${article.title}`}
                                                className="w-full"
                                            />
                                            <div className="px-5 md:px-0">
                                                <span className="mb-3 flex items-center gap-x-2">
                                                    <img
                                                        className="h-5 w-5 rounded-full"
                                                        width={20}
                                                        height={20}
                                                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                        alt="Rounded avatar"
                                                    />
                                                    <p className="text-xs text-gray-300">
                                                        {article.author.name}
                                                    </p>
                                                    <span className="text-gray-300">
                                                        &#x2022;
                                                    </span>
                                                    <time
                                                        className="text-xs text-gray-400"
                                                        dateTime={
                                                            article.time
                                                                .datetime
                                                        }
                                                        title={
                                                            article.time
                                                                .published_at
                                                        }
                                                    >
                                                        {" "}
                                                        {
                                                            article.time
                                                                .published_at
                                                        }{" "}
                                                    </time>
                                                </span>

                                                <Link
                                                    href={route(
                                                        "articles.show",
                                                        {
                                                            user: article.author
                                                                .username,
                                                            article:
                                                                article.slug,
                                                        }
                                                    )}
                                                >
                                                    <h2 className="mb-4 text-3xl font-bold leading-9 tracking-wide text-gray-100">
                                                        {article.title}
                                                    </h2>
                                                </Link>

                                                <p className="mb-3 font-light text-gray-300 line-clamp-3">
                                                    {article.excerpt}
                                                </p>
                                            </div>
                                        </article>
                                    )
                                );
                            })}

                        <div className="col-span-full mb-10 inline-flex flex-1 flex-col divide-y divide-gray-700 px-2 text-gray-900 md:col-span-5 md:px-5">
                            {articles.length &&
                                articles.map((article, i) => {
                                    return (
                                        i > 0 &&
                                        i <= 3 && (
                                            <article
                                                className="z-0 flex flex-row-reverse py-4 first:pt-0 md:flex-row md:py-5 lg:py-8"
                                                key={i}
                                            >
                                                <div className="w-5/12 px-3">
                                                    <Image
                                                        src={article.picture}
                                                        alt={`thumbnail ${article.title}`}
                                                    />
                                                </div>

                                                <div className="flex w-7/12 flex-initial flex-col px-3">
                                                    <span className="mb-2 flex items-center gap-x-2">
                                                        <Link
                                                            href={route(
                                                                "categories.show",
                                                                article.category
                                                                    .slug
                                                            )}
                                                            className="text-[10px] font-bold uppercase text-gray-300"
                                                        >
                                                            {
                                                                article.category
                                                                    .name
                                                            }
                                                        </Link>
                                                        <span className="text-gray-300">
                                                            &#x2022;
                                                        </span>
                                                        <time
                                                            className="text-xs text-gray-400"
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
                                                        <h3 className="mb-3 text-lg font-semibold leading-6 text-gray-100 md:text-xl lg:text-2xl">
                                                            {article.title}
                                                        </h3>
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "users.show",
                                                            article.author
                                                                .username
                                                        )}
                                                        className="flex items-center gap-x-2"
                                                    >
                                                        <img
                                                            className="h-5 w-5 rounded-full"
                                                            width={20}
                                                            height={20}
                                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                            alt="Rounded avatar"
                                                        />
                                                        <p className="text-xs text-gray-300">
                                                            {
                                                                article.author
                                                                    .name
                                                            }
                                                        </p>
                                                    </Link>
                                                </div>
                                            </article>
                                        )
                                    );
                                })}
                        </div>
                    </div>
                </Container>
            </section>
            {/* editor pick */}
            <section className="mb-5 py-12">
                <Container>
                    <div className="mb-5 inline-flex items-center justify-start px-2 md:px-8">
                        <h2 className="text-lg font-bold uppercase tracking-wide text-gray-500">
                            Pilihan Editor
                        </h2>
                    </div>
                    <div className="mb-6">
                        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-gray-200 md:px-3">
                            {articles.length &&
                                articles.map((article, i) => {
                                    return (
                                        i > 0 &&
                                        i <= 4 && (
                                            <article
                                                className="flex h-full flex-col items-start lg:px-5"
                                                key={i}
                                            >
                                                <div className="flex-1 px-2 lg:px-0">
                                                    <Image
                                                        src={article.picture}
                                                        alt={`thumbnail ${article.title}`}
                                                        className="mb-3"
                                                    />

                                                    <span className="mb-2 hidden items-center gap-x-2 md:flex">
                                                        <Link
                                                            href={route(
                                                                "users.show",
                                                                article.author
                                                                    .username
                                                            )}
                                                            className="flex items-center gap-x-2 lg:px-0"
                                                        >
                                                            <img
                                                                className="h-5 w-5 rounded-full"
                                                                width={20}
                                                                height={20}
                                                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                                alt="Rounded avatar"
                                                            />
                                                            <p className="text-xs text-gray-700">
                                                                {
                                                                    article
                                                                        .author
                                                                        .name
                                                                }
                                                            </p>
                                                        </Link>
                                                        <span className="text-gray-300">
                                                            &#x2022;
                                                        </span>
                                                        <Link
                                                            href={route(
                                                                "categories.show",
                                                                article.category
                                                                    .slug
                                                            )}
                                                            className="text-[10px] font-bold uppercase text-gray-700"
                                                        >
                                                            {
                                                                article.category
                                                                    .name
                                                            }
                                                        </Link>
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
                                                        <h3 className="mb-3 font-semibold leading-normal tracking-tight text-gray-800 sm:text-lg md:text-xl md:leading-8 lg:text-2xl">
                                                            {article.title}
                                                        </h3>
                                                    </Link>

                                                    <p className="mb-3 hidden text-sm font-light text-gray-700 md:text-base md:line-clamp-3">
                                                        {article.excerpt}
                                                    </p>
                                                </div>

                                                <time
                                                    className="px-2 text-xs text-gray-600 lg:px-0"
                                                    dateTime={
                                                        article.time.datetime
                                                    }
                                                    title={
                                                        article.time
                                                            .published_at
                                                    }
                                                >
                                                    {article.time.published_at}
                                                </time>
                                            </article>
                                        )
                                    );
                                })}
                        </div>
                    </div>
                </Container>
            </section>
            {/* new article */}
            <section className="mb-12">
                <Container>
                    <div className="mb-5 inline-flex items-center justify-start px-2 md:px-8">
                        <h2 className="text-lg font-bold uppercase tracking-wide text-gray-500">
                            Artikel Terbaru
                        </h2>
                    </div>
                    <div className="mb-6">
                        <div className="mb-12 grid grid-cols-2 md:grid-cols-3 md:px-3">
                            {articles.length &&
                                articles.map((article, i) => {
                                    return (
                                        i > 0 &&
                                        i <= 6 && (
                                            <article
                                                className="flex h-full flex-col items-start py-5 lg:px-5"
                                                key={i}
                                            >
                                                <div className="flex-1 p-2 lg:px-0">
                                                    <Image
                                                        src={article.picture}
                                                        alt={`thumbnail ${article.title}`}
                                                        className="mb-3"
                                                    />

                                                    <span className="flex items-center gap-x-2 md:mb-2">
                                                        <Link
                                                            href={route(
                                                                "categories.show",
                                                                article.category
                                                                    .slug
                                                            )}
                                                            className="text-[10px] font-bold uppercase text-gray-700"
                                                        >
                                                            {
                                                                article.category
                                                                    .name
                                                            }
                                                        </Link>
                                                        <span className="text-gray-300">
                                                            &#x2022;
                                                        </span>
                                                        <time
                                                            className="text-xs text-gray-600"
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
                                                        <h3 className="mb-3 text-lg font-semibold leading-normal tracking-tight text-gray-800 md:text-xl md:leading-8 lg:text-2xl">
                                                            {article.title}
                                                        </h3>
                                                    </Link>
                                                    <p className="mb-3 text-sm font-light text-gray-700 line-clamp-3 md:text-base">
                                                        {article.excerpt}
                                                    </p>
                                                </div>

                                                <Link
                                                    href={route(
                                                        "users.show",
                                                        article.author.username
                                                    )}
                                                    className="flex items-center gap-x-2 px-2 lg:px-0 "
                                                >
                                                    <img
                                                        className="h-5 w-5 rounded-full"
                                                        width={20}
                                                        height={20}
                                                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                        alt="Rounded avatar"
                                                    />
                                                    <p className="text-xs text-gray-700">
                                                        {article.author.name}
                                                    </p>
                                                </Link>
                                            </article>
                                        )
                                    );
                                })}
                        </div>
                    </div>
                </Container>
            </section>
            {/* editorial */}
            <section className="mb-5 bg-gray-900 py-12">
                <Container>
                    <div className="mb-5 inline-flex items-center justify-start px-2 md:px-8">
                        <h2 className="text-lg font-bold uppercase tracking-wide text-gray-500">
                            Editorial
                        </h2>
                    </div>
                    <div className="mb-6">
                        <div className="grid grid-cols-2 gap-y-5 md:grid-cols-4 md:divide-x md:divide-gray-200 md:px-3">
                            {articles.length &&
                                articles.map((article, i) => {
                                    return (
                                        i > 0 &&
                                        i <= 4 && (
                                            <article
                                                className="flex h-full flex-col items-start p-3 lg:px-5"
                                                key={i}
                                            >
                                                <div className="flex-1 lg:px-0">
                                                    <Image
                                                        src={article.picture}
                                                        alt={`thumbnail ${article.title}`}
                                                        className="mb-3"
                                                    />

                                                    <span className="mb-2 flex items-center gap-x-2">
                                                        <Link
                                                            href={route(
                                                                "users.show",
                                                                article.author
                                                                    .username
                                                            )}
                                                            className="flex items-center gap-x-2 lg:px-0"
                                                        >
                                                            <img
                                                                className="h-5 w-5 rounded-full"
                                                                width={20}
                                                                height={20}
                                                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                                alt="Rounded avatar"
                                                            />
                                                            <p className="text-xs text-gray-300">
                                                                {
                                                                    article
                                                                        .author
                                                                        .name
                                                                }
                                                            </p>
                                                        </Link>
                                                        <span className="text-gray-300">
                                                            &#x2022;
                                                        </span>
                                                        <Link
                                                            href={route(
                                                                "categories.show",
                                                                article.category
                                                                    .slug
                                                            )}
                                                            className="text-[10px] font-bold uppercase text-gray-300"
                                                        >
                                                            {
                                                                article.category
                                                                    .name
                                                            }
                                                        </Link>
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
                                                        <h3 className="mb-3 text-lg font-semibold leading-normal tracking-tight text-white md:text-xl md:leading-8 lg:text-2xl">
                                                            {article.title}
                                                        </h3>
                                                    </Link>
                                                    <p className="mb-3 text-sm font-light text-gray-300 line-clamp-3 md:text-base">
                                                        {article.excerpt}
                                                    </p>
                                                </div>

                                                <time
                                                    className="px-2 text-xs text-gray-400 lg:px-0"
                                                    dateTime={
                                                        article.time.datetime
                                                    }
                                                    title={
                                                        article.time
                                                            .published_at
                                                    }
                                                >
                                                    {article.time.published_at}
                                                </time>
                                            </article>
                                        )
                                    );
                                })}
                        </div>
                    </div>
                </Container>
            </section>
            {/* other article */}
            <section className="mb-5 py-12">
                <Container>
                    <div className="mb-6 flex flex-col md:flex-row">
                        <div className="mb-12 md:w-8/12 md:px-3">
                            <div className="mb-5 inline-flex items-center justify-start px-3 md:px-5">
                                <h2 className="text-lg font-bold uppercase tracking-wide text-gray-500">
                                    Artikel Lainnya
                                </h2>
                            </div>
                            <div className="inline-flex flex-col px-2 ">
                                {articles.length &&
                                    articles.map((article, i) => {
                                        return (
                                            i > 0 &&
                                            i <= 12 && (
                                                <article
                                                    className="z-0 flex pt-8 first:pt-0"
                                                    key={i}
                                                >
                                                    <div className="flex w-8/12 flex-initial flex-col px-1 md:px-3">
                                                        <span className="mb-2 flex items-center gap-x-2 bg-gray-100 pl-2">
                                                            <Link
                                                                href={route(
                                                                    "categories.show",
                                                                    article
                                                                        .category
                                                                        .slug
                                                                )}
                                                                className="text-[10px] font-bold uppercase text-gray-700"
                                                            >
                                                                {
                                                                    article
                                                                        .category
                                                                        .name
                                                                }
                                                            </Link>
                                                            <span className="text-gray-600">
                                                                &#x2022;
                                                            </span>
                                                            <time
                                                                className="text-xs text-gray-400"
                                                                dateTime={
                                                                    article.time
                                                                        .datetime
                                                                }
                                                                title={
                                                                    article.time
                                                                        .published_at
                                                                }
                                                            >
                                                                {" "}
                                                                {
                                                                    article.time
                                                                        .published_at
                                                                }{" "}
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
                                                            <h3 className="text-lg font-semibold leading-normal tracking-tight text-gray-800 md:text-xl md:leading-8">
                                                                {article.title}
                                                            </h3>
                                                        </Link>

                                                        <p className="mb-3 text-sm font-light text-gray-700 line-clamp-3 md:text-base">
                                                            {article.excerpt}
                                                        </p>

                                                        <Link
                                                            href={route(
                                                                "users.show",
                                                                article.author
                                                                    .username
                                                            )}
                                                            className="flex items-center gap-x-2"
                                                        >
                                                            <img
                                                                className="h-5 w-5 rounded-full"
                                                                width={20}
                                                                height={20}
                                                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                                alt="Rounded avatar"
                                                            />
                                                            <p className="text-xs text-gray-700">
                                                                {
                                                                    article
                                                                        .author
                                                                        .name
                                                                }
                                                            </p>
                                                        </Link>
                                                    </div>
                                                    <div className="w-4/12 px-1 md:px-3">
                                                        <Image
                                                            src={
                                                                article.picture
                                                            }
                                                            alt={`thumbnail ${article.title}`}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </article>
                                            )
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="inline-flex flex-col md:w-4/12 md:px-3">
                            <div className="mb-5 inline-flex items-center justify-start px-5">
                                <h2 className="text-lg font-bold uppercase tracking-wide text-gray-500">
                                    Popular
                                </h2>
                            </div>
                            <div className="inline-flex flex-col divide-y divide-gray-300 border-l md:mx-5 md:px-0">
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
                                                                className="text-[10px] text-gray-400"
                                                                dateTime={
                                                                    article.time
                                                                        .datetime
                                                                }
                                                                title={
                                                                    article.time
                                                                        .published_at
                                                                }
                                                            >
                                                                {" "}
                                                                {
                                                                    article.time
                                                                        .published_at
                                                                }{" "}
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
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}

Home.layout = (page) => <AppLayout children={page} />;
