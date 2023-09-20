import React, { useContext, useState } from "react";
import "./Form.scss";
import { CoordinatesContext, PopContext } from "../../Homepage";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function Form() {
	const [, setPop] = useContext(PopContext);
	const [mapCenter] = useContext(CoordinatesContext);
	const [name, setName] = useState("");
	const [notes, setNotes] = useState("");

	const handleChange = (e) => {
		if (e.target.name === "Name") {
			setName(e.target.value);
		}
		if (e.target.name === "Notes") {
			setNotes(e.target.value);
		}
	};

	const save = (e) => {
		e.preventDefault();
		const uuid = uuidv4();

		const data = {
			Id: uuid,
			Name: name,
			Notes: notes,
			LAT: mapCenter[0],
			LNG: mapCenter[1],
		};
		axios
			.post("/api/addLocation", data)
			.then((response) => {
				console.log(response.data.message);
				setPop(false);
			})
			.catch((error) => {
				console.log(error.response.data.message);
			});
	};
	return (
		<form id="form_container" onSubmit={save}>
			<div id="close">
				<button
					onClick={(e) => {
						e.preventDefault();
						setPop(false);
					}}
				>
					X
				</button>
			</div>
			<div>
				<label>LAT: {mapCenter[0]}</label>
				<label>LNG: {mapCenter[1]}</label>
			</div>
			<div>
				<label>Name: </label>
				<input type="text" onChange={handleChange} value={name} name="Name" />
			</div>
			<div>
				<label>Notes: </label>
				<input type="text" onChange={handleChange} value={notes} name="Notes" />
			</div>
			<button id="save" type="submit">
				Save
			</button>
			{/* <input type="number" name="LAT" id="" />
            <input type="number" name="LNG" id="" /> */}
		</form>
	);
}

export default Form;
