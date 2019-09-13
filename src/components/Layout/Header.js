import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './Header.scss'
import { connect } from 'react-redux'
import Axios from 'axios';
import classNames from 'classnames'


const cancelSource = Axios.CancelToken.source();

class Header extends React.Component {


    state = {
        search: '',
        searchFocus: false,
        searchResult: [],
        selectedResult: null //should be index
    }

    searchChange = (e) => {
        this.setState({ search: e.target.value, selectedResult: null })
        //cancelSource.cancel();
        if(this.state.search.length <= 1)
            return
        Axios.get(`/actor/${e.target.value}`, {
            cancelToken: cancelSource.token
        }).then(res => {
            this.setState({ searchResult: res.data })
        }).catch(err => {
            if (Axios.isCancel(err))
                console.log('Request Canceled')
        });
    }

    searchFocus = () => {
        this.setState({ searchFocus: true })
    }

    searchBlur = () => {
        this.setState({ searchFocus: false })
    }

    searchResultClick = (index) => {
        this.setState({ selectedResult: index })
    }

    onSearchInputKeyDown = (e) => {
        let newSelected = 0;
        if (this.state.searchResult.length > 0 && this.state.selectedResult === null) {
            return this.setState({ selectedResult: newSelected })
        }
        //arrow down
        if (e.keyCode === 40) {
            if (this.state.selectedResult !== this.state.searchResult.length - 1)
                newSelected = this.state.selectedResult + 1;
        }
        //arrow up
        else if (e.keyCode === 38) {
            if (this.state.selectedResult === 0)
                newSelected = this.state.searchResult.length - 1;
            else
                newSelected = this.state.selectedResult - 1;
        }
        else if (e.keyCode === 13) {
            console.log('HiT enter')
            if (this.state.searchResult.length === 0 || this.state.selectedResult === null)
                return this.props.history.push(`/search/${this.state.search}`)
            newSelected = this.state.selectedResult;
            this.props.history.push(`/actor/${this.state.searchResult[this.state.selectedResult].name}`);
        }
        this.setState({ selectedResult: newSelected })
    }

    render() {
        return <header className="header">
            <div className="container">
                <h1>
                    <Link title="تاپ موویز" to="/">
                        تاپ موویز
            </Link>
                </h1>

                <div className="search-box-mobile">
                    <button>
                        <span className="fa fa-search"></span>
                    </button>
                </div>
                <div className="search-box">
                    <ul className="search-result" style={{ opacity: this.state.searchFocus ? 1 : 0 }}>
                        {this.state.searchResult.map((item, index) => <li className={classNames({
                            selected: index === this.state.selectedResult
                        })} key={item.id}>
                            <Link onClick={() => this.searchResultClick(index)} to={`/actor/${item.name}`}>
                                {item.name}
                            </Link>
                        </li>)}
                    </ul>
                        <input
                            onKeyDown={this.onSearchInputKeyDown}
                            value={this.state.search}
                            onChange={this.searchChange}
                            onFocus={this.searchFocus}
                            onBlur={this.searchBlur}
                            placeholder="جستجو در تاپ موویز"
                        />

                        <button>
                            <span className="fa fa-search"></span>
                        </button>

                </div>
            </div>

        </header>
    }
}

//const mapStateToProps = state => state.movies;
export default withRouter(connect()(Header))