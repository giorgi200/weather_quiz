import React, { Component } from 'react'
import {
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton,
    Container
} from '@material-ui/core';
import { Settings, ArrowBackIosRounded } from '@material-ui/icons';

import Quiz from "./components/quiz";
import Setting from "./components/settings";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  
class App extends Component {
    render() {
        return (
            <Router>
                <section>
                    <header >
                        <AppBar position="static">
                            <Container maxWidth="lg">
                                <Toolbar>
                                    <Link className="header-link"  color="inherit" to="/settings">
                                        <IconButton edge="start"  color="inherit" aria-label="menu">
                                            <Settings/>
                                        </IconButton>
                                        <Typography variant="h6" >Settings</Typography>
                                    </Link>
                                </Toolbar>
                            </Container>
                        </AppBar>
                    </header>
                    <main >
                        <Switch>
                            <Route exact path="/">
                                <Quiz/>
                            </Route>
                            <Route exact path="/settings">
                                <Setting/>
                            </Route>
                        </Switch>
                    </main>
                </section>     
            </Router>
        )
    }
}

export default App;