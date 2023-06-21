import React, { useEffect, useState } from "react";
import toImage from "../utils/transform-webp";
import formattedDate from "../utils/transform-timestamp";
import Navigator from "./Navigator";

const EmbedPost = (props) => {
    const [image, setImage] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        // Format date
        setDate(formattedDate(props.timestamp));

        // Convert webp buffer to image
        setImage(toImage(props.image.data));
    }, [props.image.data, props.timestamp]);

    return (
        <div className="card h-100">
            <img className="card-img-top" src={image} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">
                    {props.caption} – <small className="text-muted"><em> {date} </em></small>
                </h5>
            </div>
            <div className="card-footer text-end">
                <Navigator to={`/post/${props.id}`} className="btn btn-dark btn-sm">View Post</Navigator>
            </div>
        </div>
    );
};

export default EmbedPost;
