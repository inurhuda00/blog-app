import clsx from "clsx";

export default function Image({ className, ...props }) {
    return (
        <img
            {...props}
            className={clsx("aspect-[713/437] object-cover", className)}
            width="713"
            height="437"
        />
    );
}
