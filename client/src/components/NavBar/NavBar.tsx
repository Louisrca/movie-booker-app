import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom"; // Si tu utilises react-router pour la navigation

export const NavBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container>
          {/* Logo ou titre */}
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            Mon Application
          </Typography>

          {/* Liens de navigation */}
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/booking">
            Réservation
          </Button>
          {/* <Button color="inherit">Logout</Button> */}
        </Container>
      </Toolbar>
    </AppBar>
  );
};
