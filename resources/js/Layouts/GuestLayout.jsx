import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Guest({ children }) {
    const { flash } = usePage().props;

    useEffect(() => {
        flash.type && toast[flash.type](flash.message);
    }, [flash]);

    return (
        <>
            <Toaster />
            <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="h-auto w-10 fill-current text-gray-500" />
                    </Link>
                </div>

                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 sm:max-w-md">
                    {children}
                </div>
            </div>
        </>
    );
}
