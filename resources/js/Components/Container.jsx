import clsx from "clsx";

export const Container = ({ children, ...props }) => {
    return (
        <div className={clsx("mx-auto max-w-7xl", props.className)}>
            {children}
        </div>
    );
};
