import { Link, usePage } from "@inertiajs/inertia-react";
import NavLink from "@/Components/NavLink";
import DropdownMenu from "@/Components/DropdownMenu";
import ResponsiveNavigation from "@/Components/ResponsiveNavigation";

export default function Navbar() {
    const { auth, categories_global } = usePage().props;

    return (
        <>
            <ResponsiveNavigation />

            <nav className="hidden border-b border-dashed border-gray-700 bg-gray-800 py-4 shadow lg:block z-50">
                <div className="mx-auto max-w-screen-2xl px-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href={route("home")}
                            className="mr-3 text-lg font-semibold capitalize text-white"
                        >
                            {import.meta.env.VITE_APP_NAME}
                        </Link>

                        <div className="flex flex-1 items-center justify-between">
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
                                            <DropdownMenu.Link
                                                href={route("articles.create")}
                                            >
                                                New article
                                            </DropdownMenu.Link>
                                            <DropdownMenu.Link
                                                href={route("articles.table")}
                                            >
                                                My articles
                                            </DropdownMenu.Link>

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
