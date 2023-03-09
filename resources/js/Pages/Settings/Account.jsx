import { Container } from "@/Components/Container";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Dialog, Transition } from "@headlessui/react";
import { router, useForm, usePage } from "@inertiajs/react";
import { Fragment, useEffect, useState } from "react";

const PasswordForm = ({ closeModal }) => {
    const { user, token, errors } = usePage().props;
    const { data, setData, processing, reset } = useForm({
        token,
        email: user.email,
        password: "",
        password_confirmation: "",
        page: true,
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        router.post(
            route("password.update"),
            { ...data },
            {
                onSuccess: () => {
                    closeModal();
                },
            }
        );
    };

    return (
        <>
            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={handleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        forInput="password_confirmation"
                        value="Confirm Password"
                    />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleChange}
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ml-4" processing={processing}>
                        Change Password
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
};

const EmailForm = ({ closeModal }) => {
    const { errors } = usePage().props;

    const { data, setData, processing, reset } = useForm({
        email: "",
    });

    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        router.post(
            route("change.email"),
            { ...data },
            {
                onSuccess: () => {
                    // closeModal();
                    // reset();
                },
            }
        );
    };

    return (
        <>
            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel forInput="email" value="New Email" />

                    <Input
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={handleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ml-4" processing={processing}>
                        Change Email
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
};

const modalsComponent = {
    email: {
        title: "Change Email Address",
        element: (props) => <EmailForm {...props} />,
    },
    password: {
        title: "Change Password",
        element: (props) => <PasswordForm {...props} />,
    },
};

export default function Account({ errors, user, auth }) {
    const { data, setData } = useForm();
    let [modal, setModal] = useState({
        open: false,
        type: "email",
    });

    function closeModal() {
        setModal({ ...modal, open: false });
    }

    function openModalEmail() {
        setModal({
            open: true,
            type: "email",
        });
    }
    function openModalPassword() {
        setModal({
            open: true,
            type: "password",
        });
    }

    const { element: ModalElement, title } = modalsComponent[modal.type];

    return (
        <>
            <>
                <Transition appear show={modal.open} as={Fragment}>
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
                                            {title}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <ModalElement
                                                closeModal={closeModal}
                                            />
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
                    <h3 className="mb-6 text-lg font-semibold">
                        Account Settings
                    </h3>
                    <form className="mb-6">
                        <div className="mb-8">
                            <h4 className="mb-2 text-xs font-bold uppercase">
                                Account Preference
                            </h4>

                            <div className="mb-6 flex w-full items-center justify-between">
                                <div>
                                    <p className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </p>
                                    <p className="mb-1 text-xs text-gray-500">
                                        {user.email}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="inline-flex items-center border border-transparent bg-gray-900 px-4 py-2  text-xs font-semibold uppercase tracking-widest text-white active:bg-gray-900"
                                    onClick={openModalEmail}
                                >
                                    Change
                                </button>
                            </div>

                            <div className="mb-6 flex w-full items-center justify-between">
                                <div>
                                    <p className="block text-sm font-medium text-gray-700">
                                        Change Password
                                    </p>
                                    <p className="mb-1 text-xs text-gray-500">
                                        Password must be at least 8 characters
                                        long
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="inline-flex items-center border border-transparent bg-gray-900 px-4 py-2  text-xs font-semibold uppercase tracking-widest text-white active:bg-gray-900"
                                    onClick={openModalPassword}
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        </>
    );
}

Account.layout = (page) => <DashboardLayout children={page} />;
