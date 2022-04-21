import React from 'react';
import axios from 'axios';
import Map from './Map';
import Weather from './Weather';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      city: '',
      cData: {},
      display_name: '',
      latitude: '',
      longitude:'',
      weatherData: '',
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

  //  let cityForeCast = await axios.get(
  //    `${process.env.REACT_APP_SERVER}/weather?cityInput =${this.state.city}`
  //  );

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
}

handleCityInput =(e) => {
  console.log(e.target.value);
  this.setState({
    city: e.target.value
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
         <Map 
         lat = {this.state.latitude}
         lon ={this.state.longitude}
         />
         : <p></p>
       }

    </>
  )
};
}

export default App;
