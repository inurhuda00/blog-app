import { Container } from "@/Components/Container";
import Input from "@/Components/Input";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";
import useSwal from "@/Hooks/useSwal";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import clsx from "clsx";
import { debounce, pickBy } from "lodash";
import { useCallback, useEffect, useState } from "react";

export default function ArticleTable(props) {
    const { data: articles, meta, filtered, attributes } = props.articles;

    const { ask } = useSwal();

    const [params, setParams] = useState(filtered);
    const [pageNumber, setPageNumber] = useState([]);

    const reload = useCallback(
        debounce((query) => {
            Inertia.get(
                route("articles.table"),

                pickBy({ ...query, page: query.q ? 1 : query.page }),
                {
                    preserveScroll: true,
                    preserveState: true,
                }
            );
        }, 150),
        []
    );

    useEffect(() => reload(params), [params]);
    useEffect(() => {
        let numbers = [];

        for (
            let i = attributes.per_page;
            i <= attributes.total / attributes.per_page;
            i = i + attributes.per_page
        ) {
            numbers.push(i);
        }

        setPageNumber(numbers);
    }, []);

    const handleChange = (e) => {
        setParams({ ...params, [e.target.name]: e.target.value });
    };

    const sort = (item) => {
        setParams({
            ...params,
            field: item,
            direction: params.direction === "asc" ? "desc" : "asc",
        });
    };

    return (
        <Container>
            <div className="flex items-center justify-start gap-2">
                {pageNumber.length ? (
                    <select
                        name="load"
                        id="load"
                        onChange={(e) => handleChange(e)}
                        value={params.load}
                        className="flex-shrink
                    mt-1
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                    >
                        {pageNumber.map((number, i) => (
                            <option key={i} value={number}>
                                {number}
                            </option>
                        ))}
                    </select>
                ) : null}

                <label className="block w-full">
                    <input
                        type="text"
                        className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                        placeholder="search..."
                        name="q"
                        onChange={handleChange}
                        value={params.q}
                    />
                </label>
            </div>

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
                        <Table.Th>Tags</Table.Th>
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
                            <tr key={article.id}>
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
                                        {article.tags.map((tag, i) => (
                                            <Link
                                                href={tag.url}
                                                key={i}
                                                className="bg-gray-100 hover:bg-gray-200 transition font-medium text-xs px-2 py-1 rounded"
                                            >
                                                {tag.name}
                                            </Link>
                                        ))}
                                    </div>
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

                                                " transition font-medium text-xs px-2 py-1 rounded"
                                            )}
                                        >
                                            {article.status}
                                        </span>
                                    </div>
                                </Table.Td>
                                <td>
                                    <Table.Dropdown>
                                        <Table.DropdownItem
                                            href={route(
                                                "articles.show",
                                                article.slug
                                            )}
                                        >
                                            View
                                        </Table.DropdownItem>
                                        <Table.DropdownItem
                                            href={route(
                                                "articles.edit",
                                                article.slug
                                            )}
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
                        <ul className=" mt-10 justify-center flex items-center gap-x-1">
                            {meta.links.map((item, i) => {
                                return item.url != null ? (
                                    <button
                                        key={i}
                                        className={clsx(
                                            item.active &&
                                                "text-blue-600 border-blue-300 bg-blue-50",
                                            "w-11 h-9 text-sm font-semibold rounded shadow-sm border flex items-center justify-center"
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

ArticleTable.layout = (page) => <DashboardLayout children={page} />;
