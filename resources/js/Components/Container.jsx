import clsx from "clsx";
import React from "react";

export const Container = ({ children, ...props }) => {
    return (
        <div className={clsx("grid grid-cols-12", props.className)}>
            <div className="col-span-10 col-start-2">{children}</div>
        </div>
    );
};
