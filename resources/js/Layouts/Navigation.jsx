import DropdownMenu from "@/Components/DropdownMenu";
import NavLink from "@/Components/NavLink";
import ResponsiveNavigation from "@/Components/ResponsiveNavigation";
import { Link, usePage } from "@inertiajs/inertia-react";

export default function Navbar() {
    const { auth, categories_global } = usePage().props;

    return (
        <>
            <ResponsiveNavigation />

            <nav className="z-50 hidden bg-white py-6 px-10 lg:block">
                <div className="mx-auto max-w-screen-2xl px-4">
                    <div className="flex items-center justify-between">
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

                        <div className="flex flex-1 items-center justify-between pl-10">
                            <div>
                                {categories_global.map((category) => (
                                    <NavLink
                                        key={category.slug}
                                        href={route(
                                            "categories.show",
                                            category.slug
                                        )}
                                        active={route().current(
                                            "categories.show",
                                            category.slug
                                        )}
                                    >
                                        {category.name}
                                    </NavLink>
                                ))}
                            </div>
                            <div className="flex items-center">
                                {auth.user ? (
                                    <div className="flex items-center">
                                        <DropdownMenu label={auth.user.name}>
                                            <DropdownMenu.Link
                                                href={route("dashboard")}
                                            >
                                                Dashboard
                                            </DropdownMenu.Link>
                                            <DropdownMenu.Link
                                                href={route(
                                                    "users.show",
                                                    auth.user.username
                                                )}
                                            >
                                                My profile
                                            </DropdownMenu.Link>
                                            <DropdownMenu.Link
                                                href={route("settings.profile")}
                                            >
                                                Settings
                                            </DropdownMenu.Link>
                                            {auth.user.hasRole ? (
                                                <>
                                                    <DropdownMenu.Link
                                                        href={route(
                                                            "articles.create"
                                                        )}
                                                    >
                                                        New article
                                                    </DropdownMenu.Link>
                                                    <DropdownMenu.Link
                                                        href={route(
                                                            "articles.table"
                                                        )}
                                                    >
                                                        My articles
                                                    </DropdownMenu.Link>
                                                </>
                                            ) : null}

                                            <DropdownMenu.Link
                                                href={route("logout")}
                                                method="POST"
                                                as="button"
                                            >
                                                Logout
                                            </DropdownMenu.Link>
                                        </DropdownMenu>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <NavLink href={route("login")}>
                                            Login
                                        </NavLink>
                                        <NavLink href={route("register")}>
                                            Register
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
