import { useState, useEffect } from 'react';
import './App.css';

function App() {

  // the search button add to the urk endPoint
  const [endPoint, setEndPoint] = useState('')

  // has to do with the api structure 'data.d'
  const [container, setContainer] = useState([])

  const [finalPoint, setFinalPoint] = useState("")

    useEffect(() => {
      fetchMe()
      return () => {
      };
    }, [finalPoint]);


  const fetchMe = () => {

  fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=${endPoint}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b17ea89733msh92a5bbff3f3f518p138afbjsn2b1007c93b44',
      'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
  })
    .then(response => { 
      return response.json()} 
    )
    .then(data => {
      setContainer(data.d)
    })
    .catch(err => console.error(err));
  }

    const onchangehandler = (e) =>{
      setEndPoint(e.target.value)
    }

    const submithandler = (e) => {
      e.preventDefault();
      setFinalPoint(endPoint);
    }
  

  return (
    <div className="App">
     <form onSubmit={submithandler}>
      <input type="text" value={endPoint} onChange={onchangehandler}/>
      <button type='submit'>Submit</button>
     </form>

     {container.map((item) => {
      return (
        <div key={item.id}>
          <img src={item.i.imageUrl} alt={item.i.imageUrl}/>
        <p>{item.l}</p>
        </div>
      )
     })}
    </div>
  );
}

export default App;
