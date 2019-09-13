
import MovieSingle from "./components/MovieSingle";
import Home from "./components/Home";
import Actor from "./components/Actor";
import Director from "./components/Director";
import Search from './components/Search'

export default [
    { component: Director, path: '/director/:name' },
    { component: Search, path: '/search/:q', params: (props) => props.match.params.q },
    { component: Actor, path: '/actor/:name', params: (props) => props.match.params.name },
    { component: MovieSingle, path: '/movie/:title' },
    {
        component: Home, path: '/',
        breadcrumb: () => [{ title: 'فیلم', link: '/' },
        { title: 'فیلمای اکشن', link: '/type/actoion' }]
    },
]