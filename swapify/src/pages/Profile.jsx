import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post'; // Your existing Post component
import '../styles/profile.css';

// SVG Icons
const LocationIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const CalendarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const VerifiedIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const Profile = () => {
    const { userId } = useParams(); // Get user ID from URL if viewing someone else's profile
    const [user, setUser] = useState(null);
    const [listings, setListings] = useState([]);
    const [activeTab, setActiveTab] = useState('active'); // 'active' or 'sold'
    const [loading, setLoading] = useState(true);

    // Mock data - replace with actual API calls
    useEffect(() => {
        // Simulate API fetch
        const fetchUserData = async () => {
            setLoading(true);
            
            // Mock user data
            const mockUser = {
                id: userId || 'current-user',
                name: 'Sarah Chen',
                username: '@sarah.chen',
                avatar: null, // No avatar, will use initials
                location: 'New York, NY',
                memberSince: '2024',
                rating: 4.8,
                totalReviews: 128,
                verified: true,
                bio: 'Book lover 📚 | NYU student | Always looking for good reads',
                stats: {
                    itemsListed: 24,
                    itemsSold: 8,
                    activeListings: 16
                }
            };

            // Mock listings data
            const mockListings = [
                {
                    _id: '1',
                    title: 'STEWART\'S CALCULUS',
                    description: 'Early Transcendentals 8th Edition',
                    images: ['https://via.placeholder.com/300'],
                    meetup_location: 'Bobst Library',
                    transaction_type: 'sell',
                    price: 45,
                    status: 'active', // 'active' or 'sold'
                    createdAt: '2024-02-20'
                },
                {
                    _id: '2',
                    title: 'The Great Gatsby',
                    description: 'Hardcover edition',
                    images: ['https://via.placeholder.com/300'],
                    meetup_location: 'Starbucks on 3rd',
                    transaction_type: 'pickup',
                    price: 0,
                    status: 'active'
                },
                {
                    _id: '3',
                    title: 'Organic Chemistry Textbook',
                    description: '7th Edition, like new',
                    images: ['https://via.placeholder.com/300'],
                    meetup_location: 'Science Library',
                    transaction_type: 'sell',
                    price: 65,
                    status: 'sold'
                },
                {
                    _id: '4',
                    title: 'Introduction to Algorithms',
                    description: 'CLRS, some highlighting',
                    images: ['https://via.placeholder.com/300'],
                    meetup_location: 'CS Building',
                    transaction_type: 'sell',
                    price: 50,
                    status: 'active'
                },
                {
                    _id: '5',
                    title: 'Modern Art History',
                    description: 'Course textbook',
                    images: ['https://via.placeholder.com/300'],
                    meetup_location: 'Art School',
                    transaction_type: 'donation',
                    price: 0,
                    status: 'sold'
                }
            ];

            setUser(mockUser);
            setListings(mockListings);
            setLoading(false);
        };

        fetchUserData();
    }, [userId]);

    // Filter listings based on active tab
    const filteredListings = listings.filter(item => 
        activeTab === 'active' ? item.status === 'active' : item.status === 'sold'
    );

    // Get user initials for avatar
    const getUserInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    if (loading) {
        return (
            <div className="profile-loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile-error">
                <h2>User not found</h2>
                <p>The profile you're looking for doesn't exist.</p>
            </div>
        );
    }

    return (
        <div className="profile-container">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-cover">
                    {/* Optional cover image */}
                </div>
                
                <div className="profile-info">
                    <div className="profile-avatar-large">
                        {getUserInitials(user.name)}
                    </div>
                    
                    <div className="profile-details">
                        <div className="profile-name-section">
                            <h1 className="profile-name">
                                {user.name}
                                {user.verified && <VerifiedIcon />}
                            </h1>
                            <p className="profile-username">{user.username}</p>
                        </div>
                        
                        <p className="profile-bio">{user.bio}</p>
                        
                        <div className="profile-meta">
                            <div className="profile-meta-item">
                                <LocationIcon />
                                <span>{user.location}</span>
                            </div>
                            <div className="profile-meta-item">
                                <CalendarIcon />
                                <span>Member since {user.memberSince}</span>
                            </div>
                        </div>
                        
                        <div className="profile-rating">
                            <span className="rating-stars">
                                {'★'.repeat(Math.floor(user.rating))}
                                {'☆'.repeat(5 - Math.floor(user.rating))}
                            </span>
                            <span className="rating-number">{user.rating}</span>
                            <span className="rating-total">({user.totalReviews} reviews)</span>
                        </div>
                        
                        <div className="profile-stats">
                            <div className="stat-item">
                                <span className="stat-value">{user.stats.itemsListed}</span>
                                <span className="stat-label">Listed</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{user.stats.itemsSold}</span>
                                <span className="stat-label">Sold</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{user.stats.activeListings}</span>
                                <span className="stat-label">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="profile-tabs">
                <button 
                    className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
                    onClick={() => setActiveTab('active')}
                >
                    Active Listings ({user.stats.activeListings})
                </button>
                <button 
                    className={`tab-button ${activeTab === 'sold' ? 'active' : ''}`}
                    onClick={() => setActiveTab('sold')}
                >
                    Sold Items ({user.stats.itemsSold})
                </button>
            </div>

            {/* Listings Grid */}
            {filteredListings.length > 0 ? (
                <div className="profile-posts-grid">
                    {filteredListings.map((listing) => (
                        <div key={listing._id} className="post-wrapper">
                            {listing.status === 'sold' && (
                                <div className="sold-overlay">
                                    <span>SOLD</span>
                                </div>
                            )}
                            <Post
                                id={listing._id}
                                title={listing.title}
                                description={listing.description}
                                imageUrl={listing.images && listing.images.length > 0 ? listing.images[0] : null}
                                location={listing.meetup_location}
                                transactionType={listing.transaction_type}
                                price={listing.price}
                                sellerName={user.name}
                                sellerRating={user.rating}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="profile-empty">
                    <p>No {activeTab} items to show.</p>
                </div>
            )}
        </div>
    );
};

export default Profile;