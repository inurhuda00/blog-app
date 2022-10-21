import { Container } from "@/Components/Container";
import Error from "@/Components/Error";
import Input from "@/Components/Input";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Textarea from "@/Components/Textarea";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import { socials } from "../Users/Show";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function Profile({ user, linkTypes, errors }) {
    const { data, setData } = useForm({
        name: user.name,
        username: user.username,
        bio: user.bio,
    });
    const handleChange = (e) => setData(e.target.name, e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post(route("settings.profile.update"), {
            ...data,
            _method: "PUT",
        });
    };

    let [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const [formLink, setLink] = useState({ url: "", name: "" });

    const handleAddLink = () => {
        Inertia.post(
            route("links.store"),
            { link: formLink },
            { preserveScroll: true }
        );

        closeModal();
        setLink({ url: "", name: "" });
    };

    const handleChangeLink = (e) => {
        setLink({ url: e.target.value, name: formLink.name });
    };

    const handleRemoveLink = (link) => {
        Inertia.delete(route("links.destroy", link), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={closeModal}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Add Social Link
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <div className=" mb-6">
                                                {!formLink.name && (
                                                    <ul className="flex flex-wrap gap-2">
                                                        {linkTypes.map(
                                                            (link) => (
                                                                <li
                                                                    key={
                                                                        link.id
                                                                    }
                                                                    onClick={() => {
                                                                        setLink(
                                                                            {
                                                                                url: formLink.url,
                                                                                name: link.name,
                                                                            }
                                                                        );
                                                                    }}
                                                                    className="cursor-pointer inline-flex text-black hover:bg-gray-200 bg-gray-100 transition duration-200 px-2 py-1 rounded-md"
                                                                >
                                                                    {
                                                                        socials[
                                                                            link
                                                                                .name
                                                                        ].icon
                                                                    }
                                                                    <span className="ml-2">
                                                                        {
                                                                            link.name
                                                                        }
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                )}
                                                {formLink.name && (
                                                    <Input
                                                        name="link"
                                                        id="link"
                                                        onChange={
                                                            handleChangeLink
                                                        }
                                                        value={formLink.link}
                                                    />
                                                )}
                                            </div>
                                            <button
                                                className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 disabled:bg-gray-400"
                                                onClick={handleAddLink}
                                                disabled={
                                                    !(
                                                        formLink.name &&
                                                        formLink.url
                                                    )
                                                }
                                                type="button"
                                            >
                                                Add Link
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
            <Container>
                <div className="max-w-xl">
                    <h3 className="mb-6 font-semibold text-lg">
                        Customize Profile
                    </h3>
                    <form onSubmit={handleSubmit} className="mb-6">
                        <h4 className="font-bold text-xs mb-2 uppercase">
                            Profile Information
                        </h4>

                        <div className="mb-6">
                            <InputLabel forInput="name" value="Display Name" />
                            <p className="text-xs mb-1 text-gray-500">
                                Set a display name. This does not change your
                                username.
                            </p>
                            <Input
                                name="name"
                                id="name"
                                onChange={handleChange}
                                value={data.name}
                            />
                            {errors.name && <Error value={errors.name} />}
                        </div>

                        <div className="mb-6">
                            <InputLabel forInput="username" value="Username" />
                            <p className="text-xs mb-1 text-gray-500">
                                Set a username
                            </p>
                            <Input
                                name="username"
                                id="username"
                                onChange={handleChange}
                                value={data.username}
                            />
                            {errors.username && (
                                <Error value={errors.username} />
                            )}
                        </div>

                        <div className="mb-6">
                            <InputLabel forInput="bio" value="Bio" />
                            <p className="text-xs mb-1 text-gray-500">
                                A brief description of yourself shown on your
                                profile.
                            </p>
                            <Textarea
                                name="bio"
                                id="bio"
                                onChange={handleChange}
                                value={data.bio}
                            />
                            {errors.bio && <Error value={errors.bio} />}
                        </div>

                        <PrimaryButton>Update</PrimaryButton>
                    </form>

                    <h4 className="font-bold text-xs mb-2 uppercase">
                        Social Links
                    </h4>

                    <div className="mb-6">
                        <InputLabel forInput="link" value="Link" />

                        <p className="text-xs mb-1 text-gray-500">
                            People who visit your profile will see your social
                            links. <b>3 Max</b>
                        </p>

                        <button
                            type="button"
                            onClick={
                                !(user.links.length >= 3) ? openModal : null
                            }
                            disabled={user.links.length >= 3}
                            className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 disabled:bg-gray-400"
                        >
                            Add Social Links
                        </button>
                    </div>

                    {user.links && user.links.length ? (
                        <div className="mb-3 flex flex-wrap rounded-lg bg-purple-200 dark:bg-gray-400">
                            {user.links.map((link) => (
                                <span
                                    className="flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer bg-purple-500 text-gray-200 hover:bg-purple-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                                    key={link.id}
                                >
                                    {socials[link.name].icon}
                                    <span className="ml-2">{link.name}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 ml-3 hover:text-gray-300"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        onClick={() => handleRemoveLink(link)}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            ))}
                            {errors.name && <Error value={errors.name} />}
                        </div>
                    ) : null}
                </div>
            </Container>
        </>
    );
}

Profile.layout = (page) => <DashboardLayout children={page} />;
