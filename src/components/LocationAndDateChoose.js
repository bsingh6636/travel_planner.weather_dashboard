import React, { useContext, useEffect, useRef, useState } from 'react';
import WeatherWidget from './WeatherWidget';
import SuggestContainer from './pages/SuggestContainer';
import { myContext } from '../index';

const LocationAndDateChoose = () => {
    const { object, setObject } = useContext(myContext);

    useEffect(() => {
        setObject({ ...object, marginTop: 'mdt-[-400px]' });
        // eslint-disable-next-line
    }, []);

    const fromSuggestCity = useRef('');
    const toSuggestCity = useRef('');
    const [fromSuggestionBar, setFromSuggestionBar] = useState(false);
    const [toSuggestionBar, setToSuggestionBar] = useState(false);
    const [toSuggestedData, setToSuggestedData] = useState('');
    const [fromSuggestedData, setFromSuggestedData] = useState('');

    function setFromValue (airportCode,city) {
            const data = `${airportCode} - ${city}`
            fromSuggestCity.current.value =data     
    }
    function setToValue (airportCode,city) {
        const data = `${airportCode} - ${city}`
        toSuggestCity.current.value =data  
}
    const suggestionFunction = async (data, setLoc) => {
        if (data.length > 2) {
            const ixigoSuggestion = await fetch(`https://proxyserver-production-006f.up.railway.app/https://www.ixigo.com/action/content/city?searchFor=airportSuggestions&value=${data}&nearByAirport=true`);
            const ixigoSuggestionResponse = await ixigoSuggestion.json();
            setLoc(ixigoSuggestionResponse.data.slice(0, 5));
        }
    };
        function suggestionBarHandlingTo (suggestionBarStatus){
            const i = setTimeout(()=>{
                suggestionBarStatus(false)
            },200)
            return i ;
        }

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between mt-10 p-4 sm:p-6 justify-center items-center h-auto sm:h-44 bg-gray-100 rounded-2xl w-full sm:w-[1200px]">
            <form
                className={`bg-white p-4 sm:p-6 mr-2 rounded-lg shadow-lg flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full ${object.marginTop}`}
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="flex flex-col w-full sm:w-auto">
                    <label htmlFor="current-location" className="font-semibold mb-1">From</label>
                    <input
                        type="text"
                        onFocus={() => setFromSuggestionBar(true)}
                        ref={fromSuggestCity}
                        onBlur={() => suggestionBarHandlingTo(setFromSuggestionBar) }
                        onChange={() => suggestionFunction(fromSuggestCity.current.value, setFromSuggestedData)}
                        id="current-location"
                        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                        placeholder="Enter your location"
                    />
                    {fromSuggestionBar && fromSuggestedData && <SuggestContainer suggestion={fromSuggestedData} settingInputValue={setFromValue} />}
                </div>
                <div className="flex flex-col w-full sm:w-auto">
                    <label htmlFor="destination" className="font-semibold mb-1">Destination</label>
                    <input
                        type="text"
                        onFocus={() => setToSuggestionBar(true)}
                        onBlur={() => suggestionBarHandlingTo(setToSuggestionBar)}
                        ref={toSuggestCity}
                        onChange={() => suggestionFunction(toSuggestCity.current.value, setToSuggestedData)}
                        id="destination"
                        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                        placeholder="Enter your destination"
                    />
                    {toSuggestionBar && toSuggestedData && <SuggestContainer suggestion={toSuggestedData} settingInputValue={setToValue} />}
                </div>
                <div className="flex flex-col w-full sm:w-auto">
                    <label htmlFor="travel-date" className="font-semibold mb-1">Travel Date</label>
                    <input
                        type="date"
                        id="travel-date"
                        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    />
                </div>
                <div className="flex flex-col w-full sm:w-auto">
                    <label htmlFor="return-date" className="font-semibold mb-1">Return Date</label>
                    <input
                        type="date"
                        id="return-date"
                        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col justify-end w-full sm:w-auto">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                        Search
                    </button>
                </div>
            </form>
            <div className="w-full sm:w-auto mt-4 sm:mt-0">
                <WeatherWidget />
            </div>
        </div>
    );
};

export default LocationAndDateChoose;
