import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Filter.scss'
import { fetchMovies } from '../redux/actions/movies';
import Axios from 'axios';

const Checkbox = ({ onChange, name, checked }) => {

    return <div className="checkbox">
        <input id={name} type="checkbox" checked={checked} onChange={(e) => {
            onChange(e.target.checked);
        }} />
        <label htmlFor={name}>
            <span className="checkicon fa fa-check" />
        </label>
    </div>
}

const Checklist = ({ title, list, onChange, value }) => {

    const [open, setOpen] = React.useState(false);

    return <div className="check-list">
        <header onClick={() => {
            setOpen(!open)
        }}>
            <p>{title}</p>
            <span className="fa fa-angle-left" style={{ transform: open ? 'Rotate(-90deg)' : null }}></span>
        </header>

        <ul style={{ height: !open ? 0 : null }}>
            {list.map(item => <li id={item.name} key={item.name}>
                <label>{item.label}</label>
                <Checkbox name={item.name + title}
                    checked={(value || []).includes(item.name)}
                    onChange={(check) => {
                        if (check)
                            onChange((value || []).concat(item.name))
                        else {
                            const copy = [...(value || [])];
                            const index = copy.findIndex(v => v === item.name);
                            copy.splice(index, 1)
                            onChange(copy);
                        }
                    }} />

            </li>)}
        </ul>
    </div>
}

const languages = [
    { label: 'English', name: 'English' },
    { label: 'French', name: 'French' },
    { label: 'Russian', name: 'Russian' }
]

const countries = [
    { label: 'امریکا', name: 'USA' },
    { label: 'انگلستان', name: 'UK' },
    { label: 'ایتالیا', name: 'Italy' }
]

const genre = [
    { label: 'اکشن', name: 'Action' },
    { label: 'درام', name: 'Drama' },
    { label: 'ماجراجویی', name: 'Adventure' }
]

const filters = [
    { list: genre, title: 'ژانر', name: 'genre' },
    { list: countries, title: 'کشور سازنده', name: 'country' },
    { list: languages, title: 'زبان', name: 'languages' }
]

class Filter extends Component {


    state = {
        filters: []
    }

    componentWillMount() {
        Axios.get('/filters').then(res => {
            this.setState({
                filters: Object.keys(res.data).map(item => ({
                    title: item, name: item,
                    list: res.data[item].map(filter => ({ label: filter, name: filter }))
                }))
            })
        }).catch(err => {

        })
    }

    onCheckListChange = (name) => (newValue) => {
        this.props.dispatch(fetchMovies({ [name]: newValue }))
    }

    render() {

        return <div className="container" style={{ display: 'flex', direction: 'rtl', flexWrap: 'wrap' }}>
            {this.state.filters.map(filter => {
                console.log(this.props.query[filter.name])
                return <Checklist
                    key={filter.name}
                    title={filter.title}
                    list={filter.list}
                    onChange={this.onCheckListChange(filter.name)}
                    value={this.props.query[filter.name]} />
            })}
        </div>
    }
}

const mapStateToProps = state => state.movies;
export default connect(mapStateToProps)(Filter)