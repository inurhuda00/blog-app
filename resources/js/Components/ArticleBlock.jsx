import { Link } from "@inertiajs/inertia-react";

export default function ArticleBlock({ article }) {
    return (
        <div className="border shadow-sm rounded-lg">
            <div className="px-4 py-6 h-full flex-col flex">
                {article.picture && (
                    <Link href={route("articles.show", article.slug)}>
                        <img
                            src={article.picture}
                            alt={article.title}
                            className="w-full h-48 object-cover mb-6 rounded-md"
                        />
                    </Link>
                )}

                <div className="flex-1">
                    {article.tags.length ? (
                        <div className="text-xs font-medium tracking-tight space-x-1 mb-3">
                            {article.tags.map((tag) => (
                                <Link
                                    key={tag.slug}
                                    href={route("tags.show", tag.slug)}
                                    className="text-black hover:bg-gray-200 bg-gray-100 transition duration-200 px-2 py-1 rounded-md"
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    ) : null}
                    <Link href={route("articles.show", article.slug)}>
                        <h1 className="text-gray-800 font-semibold tracking-tight">
                            {article.title}
                        </h1>

                        <p className="!hidden md:!block text-gray-500 mt-2 line-clamp-2 tracking-tighter">
                            {article.excerpt}
                        </p>
                    </Link>
                </div>
                <small className="block mt-2 text-sm text-gray-500 md:mt-4">
                    {article.created_at} <span>by</span>
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
