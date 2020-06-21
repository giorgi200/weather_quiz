import React, { Component } from 'react';
import {
    Typography,
    Container,
    Card,
    CardContent,
    Grid,
    Paper,
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
                <Container maxWidth="lg" >
                    <Paper className="settings-container" >
                        <Typography variant="h5" >Settings</Typography>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Units</FormLabel>
                            <RadioGroup value={this.state.units} onChange={this.handleRadio}>
                                <FormControlLabel value={0} control={<Radio color="primary" />} label="Celsius" />
                                <FormControlLabel value={1} control={<Radio color="primary" />} label="Farenheit" />
                            </RadioGroup>
                        </FormControl>
                        <section className="answerd-quizzes-sect">
                            {
                                this.props.quiz.map(({city1,city2,chosen},i)=>{
                                    return(
                                        <div className="answerd-quizzes" key={i}>    
                                            <Grid className="quiz-item" item xs={6} xl={3}>
                                                <Card className={chosen === city1.id ? city1.temp>city2.temp ? "quiz-card error": "quiz-card incorrect" :"quiz-card"}>
                                                    <CardContent>
                                                        <Typography color="textSecondary" className="quiz-city" variant="h5" component="h2">{city1.country}, {city1.city}</Typography>
                                                        <Typography className="quiz-temp" color="textSecondary" gutterBottom>{ this.state.units ? city1.farenheit + " F" : city1.temp +" C"}</Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid className="quiz-item" item xs={6} xl={3}>
                                                <Card className={chosen === city2.id ? city2.temp>city1.temp ? "quiz-card error": "quiz-card incorrect" :"quiz-card"}>
                                                    <CardContent>
                                                        <Typography color="textSecondary" className="quiz-city" variant="h5" component="h2">{city2.country}, {city2.city}</Typography>
                                                        <Typography className="quiz-temp" color="textSecondary" gutterBottom>{ this.state.units ? city2.farenheit + " F" : city2.temp +" C"}</Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </div>
                                    )
                                })
                            }    
                        </section>
                        
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