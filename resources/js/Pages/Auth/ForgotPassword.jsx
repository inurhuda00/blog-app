import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm leading-normal text-gray-500">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <Input
                    type="text"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={handleChange}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ml-4" processing={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}

ForgotPassword.layout = (page) => <GuestLayout children={page} />;
