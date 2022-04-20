import React from "react";
  import  Card  from "react-bootstrap/Card";
import Image from 'react-bootstrap/Image'


class Map extends React.Component {
  render () {
    let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.props.lat},${this.props.lon}&zoom=12`;
   console.log(mapUrl)
    return (
      // <Card>
      //   <Card.Img variant="top" 
      //   src={mapUrl}
      //   alt={this.props.city.display_name} />
      //   <Card.Title>{this.props.city.display_name}</Card.Title>
      //   <Card.Body>
      //     <Card.Text>Longitude: {this.props.city.lon}</Card.Text>
      //     <Card.Text>Latitude: {this.props.city.lat}</Card.Text>
      //   </Card.Body>
      // </Card>
      <Image src={mapUrl}/>
    )
  
  }
}

export default Map