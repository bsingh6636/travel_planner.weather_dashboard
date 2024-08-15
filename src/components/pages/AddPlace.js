import React, { useState } from 'react'

const AddPlace = ({ fetchPlaceAfterDelete }) => {

    const [placeName, setPlaceName] = useState('')
    const [placeDetails, setPlaceDetails] = useState('')
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const handlePlaceChangeName = (e) => setPlaceName(e.target.value);
    const handlePLaceDetailsChange = (e) => setPlaceDetails(e.target.value);
    const handleImageChange = (e) => setImage(e.target.files[0]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append('placeName', placeName);
        formData.append('image', image);
        formData.append('placeDetails', placeDetails)
        try {
            const response = await fetch('http://localhost:1234/api/places', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Place added successfully!');
                setPlaceName('');
                setImage(null);
                setPlaceDetails('')
                fetchPlaceAfterDelete()
            } else {
                alert('Failed to add place.');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='max-w-md mx-auto bg-gray-200 p-4 shadow-md rounded-lg'>
            <h2 className='text-xl font-bold mb-2 text-center'>Add Place</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor='placeName' className='block text-gray-700'>
                        Place Name:
                    </label>
                    <input
                        type='text'
                        id='placeName'
                        value={placeName}
                        onChange={handlePlaceChangeName}
                        className='w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
                        required
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='placeDetails' className='block text-gray-700'>
                        Place Details:
                    </label>
                    <input
                        type='text'
                        id='placeDetails'
                        value={placeDetails}
                        onChange={handlePLaceDetailsChange}
                        className='w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
                        required
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='image' className='block text-gray-700'>
                        Upload Image:
                    </label>
                    <input
                        type='file'
                        id='image'
                        accept='image/*'
                        onChange={handleImageChange}
                        className='w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                </div>
                <button
                    type='submit'
                    className='w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-300'
                    disabled={loading}
                >
                    {loading ? (
                        <div className='flex justify-center items-center'>
                            <svg
                                className='animate-spin h-5 w-5 text-white mr-2'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                            >
                                <circle
                                    className='opacity-25'
                                    cx='12'
                                    cy='12'
                                    r='10'
                                    stroke='currentColor'
                                    strokeWidth='4'
                                />
                                <path
                                    className='opacity-75'
                                    fill='currentColor'
                                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0110-10V0C4.477 0 0 4.477 0 10h2z'
                                />
                            </svg>
                            Processing...
                        </div>
                    ) : (
                        'Submit'
                    )}
                </button>
            </form>
        </div>
    );
}

export default AddPlace