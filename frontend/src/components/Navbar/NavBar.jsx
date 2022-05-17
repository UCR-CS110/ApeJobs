// import * as React from "react";
import {
	AppBar,
	Typography,
	Box,
	Toolbar,
	Button,
} from "@mui/material";
import { User } from "tabler-icons-react";
import { Link } from 'react-router-dom';
import "./NavBar.css"

export const NavBar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar className="navbar" position="static" sx={{ bgcolor: "white" }}>
				<Toolbar>
				<Typography
						variant="h5"
						edge="start"
						color="black"
						aria-label="menu"
						sx={{ mr: 2 , fontSize: "35px", fontFamily: "Inter", fontWeight:"1000"}}
					>
						ApeJobs
					</Typography>
					{/* probably a bad way, fix later */}
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
					</Typography>
					<Button component={Link} to="/signin" color="inherit" >
						<User size={35} strokeWidth={1.5} color={"black"} />
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
