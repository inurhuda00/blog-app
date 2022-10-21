import { usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Navigation from "./Navigation";

export default function App({ children }) {
    const { flash } = usePage().props;

    useEffect(() => {
        flash.type && toast[flash.type](flash.message);
    }, [flash]);

    return (
        <div>
            <Navigation />

            <Toaster />

            <div className="pt-8">{children}</div>

            <Footer />
        </div>
    );
}
