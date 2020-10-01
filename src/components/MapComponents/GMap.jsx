import React from "react";

import drone_logo from './drone_logo.png';
import shippiing_logo from './shipping_logo.png';
import location_logo from './location_logo.png';
import shark_logo from './shark_logo.png';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import mapStyles from './mapStyles';


const mapContainerStyle = {
	height: "100vh",
	width: "100vw",
};

const options = {
	// Map Style !!!
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true,
};

const center = {
	lat: 37.765,
	lng: -122.5,
};

const libraries = ["places"];

export default function GMap() {
	// Key!!!
	const useKey = [false, true][0];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: (useKey)? '&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXX': '',
    libraries,
	});

	const markers = [
		{id:'Station 1',lat:37.774929, lng:-122.419418, logo: shippiing_logo},
		{id:'Station 2',lat:37.75, lng:-122.45, logo: shippiing_logo},
		{id:'Station 3',lat:37.76, lng:-122.39, logo: shippiing_logo},
		{id:'Shipping Address',lat:37.76, lng:-122.43, logo: location_logo},
		{id:'drone',lat:37.75, lng:-122.39, logo: drone_logo},
		
 ];

 	const [selected, setSelected] = React.useState(null);
 	

	if (loadError) return 'Error loading map';
	if (!isLoaded) return 'Loading Map'; 

	return (
		<div>
			<GoogleMap 
				id='map'
				mapContainerStyle={mapContainerStyle}
				zoom={13}
				center={center}
				options={options}
				onClick={(event)=>{
						console.log('lat: '+event.latLng.lat()+' lng: '+event.latLng.lng());
					}
				}
			>

				{markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: marker.logo,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
							scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        ))}

					<Marker 
						key='Easter Egg'
						position={{lat:25, lng: -145}}
						icon={{
							url: shark_logo,
							scaledSize: new window.google.maps.Size(200, 200),
						}}
					/>

				{selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h3>
                <span role="img" aria-label="bear">
								😜😏😝🙄😆
                </span>{" "}
                
              </h3>
              <p> This is the {selected.id}.</p>
            </div>
          </InfoWindow>
        ) : null}

			</GoogleMap>
		</div>
	);

} 