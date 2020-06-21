import React, { Component } from 'react'
import {
    Typography,
    Container,
    Card,
    CardContent,
    Grid,
    Paper,
    Button
} from '@material-ui/core';

import Axios from 'axios';

import { connect } from 'react-redux';
import { setQuiz } from '../store/index';

class Quiz extends Component {
    
    state = {
        score: 0,
        correctAnswer:null,
        city1: null,
        city2: null,
        farenheit: parseInt(localStorage.getItem('units')) ? 1 : 0,
        checked: false,
        cities: [
            {
                id:0,
                country: "German",
                city: "berlin",
                temp: null,
                farenheit:null
            },
            {
                id:1,
                country: "Georgia",
                city: "Tbilisi",
                temp: null,
                farenheit:null
            },
            {
                id:2,
                country: "Japan",
                city: "Tokyo",
                temp: null,
                farenheit:null
            },
            {
                id:3,
                country: "Korea",
                city: "Seoul",
                temp: null,
                farenheit:null
            },
            {
                id:4,
                country: "United States",
                city: "Washington",
                temp: null,
                farenheit:null
            },
            {
                id:5,
                country: "United Kingom",
                city: "London",
                temp: null,
                farenheit:null
            },
            {
                id:6,
                country: "Russia",
                city: "Moscow",
                temp: null,
                farenheit:null
            },
        ]
    }
    selectId(val, array) {
        return array.find(object=>{
            return object.id === val
        })    
    }
    AddCities = () =>{
        let city1 = this.selectId(Math.floor(Math.random()*(this.state.cities.length)), this.state.cities)
        let city2 = this.selectId(Math.floor(Math.random()*(this.state.cities.length)), this.state.cities)
        this.setState({checked:false})

        
        if(city1.id!==city2.id){
            this.props.setQuiz([city1,city2])
            this.setState({city1,city2}) 
            this.getTemperature(city1, city2)
        } else{
            this.AddCities()
        }
    }
    getTemperature = (city1,city2)=>{
        Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city1.city}&appid=d29ad6ad880229f64cd7d50bdc31691d`)
        .then(({data})=>{
            city1.temp = Math.round((data.main.temp-273.15 + Number.EPSILON) * 100) / 100;
            city1.farenheit = Math.round(((data.main.temp - 273.15) * 9/5 + 32  + Number.EPSILON) * 100) / 100;
            this.setState({city1})
        })

        Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city2.city}&appid=d29ad6ad880229f64cd7d50bdc31691d`)
        .then(({data})=>{
            city2.temp = Math.round((data.main.temp-273.15 + Number.EPSILON) * 100) / 100;
            city2.farenheit = Math.round(((data.main.temp - 273.15) * 9/5 + 32  + Number.EPSILON) * 100) / 100;
            this.setState({city2}) 
        })
    }
    correctAnswer = index =>{
        
        let {city1, city2, checked} = this.state;
        if(city1.temp > city2.temp&&index===city1.id&&!checked){
            this.setState({
                score:this.state.score+1,
                correctAnswer:index
            })
        } else if(city1.temp < city2.temp&&index===city2.id&&!checked){
            this.setState({
                score:this.state.score+1,
                correctAnswer:index
            })
        }
        this.setState({checked:true})
    }
    componentWillMount(){
        this.AddCities();
    }

    
    render() {
        const {score, correctAnswer, checked , city1, city2, farenheit} = this.state;
        return (

            <section>
                <Container maxWidth="lg" className="quiz-container">
                    <Paper className="question-section">
                        <Typography className="quiz-question" variant="h2" >Which city is hotter? </Typography>
                        <Typography variant="button" >You Score: {score} </Typography>
                    </Paper>
                    {
                        city1&&city2 ?
                        <div className="quiz-rows">
                            <Grid className="quiz-item" item xs={4}>
                                <Card className={correctAnswer === city1.id && checked ? "error" : ""} onClick={()=>{this.correctAnswer(city1.id)}}>
                                    <CardContent>
                                        <Typography color="primary" className="quiz-city" variant="h5" component="h2">{city1.country}, {city1.city}</Typography>
                                        { checked ? <Typography className="quiz-temp" color="textSecondary" gutterBottom>{ farenheit ? city1.farenheit + " F" : city1.temp +" C"}</Typography>:""}
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid className="quiz-item" item xs={4}>
                                <Card className={correctAnswer === city2.id && checked ? "error" : ""} onClick={()=>{this.correctAnswer(city2.id)}}>
                                    <CardContent>
                                        <Typography color="primary" className="quiz-city" variant="h5" component="h2">{city2.country}, {city2.city}</Typography>
                                        { checked ? <Typography className="quiz-temp" color="textSecondary" gutterBottom>{ farenheit ? city2.farenheit + " F" : city2.temp +" C"}</Typography>:""}
                                    </CardContent>
                                </Card>
                            </Grid>
                        </div>:""
                    }
                    { checked ? <Button onClick={this.AddCities} className="quiz-next" size="large" variant="contained" color="primary">Next cities</Button>:""}
                </Container>
            </section>
     
    )
  }
}


const mapStateToProps = state => ({quiz: state.quiz});  
const mapDispatchToProps = {setQuiz};
const QuizContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Quiz);
export default QuizContainer;