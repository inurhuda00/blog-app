import Image from "@/Components/Image";
import { Link } from "@inertiajs/inertia-react";
import clsx from "clsx";

const InlineBlock = ({
    article,
    author = false,
    category = false,
    time = false,
    dark = false,
    className,
}) => (
    <span
        className={clsx(
            "flex items-center justify-start gap-x-2",
            dark ? "text-gray-300" : "text-gray-700",
            className
        )}
    >
        {category ? (
            <Link
                href={route("categories.show", article.category.slug)}
                className="text-[10px] font-bold uppercase"
            >
                {article.category.name}
            </Link>
        ) : null}
        {author ? (
            <Link
                href={route("users.show", article.author.username)}
                className="flex items-center gap-x-2 md:hidden lg:flex "
            >
                <img
                    className="h-5 w-5 rounded-full"
                    width={20}
                    height={20}
                    src={article.author.avatar}
                    alt="Rounded avatar"
                />
                <p className="text-xs">{article.author.name}</p>
            </Link>
        ) : null}
        {time ? (
            <>
                <span>&#x2022;</span>
                <time
                    className="text-xs"
                    dateTime={article.time.datetime}
                    title={article.time.published_at}
                >
                    {article.time.published_at}
                </time>
            </>
        ) : null}
    </span>
);

const Title = ({ article, className, dark = false, As = "h3" }) => (
    <As
        className={clsx(
            "text-lg font-semibold leading-8 tracking-tighter  md:text-xl xl:text-[1.375rem]",
            dark ? "text-gray-100" : "text-gray-800",
            className
        )}
    >
        {article.title}
    </As>
);

const Articles = ({ children, className, As = "div", ...props }) => {
    return (
        <As className={clsx(className)} {...props}>
            {children}
        </As>
    );
};

const CardFeature = ({ articles, count = 1, index = 0 }) => {
    return articles.map((article, i) => {
        return i >= index && i < count ? (
            <article
                className="relative col-span-full mb-10 flex flex-col items-start justify-start gap-5 md:col-span-5 lg:px-5"
                key={i}
            >
                <span className="absolute top-0 left-0 mx-2 mt-2.5 bg-white px-2 py-1.5 text-[10px] font-bold uppercase text-gray-900 md:mx-7">
                    {article.category.name}
                </span>
                <Link
                    href={route("articles.show", {
                        user: article.author.username,
                        article: article.slug,
                    })}
                    className="w-full"
                >
                    <Image
                        src={article.picture}
                        alt={`thumbnail ${article.title}`}
                    />
                </Link>

                <div className="px-5 md:px-0">
                    <InlineBlock
                        article={article}
                        className="mb-3"
                        dark
                        author
                        time
                    />

                    <Link
                        href={route("articles.show", {
                            user: article.author.username,
                            article: article.slug,
                        })}
                    >
                        <h2 className="mb-4 text-3xl font-bold leading-9 tracking-wide text-gray-100">
                            {article.title}
                        </h2>
                    </Link>

                    <p className="mb-3 text-gray-300 line-clamp-3">
                        {article.excerpt}
                    </p>
                </div>
            </article>
        ) : null;
    });
};

const CardFeatureSmall = ({ articles, count = 3, index = 0 }) => {
    return articles.map((article, i) => {
        return i >= index && i < count ? (
            <article
                className="z-0 flex flex-row-reverse py-4 first:pt-0 md:flex-row md:py-5 lg:py-8"
                key={i}
            >
                <Link
                    href={route("articles.show", {
                        user: article.author.username,
                        article: article.slug,
                    })}
                    className="w-5/12 px-3"
                >
                    <Image
                        src={article.picture}
                        alt={`thumbnail ${article.title}`}
                    />
                </Link>

                <div className="flex w-7/12 flex-initial flex-col px-3">
                    <InlineBlock article={article} category time dark />
                    <Link
                        href={route("articles.show", {
                            user: article.author.username,
                            article: article.slug,
                        })}
                    >
                        <Title article={article} dark className="mb-3" />
                    </Link>

                    <Link
                        href={route("users.show", article.author.username)}
                        className="flex items-center gap-x-2 md:hidden lg:flex "
                    >
                        <img
                            className="h-5 w-5 rounded-full"
                            width={20}
                            height={20}
                            src={article.author.avatar}
                            alt="Rounded avatar"
                        />
                        <p className="text-xs text-gray-300">
                            {article.author.name}
                        </p>
                    </Link>
                </div>
            </article>
        ) : null;
    });
};

const CardEditorPick = ({ articles, count = 4, index = 0, dark = false }) => {
    return articles.map((article, i) => {
        return i >= index && i < count ? (
            <article
                className="flex h-full flex-col items-start lg:px-5"
                key={i}
            >
                <div className="flex-1 px-2 lg:px-0">
                    <Link
                        href={route("articles.show", {
                            user: article.author.username,
                            article: article.slug,
                        })}
                    >
                        <Image
                            src={article.picture}
                            alt={`thumbnail ${article.title}`}
                        />
                    </Link>

                    <span className="mb-2 mt-3 hidden items-center gap-x-2 md:flex">
                        <InlineBlock article={article} author dark={dark} />
                        <span className="text-gray-300">&#x2022;</span>
                        <Link
                            href={route(
                                "categories.show",
                                article.category.slug
                            )}
                            className={clsx(
                                "text-[10px] font-bold uppercase ",
                                dark ? "text-gray-300" : "text-gray-700"
                            )}
                        >
                            {article.category.name}
                        </Link>
                    </span>
                    <Link
                        href={route("articles.show", {
                            user: article.author.username,
                            article: article.slug,
                        })}
                    >
                        <Title article={article} dark={dark} className="mb-3" />
                    </Link>

                    <p
                        className={clsx(
                            "mb-3 hidden text-sm md:line-clamp-3",
                            dark ? "text-gray-300" : "text-gray-700"
                        )}
                    >
                        {article.excerpt}
                    </p>
                </div>

                <time
                    className={clsx(
                        "text-x px-2 lg:px-0",
                        dark ? "text-gray-400" : "text-gray-600"
                    )}
                    dateTime={article.time.datetime}
                    title={article.time.published_at}
                >
                    {article.time.published_at}
                </time>
            </article>
        ) : null;
    });
};

const CardList = ({ articles, count = 12, index = 0 }) => {
    return articles.map((article, i) => {
        return i >= index && i < count ? (
            <article className="z-0 flex pt-8 first:pt-0" key={i}>
                <div className="flex w-8/12 flex-initial flex-col px-1 md:px-3">
                    <span className="mb-2 flex items-center gap-x-2 bg-gray-100 pl-2">
                        <Link
                            href={route(
                                "categories.show",
                                article.category.slug
                            )}
                            className="text-[10px] font-bold uppercase text-gray-700"
                        >
                            {article.category.name}
                        </Link>
                        <span className="text-gray-600">&#x2022;</span>
                        <time
                            className="text-xs text-gray-400"
                            dateTime={article.time.datetime}
                            title={article.time.published_at}
                        >
                            {article.time.published_at}
                        </time>
                    </span>

                    <Link
                        href={route("articles.show", {
                            user: article.author.username,
                            article: article.slug,
                        })}
                    >
                        <Title article={article} />
                    </Link>

                    <p className="mb-3 text-sm text-gray-700 line-clamp-3">
                        {article.excerpt}
                    </p>

                    <Link
                        href={route("users.show", article.author.username)}
                        className="flex items-center gap-x-2"
                    >
                        <img
                            className="h-5 w-5 rounded-full"
                            width={20}
                            height={20}
                            src={article.author.avatar}
                            alt="Rounded avatar"
                        />
                        <p className="text-xs text-gray-700">
                            {article.author.name}
                        </p>
                    </Link>
                </div>
                <Link
                    href={route("articles.show", {
                        user: article.author.username,
                        article: article.slug,
                    })}
                    className="w-4/12 px-1 md:px-3"
                >
                    <Image
                        src={article.picture}
                        alt={`thumbnail ${article.title}`}
                        loading="lazy"
                    />
                </Link>
            </article>
        ) : null;
    });
};

const CardGrid = ({ articles, count = 6, index = 0 }) => {
    return articles.map((article, i) => {
        return i >= index && i < count ? (
            <article
                className="flex h-full flex-col items-start py-5 lg:px-5"
                key={i}
            >
                <div className="flex-1 p-2 lg:px-0">
                    <Link
                        href={route("articles.show", {
                            user: article.author.username,
                            article: article.slug,
                        })}
                    >
                        <Image
                            src={article.picture}
                            alt={`thumbnail ${article.title}`}
                            className="mb-3"
                        />
                    </Link>

                    <InlineBlock article={article} category time />

                    <Link
                        href={route("articles.show", {
                            user: article.author.username,
                            article: article.slug,
                        })}
                    >
                        <Title article={article} className="mb-3" />
                    </Link>
                    <p className="mb-3 text-sm text-gray-700 line-clamp-3">
                        {article.excerpt}
                    </p>
                </div>

                <Link
                    href={route("users.show", article.author.username)}
                    className="flex items-center gap-x-2 px-2 lg:px-0 "
                >
                    <img
                        className="h-5 w-5 rounded-full"
                        width={20}
                        height={20}
                        src={article.author.avatar}
                        alt="Rounded avatar"
                    />
                    <p className="text-xs text-gray-700">
                        {article.author.name}
                    </p>
                </Link>
            </article>
        ) : null;
    });
};

const ListArchive = ({ articles, count = 4, index = 0 }) => {
    return articles.map((article, i) => {
        return i >= index && i < count ? (
            <article className="z-0 flex py-5 first:pt-0 md:px-5" key={i}>
                <div className="flex-initial flex-col px-3">
                    <InlineBlock article={article} category time />

                    <Link
                        href={route("articles.show", {
                            user: article.author.username,
                            article: article.slug,
                        })}
                    >
                        <h3 className="mb-2 font-medium leading-tight text-gray-800">
                            {article.title}
                        </h3>
                    </Link>
                </div>
            </article>
        ) : null;
    });
};

Articles.CardFeature = CardFeature;
Articles.CardFeatureSmall = CardFeatureSmall;
Articles.CardEditorPick = CardEditorPick;
Articles.CardGrid = CardGrid;
Articles.CardList = CardList;
Articles.ListArchive = ListArchive;

export default Articles;
