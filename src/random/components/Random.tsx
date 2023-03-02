import { useRandom } from "../hooks/useRandom";

export const RandomComponent = (): JSX.Element => {

  const { isLoading, data, isError, error, refetch, isFetching } = useRandom();

  return (
    <div className="container d-flex align-items-center justify-content-center text-center" style={{ height: '100vh' }} >
      <div>
        <h1 className="mb-4" >React Query</h1>
        { isFetching ? <h2>Loading</h2> : <h2>Random Number generated:  {data}</h2> }
        { !isLoading && isError && <h3>{ `${error}` }</h3> }
        <button  className="btn btn-light mt-4" onClick={() => refetch()} disabled={isFetching} >
          { isFetching ? `Loading` : `Generate again` }
        </button>
      </div>
    </div>
  )
}
