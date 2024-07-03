import React, { useRef, useState } from 'react'
import { getCurrentCity } from './utils/getCurrentLocation'
import { autoSuggest } from './utils/testFunction'
import WeatherWidget from './WeatherWidget'


const LocationAndDateChoose = () => {
    const suggestCity = useRef("")
    const toSuggestCity = useRef("")
    const [fromSuggestionBar, setFromSuggestionBar] = useState(false)
    const [toSuggestionBar, setToSuggestionBar] = useState(false)
    const [toSuggestedData, setToSuggestedData] = useState("")
    const [fromSuggestedData, setFromSuggestedData] = useState("")
    // getCurrentCity()

    const suggestionFunction = async (data, setLoc) => {
        // console.log(data)
        if (data.length > 2) {
            // const volume=await autoSuggest(data)
            // setSuggestedData(volume)
            // console.log(volume)

            const ixigoSuggestion = await fetch(`http://localhost:1234/https://www.ixigo.com/action/content/city?searchFor=airportSuggestions&value=${data}&nearByAirport=true`)
            // const ixigoSuggestion = await fetch(`https://www.ixigo.com/action/content/city?searchFor=airportSuggestions&value=${data}&nearByAirport=true`)

            const ixigoSuggestionResponse = await ixigoSuggestion.json()
            // console.log("ixigo", ixigoSuggestionResponse.data.slice(0, 5))
            setLoc(ixigoSuggestionResponse.data.slice(0, 5))
            
        }
    }

    function settingInputValue(type, value) {
        console.log("hy")
        if (type == "from") {
            console.log(value)
            toSuggestCity.current.value = value
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
            <form className="bg-white p-6 rounded-lg shadow-lg flex space-x-4" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col">
                    <label htmlFor="current-location" className="font-semibold mb-1">From</label>
                    <input type="text" onFocus={() => setFromSuggestionBar(true)} ref={toSuggestCity}
                    //  onBlur={() => setFromSuggestionBar(false)} 
                        onChange={() => suggestionFunction(toSuggestCity.current.value, setFromSuggestedData)}
                        id="current-location" className="border rounded-lg p-2" placeholder="Enter your location" />
                    {fromSuggestionBar && fromSuggestedData && <SuggestContainer suggestion={fromSuggestedData} settingInputValue= {settingInputValue} />}
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

export const SuggestContainer = ({ suggestion, settingInputValue }) => {
    // const { airportCode, airportName, cityName, countryName } = suggestion
    // console.log(suggestion, airportCode, countryName)
    function test () {
        console.log('click working')
    }

    return (

        <div className='absolute mt-20 bg-gray-100 mx-2   max-h-full rounded-lg flex-col'  onClick={() => test()} >
            {suggestion.map((data) => {
                return (
                    <div key={data.xid}  onClick={()=>settingInputValue(data.airportCode)} className='flex m-2 p-2 bg-gray-300 cursor-pointer hover:bg-slate-300' onMouseEnter={()=>console.log(data.airportCode)}  >
                        <div  className='bg-gray-200 m-1 p-2 rounded-lg'>
                            <span>{data.airportCode}</span>
                            {/* {console.log(data.airportCode)} */}
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