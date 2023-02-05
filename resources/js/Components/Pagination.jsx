import { Link } from "@inertiajs/react";
import clsx from "clsx";

export default function Pagination({ meta, links }) {
    return (
        <div>
            {meta.links.length > 2 && (
                <>
                    <ul className="mt-10 flex items-center justify-between gap-x-0.5 md:hidden">
                        {links.prev ? (
                            <li>
                                <Link
                                    className="inline-flex rounded border p-2"
                                    href={links.prev}
                                    preserveScroll
                                >
                                    <LeftIcon />
                                </Link>
                            </li>
                        ) : (
                            <li className="inline-flex cursor-none rounded border p-2">
                                <LeftIcon />
                            </li>
                        )}
                        {links.next ? (
                            <li>
                                <Link
                                    className="inline-flex rounded border p-2"
                                    href={links.next}
                                    preserveScroll
                                >
                                    <RightIcon />
                                </Link>
                            </li>
                        ) : (
                            <li className="inline-flex cursor-none rounded border p-2">
                                <RightIcon />
                            </li>
                        )}
                    </ul>
                    <ul className="mt-10 hidden items-center justify-center gap-x-1 md:flex">
                        {meta.links.map((item, i) => {
                            return item.url != null ? (
                                item.label.includes("Previous") ? (
                                    <PaginateLink
                                        active={item.active}
                                        key={i}
                                        href={item.url}
                                    >
                                        <LeftIcon />
                                    </PaginateLink>
                                ) : item.label.includes("Next") ? (
                                    <PaginateLink
                                        active={item.active}
                                        key={i}
                                        href={item.url}
                                    >
                                        <RightIcon />
                                    </PaginateLink>
                                ) : (
                                    <PaginateLink
                                        active={item.active}
                                        key={i}
                                        href={item.url}
                                    >
                                        {item.label}
                                    </PaginateLink>
                                )
                            ) : null;
                        })}
                    </ul>{" "}
                </>
            )}
        </div>
    );
}

function LeftIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function RightIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function PaginateLink({ active, href, children }) {
    return (
        <li>
            <Link
                className={clsx(
                    active && "border-blue-300 bg-blue-50 text-blue-600",
                    "flex h-9 w-11 items-center justify-center rounded border text-sm font-semibold shadow-sm"
                )}
                href={href}
                preserveScroll
            >
                {children}
            </Link>
        </li>
    );
}
