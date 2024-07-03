export const suggestionFunction = async (data, setLoc) => {
    // console.log(data)
    if (data.length > 2) {
        const ixigoSuggestion = await fetch(`http://localhost:1234/https://www.ixigo.com/action/content/city?searchFor=airportSuggestions&value=${data}&nearByAirport=true`)
        // const ixigoSuggestion = await fetch(`https://www.ixigo.com/action/content/city?searchFor=airportSuggestions&value=${data}&nearByAirport=true`)
        const ixigoSuggestionResponse = await ixigoSuggestion.json()
        setLoc(ixigoSuggestionResponse.data.slice(0, 5))
        return ixigoSuggestion.data.slice(0,5)
    }
}