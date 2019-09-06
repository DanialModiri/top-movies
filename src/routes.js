import MoviesList from "./components/MoviesList";
import MovieSingle from "./components/MovieSingle";


export default [
    { component: MovieSingle, path: '/movie/:title' },
    { component: MoviesList ,path: '/', breadcrumb: () => [{ title: 'فیلم', link: '/' }, { title: 'فیلمای اکشن', link: '/type/actoion' }] },
]