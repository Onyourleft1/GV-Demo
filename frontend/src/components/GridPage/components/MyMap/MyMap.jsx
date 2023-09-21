// src/components/Map.js
import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MyMap(props) {
	const mapCenter = props.mapCenter;
	const data = props.data;
	const mapToken = process.env.REACT_APP_MAP_TOKEN;
	useEffect(() => {
		// Initialize the map
		mapboxgl.accessToken = mapToken;
		const map = new mapboxgl.Map({
			container: "map", // container ID
			style: "mapbox://styles/mapbox/streets-v11", // style URL
			center: [mapCenter[0], mapCenter[1]], // starting position [lng, lat]
			zoom: 5, // starting zoom
		});

		// Add a marker
		data.map((marker, index) =>
			new mapboxgl.Marker()
				.setLngLat([marker.LAT, marker.LNG])
				.setPopup(
					new mapboxgl.Popup().setHTML(
						`<h3 style="color:#000000;">${marker.Name}</h3>`
					)
				)
				.addTo(map)
		);

		// Clean up the map when the component unmounts
		return () => map.remove();
	}, [mapCenter]);

	return (
		<div id="map" style={{ width: "100%", height: "100%" }}>
			{/* The map will be rendered here */}
		</div>
	);
}

export default MyMap;
