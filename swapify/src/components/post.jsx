import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/post.css';

const Post = ({ id, imageUrl, initialLikes = 0, price = 0}) => {
    const [likes, setLikes] = useState(initialLikes);
    const navigate = useNavigate();

    const handleLike = (e) => {
        e.stopPropagation();
        setLikes(likes + 1);
    };

    const handleOpenPost = () => {
        navigate(`/post/${id}`);
    };

    return (
        <div onClick={handleOpenPost} className="post-container">
            <img src={imageUrl} alt="Item Image" />
            <div className="post-title">
                ${price}
            </div>
            <button onClick={handleLike} className="like-button">
                Like ({likes})
            </button>
        </div>
    );
};

export default Post;