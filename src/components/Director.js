import React, { Component } from 'react';
import { fetchMovies } from '../redux/actions/movies';
import { connect } from 'react-redux'
import MoviesList from './MoviesList'
class Director extends Component {

    componentWillMount(){
        const director = this.props.match.params.name;
        this.props.dispatch(fetchMovies({ director: director }, true))
    }

    render() {
        const { movies = [] } = this.props;
        return (<div>
            <h1 className="container">
                {this.props.match.params.name}
            </h1>
            <MoviesList movies={movies} />
        </div>);
    }
}

const mapStateToProps = state => state.movies;
export default connect(mapStateToProps)(Director);