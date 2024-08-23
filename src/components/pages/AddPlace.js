import React, { useState } from 'react'
import { backEndServer } from '../../import'
import { toast } from 'react-toastify'

const AddPlace = ({ fetchPlaceAfterDelete }) => {
    const [placeName, setPlaceName] = useState('');
    const [placeDetails, setPlaceDetails] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePlaceChangeName = (e) => setPlaceName(e.target.value);
    const handlePlaceDetailsChange = (e) => setPlaceDetails(e.target.value);
    const handleImageChange = (e) => setImage(e.target.files[0]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('placeName', placeName);
        formData.append('image', image);
        formData.append('placeDetails', placeDetails);
        try {
            const response = await fetch(`${backEndServer}/api/places`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
                setPlaceName('');
                setImage(null);
                setPlaceDetails('');
                fetchPlaceAfterDelete();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg'>
            <h2 className='text-2xl font-bold mb-4 text-center text-gray-800'>Add Place</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label htmlFor='placeName' className='block text-gray-700 font-medium'>
                        Place Name:
                    </label>
                    <input
                        type='text'
                        id='placeName'
                        value={placeName}
                        onChange={handlePlaceChangeName}
                        className='w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='placeDetails' className='block text-gray-700 font-medium'>
                        Place Details:
                    </label>
                    <textarea
                        id='placeDetails'
                        value={placeDetails}
                        onChange={handlePlaceDetailsChange}
                        className='w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg resize-none'
                        rows='4'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='image' className='block text-gray-700 font-medium mb-2'>
                        Upload Image:
                    </label>
                    <div className='flex items-center'>
                        <label className='cursor-pointer bg-gray-200 p-3 rounded-lg flex items-center justify-center border border-dashed border-gray-400 hover:bg-gray-300 transition-colors duration-300'>
                            <input
                                type='file'
                                id='image'
                                accept='image/*'
                                onChange={handleImageChange}
                                className='hidden'
                            />
                            <span className='text-blue-500 text-lg font-semibold flex items-center'>
                                <svg
                                    className='h-6 w-6 mr-2'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M12 4v16m8-8H4'
                                    />
                                </svg>
                                Choose File
                            </span>
                        </label>
                        {image && (
                            <span className='ml-4 text-gray-600'>{image.name}</span>
                        )}
                    </div>
                </div>
                <button
                    type='submit'
                    className={`w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 text-lg font-semibold flex justify-center items-center ${loading ? 'cursor-not-allowed' : ''
                        }`}
                    disabled={loading}
                >
                    {loading ? (
                        <div className='flex justify-center items-center'>
                            <svg
                                className='animate-spin h-6 w-6 text-white mr-2'
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

export default AddPlace;
