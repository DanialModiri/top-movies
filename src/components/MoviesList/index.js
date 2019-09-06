import React from 'react'
import { connect } from 'react-redux'
import { fetchMovies } from '../../redux/actions/movies';
import './index.scss'
import Movie from './Movie';

class MoviesList extends React.Component {

   componentWillMount() {
      this.props.dispatch(fetchMovies({  }))
   }

   renderMovies = (movies) => {
      return movies.map(movie => <Movie {...movie} />)
   }

   render() {
      const { movies = [] } = this.props;
      return <div className="container">
         <div className="movies">
         {this.renderMovies(movies)}
         </div>
      </div>
   }
}


const mapStateToProps = state => state.movies;
export default connect(mapStateToProps)(MoviesList);