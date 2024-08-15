import React, { useEffect, useState } from 'react'

const Places = () => {
      const [place,setPlace] =useState("Bengaluru")
      const [country,setCountry] =useState("India")

        function setCirty(a){
          console.log(a)
          setPlace(a)
        }
    useEffect(()=>{
     function getCordinate () {
        var requestOptions = {
          method: 'GET',
        };
        
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${place,country}&apiKey=57d35021cff64eaaa69bee489c29f759`, requestOptions)
          .then(response => response.json())
          .then(result => getPlaces(result.features[0].bbox))
           .catch(error => console.log('error', error));
      }
      getCordinate()
       function getPlaces (coordinates) {
        console.log(coordinates)
         var requestOptions = {
          method: 'GET',
        };
        
        fetch(`https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=rect:${coordinates[0]},${coordinates[1]},${coordinates[2]},${coordinates[3]}&limit=20&apiKey=57d35021cff64eaaa69bee489c29f759`, requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
       }      
    
    },[])

  return (
    <div>
      <input className='m-2 p-2' type='text'   ></input>
      <button className='bg-red-500 m-2 p-2 rounded-lg'>Set</button>
      {console.log(place)}
    </div>
  )
}

export default Places