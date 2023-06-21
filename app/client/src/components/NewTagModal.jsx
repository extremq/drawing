import React, { useState } from "react";
import ErrorAlert from "./ErrorAlert";

const NewTagModal = (props) => {
    const [error, setError] = useState("Please enter a tag.");
    const [tag, setTag] = useState("");
    const [disableButton, setDisableButton] = useState(true);

    const onCreateTag = (event) => {
        event.preventDefault();
        let tag = event.target.newTagForm.value;
        // Add tag to new tags
        props.onCreateTag(tag);
        props.onClose();
    };

    const onChangeTag = (event) => {
        event.preventDefault();
        let tag = event.target.value;
        // Enforce lowercase
        tag = tag.toLowerCase();
        // Don't allow spaces
        tag = tag.replace(/\s/g, "");
        // Only allow alphanumeric characters and dashes
        tag = tag.replace(/[^a-z0-9\-]/g, "");
        // Check if tag exists
        if (!tag) {
            setError("Please enter a tag.");
            setTag(tag);
            setDisableButton(true);
            return;
        }
        // Check if tag is already in tags
        if (props.tags.includes(tag)) {
            setError("Tag already exists.");
            setTag(tag);
            setDisableButton(true);
            return;
        }
        // Check if tag is already in new tags
        if (props.newTags.includes(tag)) {
            setError("Tag already exists.");
            setTag(tag);
            setDisableButton(true);
            return;
        }
        setError(null);
        setTag(tag);
        setDisableButton(false);
    };

    return (
        <div className={props.open ? "modal show d-block" : "modal"} tabIndex="-1" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Tag</h5>
                        <button type="button" className="btn-close" onClick={props.onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form className="mb-3" onSubmit={onCreateTag}>
                            <div className="mb-3">
                                <label htmlFor="newTagForm" className="form-label">Tag</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="newTagForm"
                                    placeholder="Enter tag"
                                    value={tag}
                                    onChange={onChangeTag}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark me-2" disabled={disableButton}>
                                Submit
                            </button>
                        </form>
                        <ErrorAlert error={error} onClick={() => setError(null)} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-dark" onClick={props.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewTagModal;
