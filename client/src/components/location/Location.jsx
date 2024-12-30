import './location.css'
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const Location = () => {

   const styles = {
      mapRoot: {
         height: 250,
         width: 500,
      }
   } 

   return (
      <>
         <div className="location-map">
            <h1>OUR LOCATION</h1>
            <div className="map-container">
               <MapContainer
                  style={styles.mapRoot}
                  center={[2.9488646, -75.3042927]}
                  zoom={14}
                  scrollWheelZoom={false}
               >
                  <TileLayer
                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[2.9488646, -75.3042927]}>
                     <Circle center={[2.9488646, -75.3042927]} radius={300} />
                     <Popup>
                        IceCream Shop <br/> MATIAS PIN PIN
                     </Popup>
                  </Marker>
               </MapContainer>


            </div>
         </div>
      </>
   )
}
