import React, { useContext, useEffect, useRef, useState } from 'react'
// import { getCurrentCity } from './utils/getCurrentLocation'
// import { autoSuggest } from './utils/testFunction'
import WeatherWidget from './WeatherWidget'
import SuggestContainer from './pages/SuggestContainer'
import {myContext} from '../index'
import { suggestionFunction } from './utils/ApiFunction'



const LocationAndDateChoose = () => {
    const {object,setObject} = useContext(myContext)
    useEffect(()=>{
        setObject({...object,marginTop:"mt-10"})
    },[])
   
    console.log(object)
    const suggestCity = useRef("")
    const toSuggestCity = useRef("")
    const [fromSuggestionBar, setFromSuggestionBar] = useState(false)
    const [toSuggestionBar, setToSuggestionBar] = useState(false)
    const [toSuggestedData, setToSuggestedData] = useState("")
    const [fromSuggestedData, setFromSuggestedData] = useState("")
    // getCurrentCity()

    // const suggestionFunction = async (data, setLoc) => {
    //     // console.log(data)
    //     if (data.length > 2) {
    //         const ixigoSuggestion = await fetch(`http://localhost:1234/https://www.ixigo.com/action/content/city?searchFor=airportSuggestions&value=${data}&nearByAirport=true`)
    //         // const ixigoSuggestion = await fetch(`https://www.ixigo.com/action/content/city?searchFor=airportSuggestions&value=${data}&nearByAirport=true`)
    //         const ixigoSuggestionResponse = await ixigoSuggestion.json()
    //         setLoc(ixigoSuggestionResponse.data.slice(0, 5))
    //     }
    // }
   const data = suggestionFunction(setLoc)
   console.log(data)

    return (
        <div className="flex  mt-10 p-2 justify-center items-center   bg-gray-300 rounded-2xl w-[1000px]" >
            <form className= {` bg-white p-6 rounded-lg shadow-lg flex space-x-4  align-middle ${object.marginTop}`} onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col">
                   
                    <label htmlFor="current-location" className="font-semibold mb-1">From</label>
                    <input type="text" onFocus={() => setFromSuggestionBar(true)} ref={toSuggestCity}
                        onBlur={() => setFromSuggestionBar(false)}
                        onChange={() => suggestionFunction(toSuggestCity.current.value, setFromSuggestedData)}
                        id="current-location" className="border rounded-lg p-2" placeholder="Enter your location" />
                    {fromSuggestionBar && fromSuggestedData && <SuggestContainer suggestion={fromSuggestedData} />}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="destination" className="font-semibold mb-1">Destination</label>
                    <input type="text" onFocus={() => setToSuggestionBar(true)} onBlur={() => setToSuggestionBar(false)} ref={suggestCity}
                        onChange={() => suggestionFunction(suggestCity.current.value, setToSuggestedData)}
                        id="destination" className="border rounded-lg p-2" placeholder="Enter your destination" />
                    {toSuggestionBar && toSuggestedData && <SuggestContainer suggestion={toSuggestedData} />}
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
            <WeatherWidget />

        </div>

    )
}

export default LocationAndDateChoose

