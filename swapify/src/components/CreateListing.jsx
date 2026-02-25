import { useState } from 'react'
import { createListing } from '../api'
import '../styles/createListing.css'

const CreateListing = ({ isOpen, onClose, onSuccess }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [transactionType, setTransactionType] = useState('buy')
    const [owner, setOwner] = useState('')
    const [meetupLocation, setMeetupLocation] = useState('')
    const [price, setPrice] = useState('')
    const [images, setImages] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        setSuccess(false)

        try {
            const payload = {
                title,
                description,
                transaction_type: transactionType,
                owner,
                meetup_location: meetupLocation,
                price: price ? parseFloat(price) : 0
            }

            // Add optional images field if provided
            if (images) {
                // Split comma-separated image URLs into array
                payload.images = images.split(',').map(img => img.trim()).filter(img => img)
            }

            await createListing(payload)
            setSuccess(true)
            
            // Call onSuccess callback if provided
            if (onSuccess) {
                onSuccess()
            }
            
            // Reset form after 1.5 seconds and close
            setTimeout(() => {
                setTitle('')
                setDescription('')
                setTransactionType('buy')
                setOwner('')
                setMeetupLocation('')
                setPrice('')
                setImages('')
                setSuccess(false)
                onClose()
            }, 1500)
        } catch (err) {
            let errorMessage = 'Failed to create listing. Please try again.'
            
            if (err instanceof Error) {
                const match = err.message.match(/\{"Error":\s*"([^"]+)"\}/)
                if (match && match[1]) {
                    errorMessage = match[1]
                } else {
                    errorMessage = err.message
                }
            }
            
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="create-listing-overlay" onClick={onClose}>
            <div className="create-listing-card" onClick={(e) => e.stopPropagation()}>
                <div className="create-listing-header">
                    <h2>Create New Listing</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} className="create-listing-form">
                    <input
                        type="text"
                        placeholder="Title *"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    
                    <textarea
                        placeholder="Description *"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={4}
                    />
                    
                    <select
                        value={transactionType}
                        onChange={(e) => {
                            setTransactionType(e.target.value)
                            // Clear price when switching to options that don't need price
                            if (!['sell'].includes(e.target.value)) {
                                setPrice('')
                            }
                        }}
                        required
                    >
                        <option value="drop-off">Drop-off</option>
                        <option value="pickup">Pickup</option>
                        <option value="sell">Sell</option>
                    </select>
                    
                    {(transactionType === 'sell') && (
                        <input
                            type="number"
                            placeholder="Price *"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            step="0.01"
                            min="0"
                            required
                        />
                    )}
                    {/* remove once log in is implemented */}
                    <input
                        type="text"
                        placeholder="Owner (username) *"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        required
                    />
                    
                    <input
                        type="text"
                        placeholder="Meetup Location *"
                        value={meetupLocation}
                        onChange={(e) => setMeetupLocation(e.target.value)}
                        required
                    />
                    
                    <input
                        type="text"
                        placeholder="Image URLs (comma-separated, optional)"
                        value={images}
                        onChange={(e) => setImages(e.target.value)}
                    />
                    
                    <button type="submit" disabled={isLoading} className="submit-button">
                        {isLoading ? 'Creating...' : 'Create Listing'}
                    </button>
                </form>

                {error && (
                    <div className="error-container">
                        <p className="error-header">Failed to Create Listing</p>
                        <p className="error-message">{error}</p>
                    </div>
                )}
                
                {success && (
                    <p className="success-message">Listing created successfully!</p>
                )}
            </div>
        </div>
    )
}

export default CreateListing
