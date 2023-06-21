import React from "react";

const ErrorAlert = (props) => {
    return (
        props.error && (
            <div className="alert alert-dark alert-dismissible">
                <button type="button" className="btn-close" onClick={() => props.onClick()}></button>
                <b>Error:</b> {` ${props.error}`}
            </div>
        )
    );
};

export default ErrorAlert;
