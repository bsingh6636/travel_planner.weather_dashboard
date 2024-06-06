import React from 'react'
import { getCurrentCity } from './utils/getCurrentLocation'
import { autoSuggest } from './utils/testFunction'

const LocationAndDateChoose = () => {
    // getCurrentCity()
    autoSuggest();
    return (
        <div className="flex justify-center items-center h-52 bg-gray-100">
            <form className="bg-white p-6 rounded-lg shadow-lg flex space-x-4">
                <div className="flex flex-col">
                    <label htmlFor="current-location" className="font-semibold mb-1">Current Location</label>
                    <input type="text" id="current-location" className="border rounded-lg p-2" placeholder="Enter your location" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="destination" className="font-semibold mb-1">Destination</label>
                    <input type="text" id="destination" className="border rounded-lg p-2" placeholder="Enter your destination" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="travel-date" className="font-semibold mb-1">Travel Date</label>
                    <input type="date" id="travel-date" className="border rounded-lg p-2" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="return-date" className="font-semibold mb-1">Return Date</label>
                    <input type="date" id="return-date" className="border rounded-lg p-2" />
                </div>
                <div className="flex flex-col justify-end">
                    <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600">
                        Search
                    </button>
                </div>
            </form>
        </div>

    )
}

export default LocationAndDateChoose