import React, { useContext, useState } from "react";
import "./GridPage.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Row from "./components/Row/Row";
import { DataContext } from "../../App";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function GridPage() {
	const [data] = useContext(DataContext);
	const [mapCenter, setMapCenter] = useState([0, 0]);
	const updateMap = (value) => {
		setMapCenter(value);
	};
	return (
		<div id="grid_container">
			<TableContainer
				style={{
					width: "90%",
					border: "2px solid white",
					borderRadius: "20px",
					padding: "1rem",
					color: "white",
				}}
			>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell style={{ color: "white" }}>ID</TableCell>
							<TableCell style={{ color: "white" }} align="left">
								Name
							</TableCell>
							<TableCell style={{ color: "white" }} align="left">
								Notes
							</TableCell>
							<TableCell style={{ color: "white" }} align="left">
								LAT
							</TableCell>
							<TableCell style={{ color: "white" }} align="left">
								LNG
							</TableCell>
							<TableCell style={{ color: "white" }} align="left">
								Edit
							</TableCell>
							<TableCell style={{ color: "white" }} align="left">
								Delete
							</TableCell>
							<TableCell style={{ color: "white" }} align="left">
								View On 2D Map
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row, index) => (
							<Row key={index} row={row} up={updateMap} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<div style={{ width: "90%", height: "600px", marginTop: "2rem" }}>
				<MapContainer
					center={mapCenter}
					zoom={13}
					style={{
						height: "100%",
						width: "100%",
						borderRadius: "20px",
					}}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					<Marker position={mapCenter}>
						<Popup>
							<img src="/logo192.png" alt="" />
						</Popup>
					</Marker>
				</MapContainer>
			</div>
		</div>
	);
}

export default GridPage;
