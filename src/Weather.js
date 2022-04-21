import React from 'react';
// import ListGroup from 'react-bootstrap/ListGroup';
// import  Badge from 'react-bootstrap/Badge';



class Weather extends React.Component{
  render(){
    return(
     this.props.weatherData.map((forecast, idx)=> (
       <div key={idx}>
         <p>{forecast.date}</p>
         <p>{forecast.description}</p>

       </div>
     ) )
      
    )

    
  }
}
export default Weather;