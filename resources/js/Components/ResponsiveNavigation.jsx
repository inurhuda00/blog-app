import { Link, usePage } from "@inertiajs/react";
import DropdownMenu from "../Components/DropdownMenu";
import NavLink from "./NavLink";

export default function ResponsiveNavigation() {
    const { auth, categories_global, uuid } = usePage().props;

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black lg:hidden">
            <div className="flex items-center justify-between px-4  py-4 text-white">
                <Link
                    href={route("home")}
                    className="flex justify-center sm:justify-start"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        fill="currentColor"
                        className="h-5 w-5 flex-shrink-0 rounded-full"
                    >
                        <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
                    </svg>
                    <span className="self-center text-3xl font-bold">
                        Brand
                    </span>
                </Link>
                <DropdownMenu
                    label={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    }
                >
                    <DropdownMenu.Link href={"/"}>Home</DropdownMenu.Link>
                    <DropdownMenu.Link href={"/articles"}>
                        Articles
                    </DropdownMenu.Link>

                    {auth.user ? (
                        <>
                            <DropdownMenu.Divider />

                            <DropdownMenu.Link href={route("dashboard")}>
                                Dashboard
                            </DropdownMenu.Link>
                            <DropdownMenu.Link
                                href={route("users.show", auth.user.username)}
                            >
                                My profile ({auth.user.username})
                            </DropdownMenu.Link>
                            <DropdownMenu.Link href={route("profile.show")}>
                                Settings
                            </DropdownMenu.Link>
                            <DropdownMenu.Divider />
                            {auth.user.hasRole ? (
                                <>
                                    <DropdownMenu.Link
                                        hr
                                        href={route("editor", uuid)}
                                    >
                                        New article
                                    </DropdownMenu.Link>
                                    <DropdownMenu.Link
                                        href={route("articles.table")}
                                    >
                                        My articles
                                    </DropdownMenu.Link>
                                    <DropdownMenu.Divider />
                                </>
                            ) : null}
                            <DropdownMenu.Link
                                href={route("logout")}
                                method="POST"
                                as="button"
                            >
                                Logout
                            </DropdownMenu.Link>
                        </>
                    ) : (
                        <>
                            <DropdownMenu.Divider />

                            <DropdownMenu.Link href="/login">
                                Login
                            </DropdownMenu.Link>
                            <DropdownMenu.Link href="/register">
                                Register
                            </DropdownMenu.Link>
                        </>
                    )}
                </DropdownMenu>
            </div>
            <div className="flex flex-row items-center justify-start gap-x-3 overflow-x-auto bg-white">
                {categories_global.map((category) => (
                    <NavLink
                        key={category.slug}
                        href={route("categories.show", category.slug)}
                        active={route().current(
                            "categories.show",
                            category.slug
                        )}
                    >
                        {category.name}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
