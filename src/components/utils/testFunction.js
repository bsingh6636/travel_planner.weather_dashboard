export const autoSuggest = async (prefix) => {

    const requestBody = JSON.stringify({ Prefix: prefix });

    const apiUrl = 'https://www.easemytrip.com/api/Flight/GetAutoSuggest';
    //http://localhost:3001/

    try {
        const response = await fetch("https://travel-planner-weather-dashboard-mosd.vercel.app/" + apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Origin": "'https://www.easemytrip.com"
            },
            body: requestBody
        })
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        const data = await response.json();
        
        if (data.length > 0) {
            if (data.length > 4) {
                return data.slice(0, 4)

            } else {
                return data
            }
        } else {
            throw new Error('No suggestion was found')
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }


}

export const test2 = async () => {
    console.log("Test2")
    const ticketURL = 'http://localhost:3001/https://www.ixigo.com/api/v2/graphs/data/new?origin=BLR&destination=KTM&class=e&startDate=06062024&endDate=06062025&currency=INR'
    const tc = await fetch(ticketURL)
    const json = await tc.json()
    console.log(json)
}
