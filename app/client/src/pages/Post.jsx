import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import transformTimestamp from "../utils/transform-timestamp";
import transformWebp from "../utils/transform-webp";

const Post = () => {
    const [image, setImage] = useState("");
    const [date, setDate] = useState("");
    const [caption, setCaption] = useState("");
    const [tags, setTags] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        // Fetch the post data using the ID, and update the state
        fetch(`/api/get-post/${id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setImage(transformWebp(data.post.image.data));
                setCaption(data.post.caption);
                setDate(transformTimestamp(data.post.timestamp));
                setTags(data.post.tags);
            })
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    return (
        <div className="container">
            <img src={image} alt="Post image" />
            <h1>{caption}</h1>
            <p>{date}</p>
            <p>{tags.join(", ")}</p>
        </div>
    );
}

export default Post;
