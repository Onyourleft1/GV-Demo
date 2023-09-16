import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
	return (
		<div id="header_container">
			<Link to={"/"}>
				<button>Home</button>
			</Link>
		</div>
	);
}

export default Header;
