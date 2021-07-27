import React, {useEffect, useState, useCallback} from 'react';
import ReactMapGL, { Marker, GeolocateControl, FlyToInterpolator } from "react-map-gl";
import ControlPanel from '../ControlPanel';
import CITIES from '../cities.json';

const Mapbox = () => {

  const geolocateStyle = {
    top: 0,
    left: 0,
    margin: 10
  };
const positionOptions = {enableHighAccuracy: true};

  useEffect(() =>{
    navigator.geolocation.getCurrentPosition(function(position) {
      setViewport({
        ...viewport, 
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  });

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 15,
    width: "100vw",
    height: "75vh",
    bearing: 0,
    pitch: 30
  });

  const onSelectCity = useCallback(({longitude, latitude}) => {
    setViewport({
      longitude,
      latitude,
      zoom: 11,
      transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
      transitionDuration: 'auto'
    });
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/bhnprksh222/ckd77zqx6012m1jrosf6e06ks"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <GeolocateControl
        style={geolocateStyle}
        positionOptions={positionOptions}
        trackUserLocation
        auto
      />
      <ControlPanel onSelectCity={onSelectCity} />
      {
        CITIES.map((city, index) => (
          <Marker key={index} latitude={city.latitude} longitude={city.longitude} offsetLeft={-20} offsetTop={-10}>
            <svg
              style={{
                height: `30px`,
                width: `30px`,
              }}
              version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
              <g>
                <g>
                  <path fill="#a34adb" d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                    c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                    c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                </g>
              </g>
            </svg>
          </Marker>
        ))
      }
    </ReactMapGL>
  )
}

export default Mapbox
