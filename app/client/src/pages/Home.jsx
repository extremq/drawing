import React, { useState, useEffect } from 'react';
import EmbedPost from '../components/EmbeddedPost';

const Home = () => {
    const [posts, setPosts] = useState([]);

    const loadPosts = (start, end) => {
        fetch("/api/get-posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                start: start,
                end: end
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setPosts(data.posts);
                console.log(data.posts);
            }
        })
        .catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        // Load posts
        loadPosts(0, 10);
    }, []); // Empty dependency array means this useEffect runs once when the component mounts

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {/* Map posts */}
                {posts.map((post, index) => {
                    return (
                        <div key={post._id} className="col">
                            <EmbedPost
                                key={index}
                                image={post.image}
                                caption={post.caption}
                                timestamp={post.timestamp}
                                id={post._id}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
