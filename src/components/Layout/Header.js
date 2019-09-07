import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './Header.scss'
import { connect } from 'react-redux'
import { fetchMovies } from '../../redux/actions/movies'

const Header = ({ history, dispatch }) => {
    const [search, setSearch] = useState('');
    return <header className="header">
        <div className="container">
            <h1>
                <Link title="تاپ موویز" to="/">
                    تاپ موویز
            </Link>
            </h1>

            <div className="search-box">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(fetchMovies({ q: search }))
                    history.push('/search/' + search)
                }}>
                <input onChange={(e) => {
                    setSearch(e.target.value);
                }} placeholder="جستجو در تاپ موویز" />
                <button>
                    <span className="fa fa-search"></span>
                </button>
                </form>

            </div>
        </div>

    </header>
}

//const mapStateToProps = state => state.movies;
export default withRouter(connect()(Header))