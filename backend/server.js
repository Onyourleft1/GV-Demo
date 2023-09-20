const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const db = new sqlite3.Database(
	"./GVTLOCATIONS.db",
	sqlite3.OPEN_READWRITE,
	(err) => {
		if (err) {
			return console.log(err);
		}
		console.log("Connection to DB Successful!!");
	}
);

// db.run("CREATE TABLE LOCATIONS_GVT(Id, Name, Notes, LAT, LNG) ");
app.get("/api/data", (req, res) => {
	const sql = `SELECT * FROM LOCATIONS_GVT`;
	db.all(sql, [], (err, rows) => {
		if (err) {
			return res.status(404).json({ error: "Error fetching Locations" });
		}
		return res.send(rows);
	});
});

app.post("/api/addLocation", (req, res) => {
	const { Id, Name, Notes, LAT, LNG } = req.body;

	const sql = `INSERT INTO LOCATIONS_GVT(Id, Name, Notes, LAT, LNG)
				VALUES(?,?,?,?,?)`;
	db.run(sql, [Id, Name, Notes, LAT, LNG], (err) => {
		if (err) {
			return res.status(404).json({ error: "Location Not Added" });
		}
		return res.json({ message: "Location Added" });
	});
});

// app.put("/api/updateLocation", (req, res) => {
// 	const { newValue } = req.body;
// 	db.run(
// 		"UPDATE LOCATIONS_GVT SET column_to_edit = ? WHERE Id = ?",
// 		[newValue, newValue.Id],
// 		(err) => {
// 			if (err) {
// 				console.error(err.message);
// 				return res.status(500).json({ error: "Internal Server Error" });
// 			}
// 			return res.json({ message: "Row updated successfully" });
// 		}
// 	);
// });
app.put("/api/updateLocation", (req, res) => {
	const { id, updatedRowData } = req.body;

	// Build the SQL query dynamically to update all columns
	const columns = Object.keys(updatedRowData);
	const values = Object.values(updatedRowData);

	const updateQuery = `
	  UPDATE LOCATIONS_GVT
	  SET ${columns.map((column) => `${column} = ?`).join(", ")}
	  WHERE Id = ?`;

	values.push(id);

	db.run(updateQuery, values, (err) => {
		if (err) {
			console.error(err.message);
			return res.status(500).json({ error: "Internal Server Error" });
		}
		return res.json({ message: "Row updated successfully" });
	});
});

app.post("/api/deleteLocation", (req, res) => {
	const { id } = req.body;

	db.run("DELETE FROM LOCATIONS_GVT WHERE Id = ?", [id], (err) => {
		if (err) {
			console.error(err.message);
			return res.status(500).json({ error: "Internal Server Error" });
		}
		return res.json({ message: "Row deleted successfully" });
	});
});

// db.close((err) => {
// 	if (err) {
// 		console.log(err);
// 	}
// });

const port = 5000;
app.listen(port, () => {
	console.log(`Server Running On: http://localhost:${port}`);
});
