import { Menu, Transition } from "@headlessui/react";
import { InertiaLink } from "@inertiajs/inertia-react";
import clsx from "clsx";
import { Fragment } from "react";

function DropdownMenu({ label, children }) {
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
