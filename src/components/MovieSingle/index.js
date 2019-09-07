import React from 'react'
import './index.scss'
import { connect } from 'react-redux';
import { fetchSingleMovie } from '../../redux/actions/movies';
import { Link } from 'react-router-dom'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


class SingleMovie extends React.Component {


    componentWillMount() {
        const title = this.props.match.params.title;
        this.props.dispatch(fetchSingleMovie(title));
    }

    render() {

        const { image, title,
            imdb_ratting_value,
            imdb_rating_count = "0000",
            summary,
            cast_list = [],
            country = [],
            language = [],
            genre = [],
            director = {}
         } = this.props.single_movie || {};
        const { loading } = this.props;

        return <div style={{ padding: '0 16px' }}>

            <div className="loading" style={{ display: loading ? 'block' : 'none' }}>
                
            </div>
            <div className="container card" style={{ display: loading ? 'none' : 'block' }}>
                <h1 className="single-movie-title">{title}</h1>
                <div className="single-movie">
                    <div className="row">
                        <div className="col-12 col-md-2">
                            <img src={image} alt={title} />
                        </div>
       
                        <div className="col-12 col-md-6 details">
                        <div className="detail-attr">
                                <span>
                                    ژانر:
                                </span>
                                <span>
                                    {genre.join(', ')}
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
                    </div>
                    <b>خلاصه:</b>
                    <p>{summary}</p>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = state => ({ ...state.movies, ...state.comon });
export default connect(mapStateToProps)(SingleMovie)
