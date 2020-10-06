import React, { useState } from "react";

import drone_logo from './drone_logo.png';
import shippiing_logo from './shipping_logo.png';
import location_logo from './location_logo.png';
import shark_logo from './shark_logo.png';
import dot from './redDot.svg';
import mapStyles from './mapStyles';

import {
  GoogleMap,
  useLoadScript,
  Marker,
	InfoWindow,
	Polyline,
	DirectionsRenderer,
} from "@react-google-maps/api";


const mapContainerStyle = {
	height: "100vh",
	width: "100vw",
};

const mapOptions = {
	// Map Style !!!
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true,
};

const renderOptions = {
	suppressMarkers:true,
}

const center = {
	lat: 37.765,
	lng: -122.5,
};

const libraries = ["places"];



// plot markers
const plotMarkers = (list, size=10, onClick=null) => (
	list.map((marker) => (
		<Marker
			key={`${marker.lat}-${marker.lng}`}
			position={{ lat: marker.lat, lng: marker.lng }}
			onClick={() => onClick(marker)}
			icon={{
				url: (marker.logo)? marker.logo: dot,
				origin: new window.google.maps.Point(0, 0),
				anchor: new window.google.maps.Point(size/2, size/2),
				scaledSize: new window.google.maps.Size(size, size),
			}}
		/>
	))
)
 
const linearInterpolation = (start, end, n=10) => {
	var points = [];
	const dt = 1/n;
	for (var t = 0; t <= 1; t += dt) {
		points.push({
			lat: start.lat * t + end.lat * (1-t),
			lng: start.lng * t + end.lng * (1-t), 
		})
	}
	return points;
}
 
// plot lines
const plotLines = (list, color='#f44336') => (
	<Polyline
		path={list}
		options={{
			strokeColor: color,
			strokeOpacity: 0.65,
			strokeWeight: 8,
			fillColor: color,
			fillOpacity: 0.5,
			clickable: false,
			draggable: false,
			editable: false,
			visible: true,
			radius: 30000,
			zIndex: 1
		}}
	/>
)

// get route from direction api
const getRoute = (origin, destination, direction, setDirection) => {
	if (direction != null && destination != null && origin != null 
		&& direction.origin.lat === origin.lat && direction.origin.lng === origin.lng
		&& direction.destination.lat === destination.lat && direction.destination.lng === destination.lng)
		return;
	
	console.log('Requesting new route!')
	var directionsService = new window.google.maps.DirectionsService();

	directionsService.route(
		{
			origin: origin,
			destination: destination,
			travelMode: window.google.maps.TravelMode.DRIVING,
		},
		(result, status) => {
			if (status === window.google.maps.DirectionsStatus.OK) {
				setDirection({
					origin:origin,
					destination:destination,
					direction:result
				})
			} else {
				console.error(`error fetching directions ${result}`);
			}
		}
	);
}

// concate routes 
const concateRoute = (option) => {
	var res = option.stationToStart.points;
	res = res.concat(option.startToEnd.points);
	return res;
}


export default function GMap(props) {

	const markers = [
		{id:'Station 1',lat:37.7749941, lng:-122.4194974, logo: shippiing_logo},
		{id:'Station 2',lat:37.75, lng:-122.45, logo: shippiing_logo},
		{id:'Station 3',lat:37.76, lng:-122.39, logo: shippiing_logo},
	];
	
	

	const [selected, setSelected] = useState(null);
	const [direction, setDirection] = useState(null);

	// Key!!!
	const useKey = [false, true][1];
  	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: (useKey)? '&key=XXXXXXXXXXXXXXXXXXXXXXX': '',
    	libraries,
	});
	
	
	if (loadError) return 'Error loading map';
	if (!isLoaded) return 'Loading Map'; 	
	
	// getRoute(markers[0], markers[1], direction, setDirection);


	var {optionIdx, pickupAddress, shipAddress} = props;
	var drone = null;
	var robot = null;
	
	var droneRoute = null;
	var robotRoute = null;

	if (props.options != null) {
		drone = props.options[0];
		droneRoute = concateRoute(drone);
		// console.log(droneRoute);

		robot = props.options[1];
		robotRoute = concateRoute(robot);
	}

	const robotRouteColor = '#2196f3';
	const droneRouteColor = '#f44336';

	var addresses = [];
	if (props.pickupAddress.lat != null && props.pickupAddress.lng != null)
		addresses.push({id:'Pick Up Here',lat:pickupAddress.lat, lng:pickupAddress.lng, logo: location_logo})

	if (shipAddress.lat != null && shipAddress.lng != null)
		addresses.push({id:'Receive Here',lat:shipAddress.lat, lng:shipAddress.lng, logo: location_logo})

	if (addresses.length > 2) 
		addresses = addresses.slice(addresses.length-2, addresses.length);

	return (
		<div>
			<GoogleMap 
				id='map'
				mapContainerStyle={mapContainerStyle}
				zoom={13.1}
				center={center}
				options={mapOptions}
				onClick={(event)=>{
						console.log('lat: '+event.latLng.lat()+' lng: '+event.latLng.lng());
					}
				}
			>
	
				{plotMarkers(markers, 50, setSelected)}

				{/* {plotMarkers(linearInterpolation(markers[1], markers[0], 15))} */}
				{(optionIdx === 0 && droneRoute != null)? plotLines(droneRoute, droneRouteColor): null} 
				{(optionIdx === 1 && robotRoute != null)? plotLines(robotRoute, robotRouteColor): null} 

				{plotMarkers(addresses, 50, setSelected)} 

				{plotMarkers([{lat:25, lng: -145, logo:shark_logo}], 200)}


				{/* { direction &&
				<DirectionsRenderer
					options={renderOptions}
					directions={direction.direction}
				/> 	
				} */}

				{selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h3>
                <span role="img" aria-label="emoji">
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