import { Head, Link } from "@inertiajs/inertia-react";
import AppLayout from "@/Layouts/AppLayout";
import Header from "@/Components/Header";
import ArticleBlock from "@/Components/ArticleBlock";
import Grid from "@/Components/Grid";
import { Container } from "@/Components/Container";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";

export const socials = {
    website: {
        class: "text-sky-500",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
            </svg>
        ),
    },
    twitter: {
        class: "text-sky-500",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path>
            </svg>
        ),
    },
    facebook: {
        class: "text-blue-600",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
            </svg>
        ),
    },
    linkedin: {
        class: "text-sky-800",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                <line x1="8" y1="11" x2="8" y2="16"></line>
                <line x1="8" y1="8" x2="8" y2="8.01"></line>
                <line x1="12" y1="16" x2="12" y2="11"></line>
                <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
            </svg>
        ),
    },
    telegram: {
        class: "text-sky-600",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path>
            </svg>
        ),
    },
    instagram: {
        class: "text-red-500",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="h-5 w-5"
                viewBox="0 0 16 16"
            >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
            </svg>
        ),
    },
};

export default function Show({ auth, user, ...props }) {
    const { data: articles, meta, links } = props.articles;

    return (
        <>
            <Head title={user.username} />

            <Header>
                <Header.Title>{user.name}</Header.Title>
                <Header.Subtitle> {user.joined}</Header.Subtitle>
                {user.bio && (
                    <div className="mt-6 text-white">
                        <p dangerouslySetInnerHTML={{ __html: user.bio }} />
                    </div>
                )}
                <div className="mt-3 flex items-center justify-start gap-2">
                    {user.links && user.links.length
                        ? user.links.map((link, i) => (
                              <a
                                  href={link.full_url}
                                  key={i}
                                  target="_blank"
                                  rel="noopener"
                                  className={`bg-shark-200/60 flex h-8 w-10 items-center justify-center rounded-lg ${
                                      socials[link.name]
                                          ? socials[link.name].class
                                          : socials["website"].class
                                  }  dark:border-shark-600 dark:bg-shark-900`}
                              >
                                  {socials[link.name]
                                      ? socials[link.name].icon
                                      : socials["website"].icon}
                              </a>
                          ))
                        : null}
                </div>
                {auth.user?.username === user.username && (
                    <PrimaryButton className="mt-6">
                        <Link href={route("settings.profile")}>edit</Link>
                    </PrimaryButton>
                )}
            </Header>

            <Container>
                {articles.length ? (
                    <>
                        <Grid>
                            {articles.map((article) => (
                                <ArticleBlock
                                    key={article.slug}
                                    article={article}
                                />
                            ))}
                        </Grid>
                        <Pagination {...{ meta, links }} />
                    </>
                ) : (
                    <p>no article</p>
                )}
            </Container>
        </>
    );
}

Show.layout = (page) => <AppLayout children={page} />;
