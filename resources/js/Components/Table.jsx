import { Menu } from "@headlessui/react";
import { Link } from "@inertiajs/inertia-react";
import clsx from "clsx";

const ChevronDownIcon = ({ ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        {...props}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
    </svg>
);

const ChevronUpIcon = ({ ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        {...props}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
    </svg>
);

const Table = ({ children, className = "" }) => {
    return (
        <div className={clsx(className, "flex flex-col")}>
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-200">
                        {children}
                    </table>
                </div>
            </div>
        </div>
    );
};

const Thead = ({ className, children }) => {
    return <thead className={className}>{children}</thead>;
};

const Tbody = ({ children }) => {
    return (
        <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
    );
};

const Td = ({ className = "", children, ...props }) => {
    return (
        <td
            {...props}
            className={clsx(className, "whitespace-nowrap px-6 py-4")}
        >
            {children}
        </td>
    );
};

const Th = ({ className, sort, sortable, children, ...props }) => {
    return (
        <th
            {...props}
            scope="col"
            className={clsx(
                className,
                "whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-black"
            )}
        >
            {sortable ? (
                <div className="flex items-center gap-2">
                    {children}
                    {sort === "asc" ? (
                        <ChevronUpIcon
                            className="h-4 w-4 stroke-2"
                            aria-hidden="true"
                        />
                    ) : (
                        <ChevronDownIcon
                            className="h-4 w-4 stroke-2"
                            aria-hidden="true"
                        />
                    )}
                </div>
            ) : (
                <>{children}</>
            )}
        </th>
    );
};

const DropdownItem = ({ children, className = "", ...props }) => {
    return (
        <Menu.Item>
            {({ active }) => (
                <Link
                    {...props}
                    preserveScroll
                    className={clsx(
                        className,
                        active
                            ? "bg-gray-50 text-black"
                            : "bg-white text-black",
                        "block w-full py-2 px-4 text-left text-sm font-medium text-black hover:bg-blue-50 hover:text-blue-600"
                    )}
                >
                    {children}
                </Link>
            )}
        </Menu.Item>
    );
};

const DropdownButton = ({ className, ...props }) => {
    return (
        <Menu.Item>
            {({ active }) => (
                <button
                    {...props}
                    className={`${
                        active ? "bg-gray-50 text-black" : "bg-white text-black"
                    } block w-full py-2 px-4 text-left text-sm font-medium text-black hover:bg-blue-50 hover:text-blue-600 ${
                        className ? className : ""
                    }`}
                >
                    {props.children}
                </button>
            )}
        </Menu.Item>
    );
};

const Dropdown = ({ className, children }) => {
    return (
        <div className="relative ">
            <Menu>
                <Menu.Button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                    </svg>
                </Menu.Button>
                <Menu.Items className="absolute top-0 right-7 z-10 w-56 divide-y overflow-hidden  border bg-white py-0.5 text-left shadow-sm">
                    {children}
                </Menu.Items>
            </Menu>
        </div>
    );
};

Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Td = Td;
Table.Th = Th;
Table.Dropdown = Dropdown;
Table.DropdownItem = DropdownItem;
Table.DropdownButton = DropdownButton;

export default Table;
