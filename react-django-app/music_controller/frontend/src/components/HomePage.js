import { Button, ButtonGroup, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  Link,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import RoomJoinPage from "./RoomJoinPage";

const HomePage = () => {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    const fetchUserInRoom = async () => {
      try {
        const response = await fetch("/api/user-in-room");
        const data = await response.json();
        setRoomCode(data.code);
      } catch (error) {
        console.error("Error fetching user in room:", error);
      }
    };

    fetchUserInRoom();
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            roomCode ? (
              <Redirect to={`/room/${roomCode}`} />
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                  <Typography variant="h3" component="h3">
                    House Party
                  </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    color="primary"
                  >
                    <Button color="primary" component={Link} to="/join">
                      Join a Room
                    </Button>
                    <Button color="secondary" component={Link} to="/create">
                      Create a Room
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            )
          }
        />
        <Route path="/join" component={RoomJoinPage} />
        <Route path="/create" component={CreateRoomPage} />
        <Route path="/room/:roomCode" component={Room} />
      </Switch>
    </Router>
  );
};

export default HomePage;
