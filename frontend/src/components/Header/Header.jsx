import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
	return (
		<div id="header_container">
			<Link to={"/"}>
				<button>Home</button>
			</Link>
			<Link to={"/Grid"}>
				<button>Grid</button>
			</Link>
		</div>
	);
}

export default Header;
