import React, { Component } from 'react';
import {connect} from 'react-redux'
import { fetchMovies } from '../redux/actions/movies'
import MoviesList from './MoviesList'

class Search extends Component {
    
    searchKey = null;

    componentWillMount(){
        this.searchKey = this.props.match.params.q
        this.props.dispatch(fetchMovies({ q: this.searchKey }))
    }

    render() { 
        return ( <div>
            جستوجو
            <h1 className="container">{this.searchKey}</h1>
            <MoviesList movies={this.props.movies || []} />
        </div> );
    }
}

const mapStateToProps = state => state.movies;
export default connect(mapStateToProps)(Search);