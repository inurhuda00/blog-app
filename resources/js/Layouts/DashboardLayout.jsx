import { Container } from "@/Components/Container";
import { Link, usePage } from "@inertiajs/inertia-react";
import clsx from "clsx";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Navigation from "./Navigation";

export default function Dashboard({ children }) {
    const { flash } = usePage().props;

    useEffect(() => {
        flash.type && toast[flash.type](flash.message);
    }, [flash]);

    return (
        <div>
            <Navigation />

            <Container className="bg-slate-900">
                <nav className="flex justify-start space-x-4 py-2">
                    <Link
                        href={route("dashboard")}
                        className={clsx(
                            route().current("dashboard")
                                ? "text-white bg-gray-800"
                                : null,
                            "inline-flex items-center text-xs font-medium py-1 px-2 text-gray-400 "
                        )}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href={route("settings.account")}
                        className={clsx(
                            route().current("settings.account")
                                ? "text-white bg-gray-800"
                                : null,
                            "inline-flex items-center text-xs font-medium py-1 px-2 text-gray-400 "
                        )}
                    >
                        Account
                    </Link>

                    <Link
                        href={route("settings.profile")}
                        className={clsx(
                            route().current("settings.profile")
                                ? "text-white bg-gray-800"
                                : null,
                            "inline-flex items-center text-xs font-medium py-1 px-2 text-gray-400 "
                        )}
                    >
                        Profile
                    </Link>

                    <Link
                        href={route("articles.table")}
                        className={clsx(
                            route().current("articles.table")
                                ? "text-white bg-gray-800"
                                : null,
                            "inline-flex items-center text-xs font-medium py-1 px-2 text-gray-400 "
                        )}
                    >
                        my article
                    </Link>
                </nav>
            </Container>

            <Toaster />

            <div className="pt-8">{children}</div>

            <Footer />
        </div>
    );
}
