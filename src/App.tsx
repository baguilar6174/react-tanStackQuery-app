import { useEffect, useReducer, useState } from 'react'
import './App.css'

const getRandomNumberFromAPI = async(): Promise<number> => {
  const response = await fetch(`https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new`);
  const number = await response.text();
  //throw new Error(`An error has occurred`);
  return Number(number);
}

function App(): JSX.Element {
  
  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [state, dispatch] = useReducer((x) => x + 1, 0)
  
  useEffect((): void => {
    setIsLoading(true);
    getRandomNumberFromAPI()
      .then( number => setNumber(number) )
      .catch(error => setError(error.message));
  }, [state]);

  useEffect((): void => {
    if(number) setIsLoading(false);
  }, [number]);

  useEffect((): void => {
    if(error) setIsLoading(false);
  }, [error]);

  return (
    <div className="App">
      <h1>React Query</h1>
      { isLoading ? <h2>Loading</h2> : <h2>Random Number generated:  {number}</h2> }
      { !isLoading && error && <h3>{error}</h3> }
      <button onClick={dispatch} disabled={isLoading} >
        { isLoading ? `Loading` : `Generate again` }
      </button>
    </div>
  )
}

export default App
