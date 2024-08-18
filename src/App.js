// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import { fireStoreDB } from './config/firebase-config';
import { getDocs, collection } from 'firebase/firestore';

function App() {

  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(fireStoreDB, 'movies');
  useEffect(() => {
    const getMovies = async () => {
      try {
        //READ THE DATA
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => {
          return doc.data();
        });
        console.log(filteredData);
        setMovieList(filteredData);
      } catch (error) {
        console.error(error);
      }
    }
    getMovies();
  }, [])



  return (
    <div className="App">
      <Auth></Auth>
      <div>
        {
          movieList.map((movie) => {
            return (
              <div>
                <h1>Movie Name : {movie.title}</h1>
                <h2>Released In : {movie.releaseDate}</h2>
                <h2>Won an Oscar: {movie.wonOscar ? 'Yes' : 'NO'}</h2>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
