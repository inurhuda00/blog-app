import { Container } from "@/Components/Container";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";
import useSwal from "@/Hooks/useSwal";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/inertia-react";
import clsx from "clsx";

export default function ArticleTable(props) {
    const { data: articles, meta, links } = props.articles;

    const { ask } = useSwal();

    return (
        <Container>
            <Table>
                <Table.Thead>
                    <tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Category</Table.Th>
                        <Table.Th>Tags</Table.Th>
                        <Table.Th>Status</Table.Th>
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

            <Pagination {...{ meta, links }} />
        </Container>
    );
}

ArticleTable.layout = (page) => <DashboardLayout children={page} />;
