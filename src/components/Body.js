import LocationAndDateChoose from "./LocationAndDateChoose"
import SuggestedPLaces from "./SuggestedPLaces";
// import Places from "./Places";

export const Body = () =>{
    const bgImage = "https://img.freepik.com/premium-photo/bag-full-famous-monument-with-passport_250014-104.jpg?w=740";
    return(
        <div className="flex flex-col items-center" style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            overflow: 'hidden',
            height:'screen'
        }}>

           
            <LocationAndDateChoose/>
            {/* <Places/> */}
            <SuggestedPLaces/>
        </div>
    )
}