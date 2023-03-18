import { Container } from "@/Components/Container";
import { Link, usePage } from "@inertiajs/react";
import clsx from "clsx";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Navigation from "./Navigation";

export default function Dashboard({ children }) {
    const { flash, auth } = usePage().props;

    useEffect(() => {
        flash.type && toast[flash.type](flash.message);
    }, [flash]);

    return (
        <>
            <Navigation />
            {auth.user ? (
                <Container className="px-4 ">
                    <nav className="flex justify-start space-x-4 py-2">
                        <Link
                            href={route("dashboard")}
                            className={clsx(
                                route().current("dashboard")
                                    ? "bg-gray-800 text-white"
                                    : null,
                                "inline-flex items-center py-1 px-2 text-xs font-medium text-gray-400 "
                            )}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route("settings.account")}
                            className={clsx(
                                route().current("settings.account")
                                    ? "bg-gray-800 text-white"
                                    : null,
                                "inline-flex items-center py-1 px-2 text-xs font-medium text-gray-400 "
                            )}
                        >
                            Account
                        </Link>
                        <Link
                            href={route("profile.show")}
                            className={clsx(
                                route().current("profile.show")
                                    ? "bg-gray-800 text-white"
                                    : null,
                                "inline-flex items-center py-1 px-2 text-xs font-medium text-gray-400 "
                            )}
                        >
                            Profile
                        </Link>
                        {auth.user.hasRole ? (
                            <Link
                                href={route("articles.table")}
                                className={clsx(
                                    route().current("articles.table")
                                        ? "bg-gray-800 text-white"
                                        : null,
                                    "inline-flex items-center py-1 px-2 text-xs font-medium text-gray-400 "
                                )}
                            >
                                my article
                            </Link>
                        ) : null}
                        {auth.user.roles &&
                        auth.user.roles.includes("editor") ? (
                            <Link
                                href={route("submission")}
                                className={clsx(
                                    route().current("submission")
                                        ? "bg-gray-800 text-white"
                                        : null,
                                    "inline-flex items-center py-1 px-2 text-xs font-medium text-gray-400 "
                                )}
                            >
                                submittion
                            </Link>
                        ) : null}
                    </nav>
                </Container>
            ) : null}
            <Toaster />

            <div className="px-4 pt-8">{children}</div>

            <Footer />
        </>
    );
}
