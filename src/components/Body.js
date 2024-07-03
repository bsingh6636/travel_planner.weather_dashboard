import LocationAndDateChoose from "./LocationAndDateChoose"

export const Body = () =>{
    const bgImage = "https://img.freepik.com/premium-photo/bag-full-famous-monument-with-passport_250014-104.jpg?w=740";
    return(
        <div className="h-screen align-middle flex justify-center" style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            overflow: 'hidden',
            height:'screen'
        }}>

           
            <LocationAndDateChoose/>
        </div>
    )
}