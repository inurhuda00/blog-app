import { Link } from "@inertiajs/inertia-react";

export default function ErrorPage({ status, url }) {
    const title = {
        503: "503",
        500: "500",
        404: "404",
        403: "403",
    }[status];

    const description = {
        503: "Sorry, we are doing some maintenance. Please check back soon.",
        500: "Whoops, something went wrong on our servers.",
        404: "Sorry, the page you are looking for could not be found.",
        403: "Sorry, you are forbidden from accessing this page.",
    }[status];

    return (
        <div className="m-auto mt-24 h-screen bg-gray-100">
            <div className="flex h-1/3 flex-col items-center justify-center">
                <center className=" mt-4 tracking-widest">
                    <span className="block text-6xl text-gray-500">
                        <span className="tracking-widest">{title}</span>
                    </span>
                    <span className="text-xl text-gray-500">{description}</span>
                </center>
                <center className="mt-6">
                    <Link
                        href={url}
                        className="inline-flex items-center border border-transparent bg-gray-900 px-4 py-2  text-xs font-semibold uppercase tracking-widest text-white active:bg-gray-900"
                    >
                        Go back
                    </Link>
                </center>
            </div>
        </div>
    );
}
