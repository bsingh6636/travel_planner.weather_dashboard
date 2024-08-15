import React, { useEffect, useState } from 'react'
import AddPlace from './pages/AddPlace'

const SuggestedPLaces = () => {
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async () => {
    console.log('fetch')
    try {
      const response = await fetch('http://localhost:1234/api/places');
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  async function deletePlace(_id) {
    try {
      const response = await fetch('http://localhost:1234/api/places', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id })
      })
      const data = await response.json()
      fetchPlaces()
      alert(data.message)

    } catch (error) {
      alert(error)
      console.log(error)
    }
  }
  return (
    <div className="container mx-auto px-4 py-6 pb-20 h-max">
      <AddPlace fetchPlaceAfterDelete={fetchPlaces} />
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Suggested Places</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {places.map((place) => (
            <div
              key={place._id}
              className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-700">{place.placeName}</h3>
              <p className="text-gray-600 mb-3">{place.placeDetails}</p>
              <img
                src={place.imageUrl}
                alt={place.placeName}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <button
                className="w-full text-white bg-red-500 p-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                onClick={() => deletePlace(place._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SuggestedPLaces