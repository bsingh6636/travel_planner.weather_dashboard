import React, { useRef, useState } from 'react'
import { getCurrentCity } from './utils/getCurrentLocation'
import { autoSuggest } from './utils/testFunction'
import WeatherWidget from './WeatherWidget'


const LocationAndDateChoose = () => {
    const suggestCity = useRef("")
    const toSuggestCity = useRef("")
    const [fromSuggestionBar, setFromSuggestionBar] = useState(false)
    const [toSuggestionBar, setToSuggestionBar] = useState(false)
    const [suggestedData, setSuggestedData] = useState("")
    getCurrentCity()

    const suggestionFunction = async (data) => {
        console.log(data)
        if (data.length > 2) {
            // const volume=await autoSuggest(data)
            // setSuggestedData(volume)
            // console.log(volume)

            const ixigoSuggestion = await fetch(`https://travel-planner-weather-dashboard-mosd.vercel.app/https://www.ixigo.com/action/content/city?searchFor=airportSuggestions&value=${data}&nearByAirport=true`)

            const ixigoSuggestionResponse = await ixigoSuggestion.json()
            console.log("ixigo", ixigoSuggestionResponse.data.slice(0, 5))
            setSuggestedData(ixigoSuggestionResponse.data.slice(0, 5))
        }


    }

    const bgImage = "https://img.freepik.com/premium-photo/bag-full-famous-monument-with-passport_250014-104.jpg?w=740";
    return (
        <div className="flex h-auto mt-5 pt-56 justify-center items-center  bg-gray-100 rounded-2xl " style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            overflow: 'hidden'
        }}>
            <form className="bg-white p-6 rounded-lg shadow-lg flex space-x-4">
                <div className="flex flex-col">
                    <label htmlFor="current-location" className="font-semibold mb-1">From</label>
                    <input type="text" onFocus={() => setFromSuggestionBar(true)} onBlur={() => setFromSuggestionBar(false)} ref={toSuggestCity} onChange={() => suggestionFunction(toSuggestCity.current.value)} id="current-location" className="border rounded-lg p-2" placeholder="Enter your location" />
                    {fromSuggestionBar && suggestedData && <SuggestContainer suggestion={suggestedData} />}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="destination" className="font-semibold mb-1">Destination</label>
                    <input type="text" onFocus={() => setToSuggestionBar(true)} onBlur={() => setToSuggestionBar(false)} ref={suggestCity} onChange={() => suggestionFunction(suggestCity.current.value)} id="destination" className="border rounded-lg p-2" placeholder="Enter your destination" />
                    {toSuggestionBar && suggestedData && <SuggestContainer suggestion={suggestedData} />}
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
            <WeatherWidget/>

        </div>

    )
}

export default LocationAndDateChoose

export const SuggestContainer = ({ suggestion }) => {
    // const { airportCode, airportName, cityName, countryName } = suggestion
    // console.log(suggestion, airportCode, countryName)

    return (

        <div className='absolute mt-20 bg-gray-100 mx-2   rounded-lg flex-col'>
            {suggestion.map((data) => {
                return (
                    <div key={data.xid} className='flex m-2 p-2 bg-gray-300 hover:bg-slate-300'>
                        <div className='bg-gray-200 m-1 p-2 rounded-lg  '>
                            <span>{data.airportCode}</span>
                            {console.log(data.airportCode)}
                        </div>
                        <div >
                            <h1>{data.cityName},{data.countryName}</h1>
                            <h1>{data.airportName}</h1>
                        </div>
                    </div>)
            })}
        </div>
    )
}