import React from 'react';
import MoviesList from './MoviesList';
import { fetchMovies } from '../redux/actions/movies';
import { connect } from 'react-redux'

class Home extends React.Component {

    componentWillMount(){
        this.props.dispatch(fetchMovies({  }, true))
    }

    render(){

        return <MoviesList movies={this.props.movies} />
    }
}


const mapStateToProps = state => state.movies;
export default connect(mapStateToProps)(Home);