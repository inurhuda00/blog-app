import ApplicationLogo from "@/Components/ApplicationLogo";
import { Container } from "@/Components/Container";

export default function Footer() {
    return (
        <div className="mt-8 border-t bg-gray-800 py-10">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <ApplicationLogo className="mx-auto h-16 w-16 fill-white" />
                    <p className="mt-5 text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quos, ipsam. Magni quidem corporis minus rem, doloribus
                        nihil! Reprehenderit quasi omnis dolor dolores nostrum
                        nobis molestias laudantium! Quod fuga ratione non?
                    </p>
                    <p className="mx-auto mt-10 max-w-lg font-mono text-sm text-gray-400">
                        Designed and built with all the love in the world by the{" "}
                        <strong className="font-semibold text-white">
                            {import.meta.env.VITE_APP_NAME}
                        </strong>{" "}
                        team with the help of our author.
                    </p>

                    <p className="mt-8 font-mono text-xs text-gray-400">
                        Copyright {new Date().getFullYear()} All right reserved.
                    </p>
                </div>
            </Container>
        </div>
    );
}
