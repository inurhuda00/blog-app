import { Link } from "@inertiajs/inertia-react";
import clsx from "clsx";

export default function NavLink({ active = false, children, ...props }) {
    return (
        <Link
            className={clsx(
                active && "text-black",
                "inline-block whitespace-nowrap rounded px-5 py-2 text-xs font-semibold uppercase text-gray-600 "
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
