import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'leaflet/dist/leaflet.css';

export const Location = () => {
   const stylesExpand = {
      mapRoot: {
         height: 500,
         width: 850,
      },
   };

   const styles = {
      mapRoot: {
         height: 180,
         width: 250,
         zIndex: 0,
      },
   };

   const [map, setMap] = useState(false);

   const expandMap = (bool) => {
      setMap(bool);
   };

   return (
      <div className="location-page">
         <div className="location-map">
            <h2 className="location-title">Our location</h2>
            <div className="location-container">
               <div className="location-direction">
                  <h3 className="direction-title">Colombia, Huila</h3>
                  <p>Calle 29c #8W-03 Central</p>
                  <br />
                  <p>
                     In the central park next to <br /> the museum rose seven
                  </p>
               </div>
               <div className="location-schedule">
                  <h3 className="schedule-title">Monday - Friday</h3>
                  <p>06:00 AM - 10:00 PM</p>
                  <br />
                  <h3 className="schedule-title">Saturday - Sunday</h3>
                  <p>08:00 AM - 08:00 PM</p>
               </div>
               <div className="map-container">
                  <MapContainer
                     style={styles.mapRoot}
                     center={[4.6682979, -74.0911833]}
                     zoom={16}
                     scrollWheelZoom={true}
                     attributionControl={false}
                  >
                     <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        detectRetina={true}
                     />
                     <Marker position={[4.6682979, -74.0911833]}>
                        <Circle center={[4.6682979, -74.0911833]} radius={100} />
                        <Popup>IceCream Shop</Popup>
                     </Marker>
                  </MapContainer>
                  <button className="map-expand-btn" onClick={() => expandMap(true)}>
                     <div className="icons-container">
                        <FontAwesomeIcon icon="fa-solid fa-expand" className="icons-v2" />
                     </div>
                  </button>
               </div>

               {map && (
                  <div className="popup" onClick={() => expandMap(false)}>
                     <RemoveScroll>
                        <div
                           className="map-popup-content"
                           onClick={(e) => e.stopPropagation()}
                        >
                           <MapContainer
                              style={stylesExpand.mapRoot}
                              center={[4.6682979, -74.0911833]}
                              zoom={15}
                              scrollWheelZoom={true}
                              attributionControl={false}
                           >
                              <TileLayer
                                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                 detectRetina={true}
                              />
                              <Marker position={[4.6682979, -74.0911833]}>
                                 <Circle center={[4.6682979, -74.0911833]} radius={100} />
                                 <Popup>IceCream Shop</Popup>
                              </Marker>
                           </MapContainer>
                           <button
                              className="map-collapse-btn"
                              onClick={() => expandMap(false)}
                           >
                              <i className="bx bx-collapse-alt"></i>
                           </button>
                        </div>
                     </RemoveScroll>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
