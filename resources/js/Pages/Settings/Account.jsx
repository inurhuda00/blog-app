import { Container } from "@/Components/Container";
import PrimaryButton from "@/Components/PrimaryButton";
import AppLayout from "@/Layouts/AppLayout";
import { useForm } from "@inertiajs/inertia-react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Account({ errors, user }) {
    const { data, setData } = useForm();
    return (
        <>
            <Container>
                <div className="max-w-xl">
                    <h3 className="mb-6 font-semibold text-lg">
                        Account Settings
                    </h3>
                    <form className="mb-6">
                        <div className="mb-8">
                            <h4 className="font-bold text-xs mb-2 uppercase">
                                Account Preference
                            </h4>

                            <div className="flex w-full justify-between items-center mb-6">
                                <div>
                                    <p className="block font-medium text-sm text-gray-700">
                                        Email Address
                                    </p>
                                    <p className="text-xs mb-1 text-gray-500">
                                        {user.email}
                                    </p>
                                </div>

                                <button className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900">
                                    Change
                                </button>
                            </div>

                            <div className="flex w-full justify-between items-center mb-6">
                                <div>
                                    <p className="block font-medium text-sm text-gray-700">
                                        Change Password
                                    </p>
                                    <p className="text-xs mb-1 text-gray-500">
                                        Password must be at least 8 characters
                                        long
                                    </p>
                                </div>

                                <button className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900">
                                    Change
                                </button>
                            </div>
                        </div>

                        <PrimaryButton>Update</PrimaryButton>
                    </form>
                </div>
            </Container>
        </>
    );
}

Account.layout = (page) => <DashboardLayout children={page} />;
