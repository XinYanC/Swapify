import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/post.css';

const Post = ({ id, title, description, imageUrl, location, initialLikes = 0, price = 0, transactionType = 'pickup' }) => {
    const [likes, setLikes] = useState(initialLikes);
    const navigate = useNavigate();

    const isSell = transactionType === 'sell';

    const handleLike = (e) => {
        e.stopPropagation();
        setLikes(likes + 1);
    };

    const handleOpenPost = () => {
        if (id) {
            navigate(`/post/${id}`);
        }
    };

    // Don't render if there's no title
    if (!title) {
        return null;
    }

    return (
        <div onClick={handleOpenPost} className="post-container">
            <div className="post-title">
                {title}
            </div>
            {location && <p className="post-location">📍 {location}</p>}
            {imageUrl && <img src={imageUrl} alt={title} />}
            {description && <p className="post-description">{description}</p>}

            <button onClick={handleLike} className="like-button">
                Like ({likes})
            </button>
            <button
                type="button"
                className={`transaction-button ${isSell ? 'sell' : transactionType}`}
            >
                {isSell ? `$${price}` : transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}
            </button>
        </div>
    );
};

export default Post;