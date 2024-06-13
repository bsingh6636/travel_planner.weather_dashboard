let apiKey = 'zena45pwkQpS9psfS4rQ3xIVKlawwXCc'; // Replace with your Tomorrow.io API key
const location = '13.092,77.640'; // Replace with your latitude,longitude
const anomalyThreshold = 10; // Anomaly threshold in percentage
const units = 'imperial'; // The units of the data returned metric or imperial
const timesteps = '1d'; // The interval at which to get the data

export const getWeatherinfo = async() =>{

    
        const url = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&units=${units}&timesteps=${timesteps}&apikey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        return data.timelines.daily.map(d => ({
          date: new Date(d.time).toISOString().slice(5, 10),
          temperature: d.values.temperatureAvg,
        }));


      
//    let APIKey="f7a1b3189b72a3e4bddfec713c258cc8"
//    let  lat="13.090"
//    let long="77.640"
//    let cnt=5
//    const result =await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}`)
// const result =await fetch (`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=${cnt}&appid=${APIKey}`)
//    const res=await result.json()
//    console.log(res)

}
