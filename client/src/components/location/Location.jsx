import './location.css'
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const Location = () => {

   const styles = {
      mapRoot: {
         height: 180,
         width: 250,
      }
   } 

   return (
      <div className='location-page'>
         <div className="location-map">
            <h2 className='location-title'>OUR LOCATION</h2>
            <div className='location-container'>
               <div className='location-direction'>
                  <p className='direction-title'>Colombia, Huila</p>
                  <p>Calle 29c #8W-03 Central</p>
                  <br/>
                  <p>In the central park next to <br/> the museum rose seven</p>
               </div>
               <div className='location-schedule'>
                  <p className='schedule-title'>Monday - Friday</p>
                  <p>06:00 AM - 10:00 PM</p>
                  <br/>
                  <p className='schedule-title'>Saturday - Sunday</p>
                  <p>08:00 AM - 08:00 PM</p>
               </div>
               <div className="map-container">
                  <MapContainer
                     style={styles.mapRoot}
                     center={[2.9488646, -75.3042927]}
                     zoom={14}
                     scrollWheelZoom={false}
                     attributionControl={false}
                  >
                     <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     />
                     <Marker position={[2.9488646, -75.3042927]}>
                        <Circle center={[2.9488646, -75.3042927]} radius={100} />
                        <Popup>
                           IceCream Shop <br/> MATIAS PIN PIN
                        </Popup>
                     </Marker>
                  </MapContainer>
               </div>
            </div>
         </div>
      </div>
   )
}
