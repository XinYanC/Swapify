import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/post.css';

const Post = ({ 
    id, 
    title, 
    description, 
    imageUrl, 
    location, 
    initialLikes = 0, 
    price = 0, 
    transactionType = 'pickup',
    sellerName = 'Sarah Chen', // Default for demo, you'll get this from your data
    sellerRating = 4.8 // Default for demo, you'll get this from your data
}) => {
    const [likes, setLikes] = useState(initialLikes);
    const navigate = useNavigate();

    const handleLike = (e) => {
        e.stopPropagation();
        setLikes(likes + 1);
    };

    const handleOpenPost = () => {
        if (id) {
            navigate(`/post/${id}`);
        }
    };

    // Get transaction icon based on type
    const getTransactionIcon = (type) => {
        switch(type.toLowerCase()) {
            case 'pickup':
                return '📦';
            case 'buy':
                return '🛒';
            case 'sell':
                return '💰';
            case 'donation':
                return '🎁';
            case 'drop-off':
                return '📮';
            case 'trade':
                return '🔄';
            default:
                return '📌';
        }
    };

    // Get seller initials for avatar
    const getSellerInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    // Don't render if there's no title
    if (!title) {
        return null;
    }

    return (
        <div onClick={handleOpenPost} className="post-container">
            {imageUrl && <img src={imageUrl} alt={title} />}
            <div className="post-title">
                {title}
            </div>
            {description && <p className="post-description">{description}</p>}
            {location && <p className="post-location">📍 {location}</p>}
            
            <button onClick={handleLike} className="like-button">
                👍 {likes}
            </button>

            {/* Seller Info Section */}
            <div className="post-seller">
                <div className="seller-info">
                    <div className="seller-avatar">
                        {getSellerInitials(sellerName)}
                    </div>
                    <div className="seller-details">
                        <span className="seller-name">{sellerName}</span>
                        <span className="seller-rating">
                            <span className="star-icon filled">★</span>
                            {sellerRating}
                        </span>
                    </div>
                </div>
                
                {/* Conditional Icon based on transaction type */}
                <div className={`transaction-icon ${transactionType}`}>
                    {getTransactionIcon(transactionType)}
                </div>
            </div>
        </div>
    );
};

export default Post;