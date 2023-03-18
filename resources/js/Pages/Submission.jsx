import { Container } from "@/Components/Container";
import Table from "@/Components/Table";
import useSwal from "@/Hooks/useSwal";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, router } from "@inertiajs/react";
import clsx from "clsx";
// import { debounce, pickBy } from "lodash";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Submission(props) {
    const { data: articles, meta, filtered } = props.articles;
    const { ask } = useSwal();

    const [params, setParams] = useState(filtered);

    const reload = useDebouncedCallback((query) => {
        router.get(
            route("submission"),

            { ...query, page: query.q ? 1 : query.page },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    });

    useEffect(() => reload(params), [params]);

    const sort = (item) => {
        setParams({
            ...params,
        });
    };

    return (
        <Container>
            <Table>
                <Table.Thead>
                    <tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th
                            onClick={() => sort("title")}
                            sortable
                            sort={params.field === "title" && params.direction}
                        >
                            Title
                        </Table.Th>
                        <Table.Th>Category</Table.Th>
                        <Table.Th
                            onClick={() => sort("status")}
                            sortable
                            sort={params.field === "status" && params.direction}
                        >
                            Status
                        </Table.Th>
                    </tr>
                </Table.Thead>
                <Table.Tbody>
                    {articles.length ? (
                        articles.map((article, i) => (
                            <tr key={i}>
                                <Table.Td>{meta.from + i}</Table.Td>
                                <Table.Td>
                                    <Link href={article.url}>
                                        {article.title}
                                    </Link>
                                </Table.Td>
                                <Table.Td>
                                    <Link href={article.category.url}>
                                        {article.category.name}
                                    </Link>
                                </Table.Td>

                                <Table.Td>
                                    <div className="flex gap-x-1">
                                        <span
                                            className={clsx(
                                                article.status == "published" &&
                                                    "bg-green-100 hover:bg-green-200",
                                                article.status == "draft" &&
                                                    "bg-gray-100 hover:bg-gray-200",
                                                article.status == "review" &&
                                                    "bg-orange-100 hover:bg-orange-200",
                                                article.status == "rejected" &&
                                                    "bg-red-100 hover:bg-red-200",

                                                " rounded px-2 py-1 text-xs font-medium transition"
                                            )}
                                        >
                                            {article.status}
                                        </span>
                                    </div>
                                </Table.Td>
                                <td>
                                    <Table.Dropdown>
                                        <Table.DropdownItem
                                            href={route("articles.show", {
                                                user: article.author,
                                                article: article.slug,
                                            })}
                                        >
                                            View
                                        </Table.DropdownItem>
                                        <Table.DropdownItem
                                            href={route("editor", article.uuid)}
                                        >
                                            Edit
                                        </Table.DropdownItem>
                                        <Table.DropdownButton
                                            onClick={() => {
                                                ask({
                                                    url: route(
                                                        "articles.destroy",
                                                        article.slug
                                                    ),
                                                    method: "delete",
                                                });
                                            }}
                                            className="hover:bg-rose-50 hover:text-rose-500"
                                        >
                                            Delete
                                        </Table.DropdownButton>
                                    </Table.Dropdown>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <Table.Td>
                                <p className="text-center">
                                    You don't have any articles
                                </p>
                            </Table.Td>
                        </tr>
                    )}
                </Table.Tbody>
            </Table>

            <div>
                {meta.links.length > 2 && (
                    <>
                        <ul className=" mt-10 flex items-center justify-center gap-x-1">
                            {meta.links.map((item, i) => {
                                return item.url != null ? (
                                    <button
                                        key={i}
                                        className={clsx(
                                            item.active &&
                                                "border-blue-300 bg-blue-50 text-blue-600",
                                            "flex h-9 w-11 items-center justify-center rounded border text-sm font-semibold shadow-sm"
                                        )}
                                        onClick={() =>
                                            setParams({
                                                ...params,
                                                page: new URL(
                                                    item.url
                                                ).searchParams.get("page"),
                                            })
                                        }
                                    >
                                        {item.label}
                                    </button>
                                ) : null;
                            })}
                        </ul>{" "}
                    </>
                )}
            </div>
        </Container>
    );
}

Submission.layout = (page) => <DashboardLayout children={page} />;
