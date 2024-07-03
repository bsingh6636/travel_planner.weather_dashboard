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

export default SuggestContainer;