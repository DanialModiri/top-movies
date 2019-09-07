import React, { Component } from 'react';
import { fetchMovies } from '../redux/actions/movies';
import MoviesList from './MoviesList';
import { connect } from 'react-redux'

class Actor extends Component {


    componentWillMount() {
        const name = this.props.match.params.name;
        this.props.dispatch(fetchMovies({ actor: name }, true));
    }

    render() {
        return (<div>
            
            <h1 className="container">
                {this.props.match.params.name}
            </h1>
            <MoviesList movies={this.props.movies} />
        </div>);
    }
}

const mapStateToProps = state => state.movies;
export default connect(mapStateToProps)(Actor);