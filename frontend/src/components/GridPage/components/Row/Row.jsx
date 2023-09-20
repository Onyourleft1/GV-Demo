import { TableCell, TableRow } from "@mui/material";
import React, { useContext, useState } from "react";
import { DataContext } from "../../../../App";
import "./Row.scss";
import axios from "axios";

function Row(props) {
	const [data, updateData] = useContext(DataContext);
	let tempD = data;
	const row = props.row;
	const [editable, setEditable] = useState(false);
	const [rowInfo, setRowInfo] = useState({
		Id: row.Id,
		Name: row.Name,
		Notes: row.Notes,
		LAT: row.LAT,
		LNG: row.LNG,
	});
	const handleChange = (e) => {
		if (e.target.name === "Name") {
			setRowInfo({ ...rowInfo, Name: e.target.value });
		}
		if (e.target.name === "Notes") {
			setRowInfo({ ...rowInfo, Notes: e.target.value });
		}
		if (e.target.name === "LAT") {
			setRowInfo({ ...rowInfo, LAT: e.target.value });
		}
		if (e.target.name === "LNG") {
			setRowInfo({ ...rowInfo, LNG: e.target.value });
		}
	};
	const save = (e) => {
		e.preventDefault();
		let ent = tempD.find((entry) => entry.Id === rowInfo.Id);
		ent.Name = rowInfo.Name;
		ent.Notes = rowInfo.Notes;
		ent.LAT = rowInfo.LAT;
		ent.LNG = rowInfo.LNG;
		updateData(tempD);
		axios
			.put("/api/updateLocation", { id: rowInfo.Id, updatedRowData: ent })
			.then((response) => {
				console.log(response.data.message);
			})
			.catch((error) => {
				console.log(error.response.data.error);
			});

		setEditable(false);
	};
	const deleteLocation = (e) => {
		e.preventDefault();
		axios
			.post("/api/deleteLocation", { id: rowInfo.Id })
			.then((response) => {
				console.log(response.data.message);
			})
			.catch((error) => {
				console.log(error.response.data.error);
			});
	};
	return (
		<TableRow
			id="row_container"
			sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
		>
			<TableCell style={{ color: "white" }} component="th" scope="row">
				{rowInfo.Id}
			</TableCell>
			<TableCell style={{ color: "white" }} align="left">
				{editable ? (
					<input
						type="text"
						name="Name"
						value={rowInfo.Name}
						onChange={handleChange}
					/>
				) : (
					rowInfo.Name
				)}
			</TableCell>
			<TableCell style={{ color: "white" }} align="left">
				{editable ? (
					<input
						type="text"
						name="Notes"
						value={rowInfo.Notes}
						onChange={handleChange}
					/>
				) : (
					rowInfo.Notes
				)}
			</TableCell>
			<TableCell style={{ color: "white" }} align="left">
				{editable ? (
					<input
						type="text"
						name="LAT"
						value={rowInfo.LAT}
						onChange={handleChange}
					/>
				) : (
					rowInfo.LAT
				)}
			</TableCell>
			<TableCell style={{ color: "white" }} align="left">
				{editable ? (
					<input
						type="text"
						name="LNG"
						value={rowInfo.LNG}
						onChange={handleChange}
					/>
				) : (
					rowInfo.LNG
				)}
			</TableCell>
			<TableCell style={{ color: "white" }} align="left">
				{editable ? (
					<button onClick={save} className="save_btn">
						<img src="/assets/icons/save.svg" width={"24px"} alt="" />
					</button>
				) : (
					<button
						onClick={(e) => {
							e.preventDefault();
							setEditable(true);
						}}
						className="edit_btn"
					>
						<img src="/assets/icons/edit.svg" width={"24px"} alt="" />
					</button>
				)}
			</TableCell>
			<TableCell style={{ color: "white" }} align="left">
				<button onClick={deleteLocation} className="edit_btn">
					<img src="/assets/icons/delete.svg" width={"24px"} alt="" />
				</button>
			</TableCell>
		</TableRow>
	);
}

export default Row;
