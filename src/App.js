import React from 'react';
import axios from 'axios';
import Map from './Map';
import Weather from './Weather';
import './App.css';
import Movies from './Movies';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      city: '',
      cData: {},
      display_name: '',
      latitude: '',
      longitude:'',
      weatherData: [],
      movieData: [],
       error: false,
       errorMessage: '',
       showMap: false,
        
        }
  }


handleCitySubmit = async (e) => {
  e.preventDefault();
    try {
  let url =  `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
  let cData = await axios.get(url);
   console.log(cData.data[0]);

   
   this.setState({
    display_name: cData.data[0].display_name,
    latitude: cData.data[0].lat,
    longitude: cData.data[0].lon,
    // weatherData: 
    showMap:true,
  });

  } catch (error){
    // console.log('error: ', error.response);
    this.setState({
      error: true,
      errorMessage: `Error has Occurred: ${error.response.status}`
    })
  }
  console.log('weather')
  this.handleForecast();
  this.handleMovie();
}

handleCityInput =(e) => {
  console.log(e.target.value);
  this.setState({
    city: e.target.value
  })

}

handleForecast = async () => {
  
   let cityUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.latitude}&lon=${this.state.longitude}`;
   console.log(cityUrl)
   let weatherData = await axios.get(cityUrl);
   console.log(weatherData);
   this.setState({
     weatherData: weatherData.data
   })
}
handleMovie = async () => {
  let movieUrl = `${process.env.REACT_APP_SERVER}/movies?cityName=${this.state.city}`;
  let movieData = await axios.get(movieUrl)
  console.log(movieData)
  this.setState({
    movieData: movieData.data
  })
} 

render() {
  console.log(this.state)

  return (
    <>
    <h1>City Explorer</h1>
    <form onSubmit={this.handleCitySubmit}>
      <label> Pick a city:
        <input type="text" name="city" onInput={this.handleCityInput} />
        </label>
      <button type="submit">Explore!</button>
    </form>
    {
          this.state.error
            ?
            <p>{this.state.errorMessage}</p>
            :
            <><ul>
            {this.state.display_name}
            {this.state.latitude}
            {this.state.longitude}
          </ul></>
        }
       {
         this.state.showMap
         ?
         <>
         <Map
            lat={this.state.latitude}
            lon={this.state.longitude} />
            <Weather
            weatherData = {this.state.weatherData} />
            <Movies
            city={this.state.movieData} />
            </>
         : <p></p>
       }
       
    
       

    </>
  )
};
}

export default App;
