import React from 'react'
import './index.scss'
import Movie from './Movie';
import classNames from 'classnames'
import { fetchMovies } from '../../redux/actions/movies';
import { connect } from 'react-redux'
import Pagination from 'react-paginate'
import Filter from '../Filter';

const Sort = ({ sort, dispatch }) => {
   const sortList = [
      { name: 'title', label: 'حروف الفبا' },
      { name: 'budget', label: 'هزینه ساخت' },
      { name: 'imdb_ratting_value', label: 'امتیاز IMDB' },
      { name: 'imdb_rating_count', label: 'تعداد رای دهندگان IMDB' },
      { name: 'year', label: 'سال تولید' }
   ];
   const selectedSort = sort;
   return <div className="container card">
      <div className="sorting">
         <div className="title">
            مرتب سازی
         </div>
         {sortList.map(sort => <div onClick={() => {
            dispatch(fetchMovies({ sort: sort.name, page: 1 }))
         }} className={classNames("chip", { selected: selectedSort === sort.name })}>
            {sort.label}
         </div>)}
      </div>
   </div>
}

class MoviesList extends React.Component {



   renderMovies = (movies) => {
      return movies.map(movie => <Movie key={movie.title} {...movie} />)
   }

   render() {
      const { movies = [], page = 1, number, perPage, loading } = this.props;
      const { sort } = this.props.query;

      return <React.Fragment>
         <Sort sort={sort} dispatch={this.props.dispatch} />
         <div style={{ marginTop: 16 }} className="container">

            <div className="row" style={{ direction: 'rtl' }}>

            <div className="col-12 col-md-3">
                  <Filter style={{ marginTop: 16 }} />
               </div>
               <div className="col-12 col-md-9">
                  <div style={{ display: loading ? 'block' : 'none' }} className="loading">

                  </div>
                  <div style={{ display: !loading ? 'block' : 'none' }} className="row movies">
                     {this.renderMovies(movies)}
                  </div>


               </div>


            </div>
            <Pagination forcePage={page - 1}
                     containerClassName="pagination"
                     pageRangeDisplayed={4}
                     onPageChange={(page) => {
                        this.props.dispatch(fetchMovies({ page: page.selected + 1 }))
                     }}
                     previousLabel={<span className="fa fa-angle-left" />}
                     nextLabel={<span className="fa fa-angle-right" />}
                     marginPagesDisplayed={3}
                     pageCount={Math.ceil(number / perPage)}
                     pageClassName={'pagination-item'} />
         </div>


      </React.Fragment>
   }
}

const mapStateToProps = (state) => ({ ...state.movies, ...state.comon });
export default connect(mapStateToProps)(MoviesList);