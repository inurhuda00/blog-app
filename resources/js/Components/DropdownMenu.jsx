import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { InertiaLink } from "@inertiajs/inertia-react";

function DropdownMenu({ label, children }) {
    return (
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <Menu.Button
                        className={clsx(
                            "flex items-center gap-x-2 text-gray-400",
                            open ? "text-white" : null
                        )}
                    >
                        {label}
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
                        <Menu.Items className="absolute right-0 top-9 w-60 space-y-1 overflow-hidden rounded-lg border border-gray-700 bg-gray-800 px-4 py-5 shadow-sm z-50">
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
        <Menu.Item>
            {({ active }) => (
                <InertiaLink className="block w-full text-left" {...props}>
                    <div
                        className={clsx(
                            active || isActive
                                ? "bg-blue-700 text-white"
                                : "text-gray-400",
                            "inline-block rounded-lg px-2 py-1 text-left text-sm font-medium"
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
        <div className="h-px w-full ml-2 my-2 block bg-gradient-to-r  from-gray-700 via-transparent to-transparent" />
    );
}

DropdownMenu.Link = Link;
DropdownMenu.Divider = Divider;

export default DropdownMenu;
