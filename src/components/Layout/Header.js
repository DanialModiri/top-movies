import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

export default () => {

    return <header className="header">
        <div className="container">
            <h1>
                <Link title="تاپ موویز" to="/">
                    تاپ موویز
            </Link>
            </h1>

            <div className="search-box">
                <input  />
                <button>
                    <span className="fa fa-search"></span>
                </button>
            </div>
        </div>

    </header>
}