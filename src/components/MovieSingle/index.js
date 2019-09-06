import React from 'react'
import './index.scss'
import { connect } from 'react-redux';
import { fetchSingleMovie } from '../../redux/actions/movies';

class SingleMovie extends React.Component {


    componentWillMount(){
        const title = this.props.match.params.title;
        this.props.dispatch(fetchSingleMovie(title));
    }

    render() {

        const { image, title, imdbRatting, imdbRattingCount, year } = this.props.single_movie || {};

        return <div className="container single-movie">
            <div className="image-title">
                <h1>{title}</h1>
                <img src={image} alt={title} />
            </div>
            <div className="details">
                <div className="detail-attr">
                    <span>امتیاز IMDB</span>
                    <span>{imdbRatting}</span>
                </div>
                <div className="detail-attr">
                    <span>تعداد رای‌دهندگان IMDB</span>
                    <span>{imdbRattingCount}</span>
                </div>
                <div className="detail-attr">
                    <span>سال</span>
                    <span>{year}</span>
                </div>
            </div>

        </div>
    }
}

const mapStateToProps = state => state.movies;
export default connect(mapStateToProps)(SingleMovie)
