import ApplicationLogo from "@/Components/ApplicationLogo";
import DropdownMenu from "@/Components/DropdownMenu";
import NavLink from "@/Components/NavLink";
import ResponsiveNavigation from "@/Components/ResponsiveNavigation";
import { usePage } from "@inertiajs/react";

export default function Navbar() {
    const { auth, categories_global, uuid } = usePage().props;

    return (
        <>
            <ResponsiveNavigation />

            <nav className="z-50 hidden bg-white py-6 px-10 lg:block">
                <div className="mx-auto max-w-screen-2xl px-4">
                    <div className="flex items-center justify-between">
                        <ApplicationLogo.Full />

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
                                        <DropdownMenu
                                            label={
                                                <span className="flex rounded-full border-2 border-transparent text-sm transition focus:border-gray-300 focus:outline-none">
                                                    <img
                                                        className="h-8 w-8 rounded-full object-cover"
                                                        src={auth.user.avatar}
                                                        alt={auth.user.name}
                                                    />
                                                </span>
                                            }
                                            toggle
                                        >
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
                                                My profile ({auth.user.username}
                                                )
                                            </DropdownMenu.Link>
                                            <DropdownMenu.Link
                                                href={route("profile.show")}
                                            >
                                                Settings
                                            </DropdownMenu.Link>
                                            <DropdownMenu.Divider />
                                            {auth.user.hasRole ? (
                                                <>
                                                    <DropdownMenu.Link
                                                        href={route(
                                                            "editor",
                                                            uuid
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
