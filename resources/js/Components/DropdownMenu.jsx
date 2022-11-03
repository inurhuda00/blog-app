import { Menu, Transition } from "@headlessui/react";
import { InertiaLink } from "@inertiajs/inertia-react";
import clsx from "clsx";
import { Fragment } from "react";

function DropdownMenu({ label, children, toggle }) {
    return (
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <Menu.Button
                        className={clsx(
                            "flex items-center gap-x-2 text-gray-400",
                            open ? "text-black" : null
                        )}
                        aria-label="toggle menu"
                    >
                        {label}
                        {toggle && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={clsx(
                                    "h-4 w-4 transition duration-200",
                                    open && "rotate-180"
                                )}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            as="ul"
                            className="absolute right-0 top-9 z-50 w-60 space-y-1 overflow-hidden border-2 border-gray-900 bg-white px-4 py-5 shadow-sm"
                        >
                            {children}
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
}

function Link({ isActive = false, children, ...props }) {
    return (
        <Menu.Item as="li">
            {({ active }) => (
                <InertiaLink className="block w-full text-left" {...props}>
                    <div
                        className={clsx(
                            active || isActive
                                ? "bg-black text-white"
                                : "text-gray-400",
                            "px-2 py-1 text-left text-sm font-medium"
                        )}
                    >
                        {children}
                    </div>
                </InertiaLink>
            )}
        </Menu.Item>
    );
}
function Divider() {
    return (
        <div className="my-2 ml-2 block h-px w-full bg-gradient-to-r  from-gray-700 via-transparent to-transparent" />
    );
}

DropdownMenu.Link = Link;
DropdownMenu.Divider = Divider;

export default DropdownMenu;
