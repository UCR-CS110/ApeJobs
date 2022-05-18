import React from "react";
import { AppBar, Typography, Box, Toolbar, Button } from "@mui/material";
import { User } from "tabler-icons-react";
import { Link } from "react-router-dom";
import "./NavBar.css";

// Put either in appjs so all pages have it or on every page that needs it
export const NavBar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				className="navbar"
				position="static"
				sx={{ bgcolor: "white" }}
			>
				<Toolbar>
					<Typography
						component={Link}
						to="/"
						variant="h5"
						edge="start"
						color="black"
						aria-label="menu"
						sx={{
							mr: 2,
							fontSize: "35px",
							fontFamily: "Inter",
							fontWeight: "1000",
              textDecoration: 'none'
						}}
					>
						ApeJobs
					</Typography>
					{/* probably a bad way, fix later */}
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					></Typography>
					<Button component={Link} to="/profile" color="inherit">
						<User size={35} strokeWidth={1.5} color={"black"} />
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
