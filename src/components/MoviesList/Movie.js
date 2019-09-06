import React from 'react'
import { Link } from 'react-router-dom'
export default ({ image, title, imdbRating, imdbRatingCout, }) => {
    return <div className="movie">
        <div className="image">
            <div className="overlay">
            <h2>
            <Link to={`/movie/${title}`}>
                {title}
            </Link>
        </h2>
            </div>
            <img src={image} alt={title} />
        </div>


    </div>
}