import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchMovies } from '../../redux/actions/movies';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const Movie = ({
    dispatch,
    image,
    title,
    imdb_ratting_value,
    imdb_rating_count,
    language, genre,
    country,
    director,
    cast_list, }) => {
    return <div className="col-12" style={{ padding: 0 }}>
        <div className="movie ">

            <img src={image} alt={title} />

            <article>
                <h2>
                    <Link to={`/movie/${title}`}>
                        {title}
                    </Link>
                </h2>
                <div className="details">
                    <div className="detail-attr">
                        <span>
                            ژانر:
                        </span>
                        <span style={{ display: 'flex' }} className="attr-list">
                            {genre.map(item => <span onClick={() => {
                                dispatch(fetchMovies({ genre: [item] }))
                            }}>
                                {item}
                            </span>)}
                        </span>
                    </div>
                    <div className="detail-attr">
                        <span> امتیاز IMDB:</span>
                        <span>{imdb_ratting_value}</span>
                    </div>
                    <div className="detail-attr">
                        <span>تعداد رای‌ دهندگان IMDB:</span>
                        <span>{numberWithCommas(imdb_rating_count)}</span>
                    </div>


                    <div className="detail-attr">
                        <span>کشور سازنده:</span>
                        <span>{country.join(', ')}</span>
                    </div>
                    <div className="detail-attr">
                        <span>زبان ها:</span>
                        <span>{language.join(', ')}</span>
                    </div>
                    <div className="detail-attr">
                        <span> کارگردان:</span>
                        <span><Link to={`/director/${director.name}`}>
                            {director.name}
                        </Link></span>
                    </div>
                    <div className="detail-attr">
                        <span>ستارگان:</span>
                        <ul className="stars">
                            {(cast_list).slice(0, 3).map(star => <li>
                                <Link to={`/actor/${star.name}`}>
                                    {star.name}
                                </Link>
                            </li>)}
                        </ul>
                    </div>
                </div>

            </article>

        </div>
    </div >
}

export default connect()(Movie)