export const SuggestContainer = ({ suggestion, settingInputValue }) => {
    return (

        <div className='absolute mt-20  bg-gray-100 mx-2 w-max  max-h-full rounded-lg flex-col' >
            {suggestion.map((data) => {
                return (
                    <div key={data.xid} onClick={() => settingInputValue(data.airportCode)} className='flex m-2 p-2 bg-gray-300 cursor-pointer hover:bg-slate-300'>
                        <div className='bg-gray-200 p-2 mr-1 rounded-lg h-max flex justify-center items-center'>
                            <span className="text-center">{data.airportCode}</span>
                        </div>
                        <div className="text-base" >
                            <h1>{data.cityName},{data.countryName}</h1>
                            <h1>{data.airportName}</h1>
                        </div>
                      
                    </div>)
            })}
        </div>
    )
}

export default SuggestContainer;