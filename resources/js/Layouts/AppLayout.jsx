import { usePage } from "@inertiajs/react";
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
        <>
            <Navigation />

            <Toaster />

            {children}

            <Footer />
        </>
    );
}
