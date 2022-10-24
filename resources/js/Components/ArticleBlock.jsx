import { Link } from "@inertiajs/inertia-react";

export default function ArticleBlock({ article }) {
    return (
        <div className="rounded-lg border shadow-sm">
            <div className="flex h-full flex-col px-4 py-6">
                {article.picture && (
                    <Link
                        href={route("articles.show", {
                            user: article.author,
                            article: article.slug,
                        })}
                    >
                        <img
                            src={article.picture}
                            alt={article.title}
                            className="mb-6 h-48 w-full object-cover "
                        />
                    </Link>
                )}

                <div className="flex-1">
                    {article.tags.length ? (
                        <div className="mb-3 space-x-1 text-xs font-medium tracking-tight">
                            {article.tags.map((tag) => (
                                <Link
                                    key={tag.slug}
                                    href={route("tags.show", tag.slug)}
                                    className="bg-gray-100 px-2 py-1 text-black transition duration-200 hover:bg-gray-200 "
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    ) : null}
                    <Link
                        href={route("articles.show", {
                            user: article.author,
                            article: article.slug,
                        })}
                    >
                        <h1 className="font-semibold tracking-tight text-gray-800">
                            {article.title}
                        </h1>

                        <p className="mt-2 !hidden tracking-tighter text-gray-500 line-clamp-2 md:!block">
                            {article.excerpt}
                        </p>
                    </Link>
                </div>
                <small className="mt-2 block text-sm text-gray-500 md:mt-4">
                    {article.published_at} <span>by</span>
                    <Link
                        href={route("users.show", article.author.username)}
                        className="underline"
                    >
                        {" "}
                        {article.author.name}
                    </Link>
                </small>
            </div>
        </div>
    );
}
