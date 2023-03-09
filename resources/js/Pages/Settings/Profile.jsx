import { Container } from "@/Components/Container";
import Error from "@/Components/Error";
import Input from "@/Components/Input";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Textarea from "@/Components/Textarea";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Dialog, Transition } from "@headlessui/react";
import { router, useForm } from "@inertiajs/react";
import { Fragment, useRef, useState } from "react";
import { socials } from "../Users/Show";

export default function Profile({ user, linkTypes, errors }) {
    const { data, setData } = useForm({
        name: user.name,
        username: user.username,
        bio: user.bio,
        avatar: null,
    });

    const handleChange = (e) => setData(e.target.name, e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(
            route("profile.update"),
            {
                ...data,
                _method: "PUT",
            },
            {
                preserveScroll: true,
                onSuccess: () => clearPhotoFileInput(),
            }
        );
    };

    const [photoPreview, setPhotoPreview] = useState("");
    const photoInput = useRef(null);

    const updataPhotoPreview = () => {
        const photo = photoInput.current.files[0];
        setData("avatar", photo);

        if (!photo) return;

        let reader = new FileReader();

        reader.onload = (e) => {
            const { result } = e.target;
            if (result) {
                setPhotoPreview(result);
            }
        };
        reader.readAsDataURL(photo);
    };

    const selectNewPhoto = () => {
        return photoInput.current.click();
    };
    const deletePhoto = () => {
        router.delete(route("current-user-photo.destroy"), {
            preserveScroll: true,
            onSuccess: () => {
                clearPhotoFileInput();
                setPhotoPreview(null);
            },
        });
    };
    const clearPhotoFileInput = () => {
        if (photoInput.current.value) {
            photoInput.current.value = null;
        }
    };

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const {
        data: formLink,
        setData: setLink,
        reset: resetLink,
    } = useForm({ url: "", name: "" });

    const handleAddLink = () => {
        router.post(
            route("links.store"),
            { ...formLink },
            {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    resetLink();
                },
            }
        );
    };

    const handleRemoveLink = (link) => {
        router.delete(route("links.destroy", link), {
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
                                                                            "name",
                                                                            link.name
                                                                        );
                                                                    }}
                                                                    className="inline-flex cursor-pointer bg-gray-100 px-2 py-1 text-black transition duration-200 hover:bg-gray-200 "
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
                                                        onChange={(e) =>
                                                            setLink(
                                                                "url",
                                                                e.target.value
                                                            )
                                                        }
                                                        value={formLink.link}
                                                    />
                                                )}
                                            </div>
                                            <div className="flex items-center justify-end gap-4">
                                                <button
                                                    className="inline-flex items-center border border-transparent bg-gray-900 px-4 py-2  text-xs font-semibold uppercase tracking-widest text-white active:bg-gray-900 disabled:bg-gray-400"
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
                                                <button
                                                    className="inline-flex items-center border border-transparent bg-gray-900 px-4 py-2  text-xs font-semibold uppercase tracking-widest text-white active:bg-gray-900 disabled:bg-gray-400"
                                                    onClick={() => {
                                                        !formLink.name
                                                            ? closeModal()
                                                            : resetLink();
                                                    }}
                                                    type="button"
                                                >
                                                    back
                                                </button>
                                            </div>
                                        </div>
                                        {errors.url && (
                                            <Error value={errors.url} />
                                        )}
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
            <Container>
                <div className="max-w-xl">
                    <h3 className="mb-6 text-lg font-semibold">
                        Customize Profile
                    </h3>

                    <form onSubmit={handleSubmit} className="mb-6">
                        <h4 className="mb-4 text-xs font-bold uppercase">
                            Profile Information
                        </h4>

                        <div className="mb-6 items-center">
                            <input
                                ref={photoInput}
                                type="file"
                                className="hidden"
                                name="photo"
                                onChange={updataPhotoPreview}
                            />

                            <InputLabel for="photo" value="Avatar" />
                            <p className="mb-1 text-xs text-gray-500">
                                Set a display name. This does not change your
                                username.
                            </p>

                            <div className="mt-4 flex items-center justify-start space-x-4">
                                <div className="group relative h-20 w-20">
                                    {photoPreview ? (
                                        <img
                                            src={photoPreview}
                                            alt={user.name}
                                            className="h-20 w-20 rounded-full border object-cover"
                                        />
                                    ) : (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="h-20 w-20 rounded-full border object-cover"
                                        />
                                    )}

                                    <button
                                        type="button"
                                        className="absolute inset-0 hidden h-20 w-20 items-center justify-center rounded-full bg-black/40 text-white transition duration-150 ease-out hover:ease-in group-hover:flex"
                                        onClick={selectNewPhoto}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            className="h-6 w-6 fill-current stroke-2"
                                        >
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <PrimaryButton
                                    type="button"
                                    className="mt-2"
                                    onClick={deletePhoto}
                                >
                                    Remove
                                </PrimaryButton>
                            </div>

                            {errors.avatar && <Error value={errors.avatar} />}
                        </div>

                        <div className="mb-6">
                            <InputLabel forInput="name" value="Display Name" />
                            <p className="mb-1 text-xs text-gray-500">
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
                            <p className="mb-1 text-xs text-gray-500">
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
                            <p className="mb-1 text-xs text-gray-500">
                                A brief description of yourself shown on your
                                profile.
                            </p>
                            <Textarea
                                name="bio"
                                id="bio"
                                onChange={handleChange}
                                value={data.bio ? data.bio : ""}
                            />
                            {errors.bio && <Error value={errors.bio} />}
                        </div>

                        <PrimaryButton>Update</PrimaryButton>
                    </form>

                    <h4 className="mb-2 text-xs font-bold uppercase">
                        Social Links
                    </h4>

                    <div className="mb-6">
                        <InputLabel forInput="link" value="Link" />

                        <p className="mb-1 text-xs text-gray-500">
                            People who visit your profile will see your social
                            links. <b>3 Max</b>
                        </p>

                        <button
                            type="button"
                            onClick={
                                !(user.links && user.links.length >= 3)
                                    ? openModal
                                    : null
                            }
                            disabled={user.links && user.links.length >= 3}
                            className="inline-flex items-center border border-transparent bg-gray-900 px-4 py-2  text-xs font-semibold uppercase tracking-widest text-white active:bg-gray-900 disabled:bg-gray-400"
                        >
                            Add Social Links
                        </button>
                    </div>

                    {user.links && user.links.length ? (
                        <div className="mb-12 flex flex-wrap rounded-lg bg-purple-200 dark:bg-gray-400">
                            {user.links.map((link, i) => (
                                <span
                                    className="m-1 flex cursor-pointer flex-wrap items-center justify-between rounded-xl bg-purple-500 py-2 pl-4 pr-2 text-sm font-medium text-gray-200 hover:bg-purple-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                                    key={i}
                                >
                                    {socials[link.name].icon}
                                    <span className="ml-2">
                                        {link.display ?? link.name}
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-3 h-5 w-5 hover:text-gray-300"
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
