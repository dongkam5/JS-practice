import { useEffect,useState } from "react";
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom';
import './style.css'
function Detail(){
    const [loading,setLoading] = useState(true);
    const [movie,setMovie]=useState([]);
    const {id} = useParams();
    const getMovie = async ()=>{
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        setMovie(json.data.movie);
        setLoading(false);
    }
    useEffect(()=>{
        getMovie();
    },[])
    return (
        <div>
        {loading? <h1>Loading...</h1>:
        (<body>
        <div>
            <img id='coverImg' src={movie.background_image} alt={movie.title}></img>
            <br/>
            <br/>
            <h2>{movie.title}</h2>
            <p>{movie.description_full}</p>
            <ul>
            {movie.genres && movie.genres.map(g=>(<li key={g}>{g}</li>))}
            </ul>
        </div>
        <br/>

        <button><Link style={{
            textDecoration:'none',
            fontSize:'20px',
        }} to='/'>Back to Home</Link></button>
        </body>) 
}
        </div>
    );
}

export default Detail;