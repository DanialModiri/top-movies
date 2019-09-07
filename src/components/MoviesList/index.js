import React from 'react'
import './index.scss'
import Movie from './Movie';
import classNames from 'classnames'
import { fetchMovies } from '../../redux/actions/movies';
import { connect } from 'react-redux'

const Sort = ({ sort, dispatch }) => {
   const sortList = [
      { name: 'title', label: 'حروف الفبا' },
      { name: 'budget', label: 'هزینه ساخت' },
      { name: 'imdb_ratting_value', label: 'امتیاز IMDB' },
      { name: 'imdb_rating_count', label: 'تعداد رای دهندگان IMDB' }
   ];
   const selectedSort = sort;
   return <div className="container card">
      <div className="sorting">
         <div className="title">
            مرتب سازی
      </div>
         {sortList.map(sort => <button onClick={() => {
            dispatch(fetchMovies({ sort: sort.name }))
         }} className={classNames("chip", { selected: selectedSort === sort.name })}>
            {sort.label}
         </button>)}
      </div>
   </div>
}

class MoviesList extends React.Component {
   renderMovies = (movies) => {
      return movies.map(movie => <Movie key={movie.title} {...movie} />)
   }

   render() {
      const { movies = [], } = this.props;
      const { sort } = this.props.query;

      return <React.Fragment>
         <Sort sort={sort} dispatch={this.props.dispatch} />
         <div style={{ marginTop: 16 }} className="container card">
            <div className="movies row">
               {this.renderMovies(movies)}
            </div>
         </div>
      </React.Fragment>
   }
}

const mapStateToProps = (state) => state.movies;
export default connect(mapStateToProps)(MoviesList);