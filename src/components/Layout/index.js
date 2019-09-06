import React from 'react'
import Header from './Header'
import {Link} from 'react-router-dom'
import './index.scss'

export default ({ children, breadcrumb = [] }) => {

    return <React.Fragment>
        <Header />
        <div className="container">
        <ul className="breadcrumb">
            {breadcrumb.map(item => <li>
                <Link to={item.link}>
                    {item.title}
                </Link>
            </li>)}
        </ul>
        </div>

        {children}
    </React.Fragment>
}