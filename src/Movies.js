import React from 'react';
import  Badge  from 'react-bootstrap/Badge';



class Movies extends React.Component{
  render(){
    return(
      <div key={this.props.id}>
          {this.props.title}  
          <Badge>
            {this.props.popularity}
          </Badge>
          
            <img src={`https://image.tmdb.org/t/p/w200${this.props.posterPath}`} alt={this.props.title} />
            {this.props.overview}
                </div>
    )

    
  }
}
export default Movies;