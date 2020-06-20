import React, { Component } from 'react'
import selectId from "../functions/selectId";
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

class Quiz extends Component {
    
    state = {
        score: 0,
        correctAnswer:null,
        city1: null,
        city2: null,
        farenheit : false,
        keys: [],
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

    AddCities = () =>{
        let city1 =  selectId( Math.floor(Math.random()*(this.state.cities.length)), this.state.cities)
        let city2 = selectId(Math.floor(Math.random()*(this.state.cities.length)), this.state.cities)
        this.setState({checked:false})
    
        if(city1.id!==city2.id){
            this.setState({
                city1: city1,
                city1: city2,
            }) 
            this.getTemperaure(city1.city, city2.city)
        } else{
            this.AddCities()
        }
    }
    getTemperaure = (city1,city2)=>{
       
        Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=d29ad6ad880229f64cd7d50bdc31691d`)
        .then(({data})=>{
            let {city1} = this.state;
            city1.temp = Math.round((data.main.temp-273.15 + Number.EPSILON) * 100) / 100;
            city1.farenheit = Math.round(((data.main.temp - 273.15) * 9/5 + 32  + Number.EPSILON) * 100) / 100;
            this.setState({city1})
        })

        Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city2}&appid=d29ad6ad880229f64cd7d50bdc31691d`)
        .then(({data})=>{
            let {city1} = this.state;
            city1.temp = Math.round((data.main.temp-273.15 + Number.EPSILON) * 100) / 100;
            city1.farenheit = Math.round(((data.main.temp - 273.15) * 9/5 + 32  + Number.EPSILON) * 100) / 100;
            this.setState({city1}) 
        })
    }
    correctAnswer = index =>{
        let {anIndex1,anIndex2,cities,checked} = this.state;
        
        // this.state.keys.push([
        //     this.state.cities[anIndex1],
        //     this.state.cities[anIndex2],
        // ])
        if(cities[anIndex1].temp > cities[anIndex2].temp&&anIndex1===index&&!checked){
            this.setState({
                score:this.state.score+1,
                correctAnswer:index
            })
        } 
        else if(cities[anIndex1].temp < cities[anIndex2].temp&&anIndex2===index&&!checked){
            this.setState({
                score:this.state.score+1,
                correctAnswer:index
            })
        }
        this.setState({checked:true})
    }
    componentDidMount(){
        this.AddCities();
    }

    render() {
        const {score, correctAnswer, checked ,anIndex1,anIndex2,readyStart,city1Temp, city1, city2, city2Temp, farenheit} = this.state;
        return (

            <section>
                <Container maxWidth="lg" className="quiz-container">
                    <Paper className="question-section">
                        <Typography className="quiz-question" variant="h2" >Which city is hotter? </Typography>
                        <Typography variant="button" >You Score: {this.state.score} </Typography>
                    </Paper>
                    {
                        city1Temp&&city2Temp ?
                        <div className="quiz-rows">
                            <Grid className="quiz-item" item xs={4}>
                                <Card className={correctAnswer === anIndex2 ? "error" : ""} onClick={()=>{this.correctAnswer(anIndex1)}}>
                                    <CardContent>
                                        <Typography color="primary" className="quiz-city" variant="h5" component="h2">{city1.country}, {city1.city}</Typography>
                                        { checked ? <Typography className="quiz-temp" color="textSecondary" gutterBottom>{ farenheit ? city1.farenheit : city1.temp +" C"}</Typography>:""}
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid className={correctAnswer === anIndex2 ? "error quiz-item" : "quiz-item"} item xs={4}>
                                <Card onClick={()=>{this.correctAnswer(anIndex2)}}>
                                    <CardContent>
                                        <Typography color="primary" className="quiz-city" variant="h5" component="h2">{city2.country}, {city2.city}</Typography>
                                        { checked ? <Typography className="quiz-temp" color="textSecondary" gutterBottom>{ farenheit ? city2.farenheit : city2.temp +" C"}</Typography>:""}
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

export default Quiz;