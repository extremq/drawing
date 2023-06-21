import React, { useState, useEffect } from 'react';
import NewTagModal from '../components/NewTagModal';
import ErrorAlert from '../components/ErrorAlert';

const CreatePost = () => {
    const [error, setError] = useState(null);
    const [postLoading, setPostLoading] = useState(false);
    const [tagsLoading, setTagsLoading] = useState(false);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [newTags, setNewTags] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [token, setToken] = useState(null || localStorage.getItem('token'));

    useEffect(() => {
        loadTags();
    }, []); // Empty dependency array means this useEffect runs once when the component mounts

    const loadTags = () => {
        setTagsLoading(true);

        // Get tags
        fetch('/api/get-tags', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setTags(data.tags);
                    setTagsLoading(false);
                } else {
                    setError(data.error);
                    setTagsLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setError('An error occurred.');
                setTagsLoading(false);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if caption exists
        if (!event.target.captionForm.value) {
            setError('Please enter a caption.');
            return;
        }

        // Check if image exists
        if (!event.target.imageForm.files[0]) {
            setError('Please upload an image.');
            return;
        }

        // Check if tags exist
        if (selectedTags.length === 0 && newTags.length === 0) {
            setError('Please select at least one tag.');
            return;
        }

        // Create form data
        const formData = new FormData();
        formData.append("caption", event.target.captionForm.value);
        formData.append("image", event.target.imageForm.files[0]);
        formData.append("tags", JSON.stringify({
            selectedTags: selectedTags,
            newTags: newTags,
        }));
        formData.append("token", token);

        setPostLoading(true);

        // Create post
        fetch("/api/create-post", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPostLoading(false);
                } else {
                    setError(data.error);
                    setPostLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setError("An error occurred.");
                setPostLoading(false);
            });
    }

    const onImageChange = (event) => {
        // Only accept webp
        if (event.target.files[0].type !== "image/webp") {
            setError("Please upload a webp image.");

            return;
        }
    }

    const onTagChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setSelectedTags(selectedOptions);
    }

    const onCreateTag = (tag) => {
        // Tag created, add to new tags
        setNewTags([...newTags, tag]);
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const onClickRemoveTag = (tag) => {
        // Remove tag from selected tags
        setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
        setNewTags(newTags.filter((newTag) => newTag !== tag));
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ maxWidth: "30vw", height: "100vh" }}>
            <div>
                <h1>Create a post</h1>
                <form className="mb-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="captionForm" className="form-label">Caption</label>
                        <input type="text" className="form-control" id="captionForm" placeholder="Enter caption" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="imageForm" className="form-label">Image</label>
                        <input type="file" className="form-control" id="imageForm" onChange={onImageChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Tags
                            {tagsLoading && <span className="spinner-border spinner-border-sm text-dark ms-2"></span>}
                            <button type="button" className="btn btn-dark btn-sm ms-2" onClick={openModal} disabled={tagsLoading}>+</button>
                        </label>
                        <select className="form-select" multiple id="tagForm" onChange={onTagChange}>
                            {
                                tags.sort((a, b) => b.count - a.count).map((tag) => (
                                    <option key={tag.name} value={tag.name}>{tag.name} - used {tag.count} times</option>
                                ))
                            }
                        </select>

                        {selectedTags.length > 0 && (
                            <small className="form-text text-muted">
                                Selected tags: {selectedTags.length}
                                <br />
                            </small>
                        )}

                        {selectedTags.map((tag) => (
                            <span key={tag} className="badge bg-dark me-1 mb-1" onClick={() => onClickRemoveTag(tag)}>{tag}</span>
                        ))}

                        <br />

                        {newTags.length > 0 && (
                            <small className="form-text text-muted">
                                New tags: {newTags.length}
                                <br />
                            </small>
                        )}

                        {newTags.map((tag) => (
                            <span key={tag} className="badge bg-dark me-1 mb-1" onClick={() => onClickRemoveTag(tag)}>{tag}</span>
                        ))}
                    </div>

                    <div className="d-flex align-items-center">
                        <button type="submit" className="btn btn-dark me-2" disabled={postLoading}>Submit</button>
                        {postLoading && <span className="spinner-border spinner-border-sm text-dark"></span>}
                    </div>
                </form>


                <ErrorAlert error={error} onClick={() => setState({ error: null })} />

                <NewTagModal
                    open={isModalOpen}
                    onClose={closeModal}
                    onCreateTag={onCreateTag}
                    tags={tags.map((tag) => tag.name)}
                    newTags={newTags}
                    token={token}
                />
            </div>
        </div>

    );
}

export default CreatePost;