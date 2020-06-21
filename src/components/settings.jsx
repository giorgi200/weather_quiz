import React, { Component } from 'react';
import {
    Typography,
    Container,
    Card,
    CardContent,
    Grid,
    Paper,
    Button,
    FormControl,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Radio
} from '@material-ui/core';

import { connect } from 'react-redux';

class settings extends Component {
    state={
        units: parseInt(localStorage.getItem('units')) ? 1 : 0
    }
    handleRadio = val=>{
        let units = parseInt(val.target.value);
        this.setState({units});
        localStorage.setItem('units', units)
    }
    render() {
        return (
            <section>
                {console.log(this.props.quiz)}
                <Container maxWidth="lg" >
                    <Paper className="settings-container" >
                        <Typography variant="h5" >Settings</Typography>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Units {this.state.units} </FormLabel>
                            <RadioGroup value={this.state.units} onChange={this.handleRadio}>
                                <FormControlLabel value={0} control={<Radio color="primary" />} label="Celsius" />
                                <FormControlLabel value={1} control={<Radio color="primary" />} label="Farenheit" />
                            </RadioGroup>
                        </FormControl>
                    </Paper>
                </Container>
                
            </section>
        );
    }
}

const mapStateToProps = state => ({quiz: state.quiz});  
const settingsContainer = connect(
    mapStateToProps
)(settings);


export default settingsContainer;