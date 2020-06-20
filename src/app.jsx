import React, { Component } from 'react'
import {
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton,
    Container
} from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import Quiz from "./components/quiz";


class App extends Component {
     
    render() {
        return (
            <section>
                <header >
                    <AppBar position="static">
                        <Container maxWidth="lg">
                            <Toolbar>
                                <IconButton edge="start"  color="inherit" aria-label="menu">
                                    <Settings/>
                                </IconButton>
                                <Typography variant="h6" >
                                    Settings
                                </Typography>
                            </Toolbar>
                        </Container>
                    </AppBar>
                </header>
                <main >
                    <Quiz/>
                </main>
            </section>     
    )
  }
}

export default App;