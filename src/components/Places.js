import React, { useEffect } from 'react'

const places = () => {
      //placesApi
    useEffect(()=>{
          //placesApi
    var requestOptions = {
      method: 'GET',
    };
    
    fetch("https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=rect%3A10.716463143326969%2C48.755151258420966%2C10.835314015356737%2C48.680903341613316&limit=20&apiKey=57d35021cff64eaaa69bee489c29f759", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    },[])
  return (
    <div>places</div>
  )
}

export default places