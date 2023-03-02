import { useQuery } from "@tanstack/react-query";

const getRandomNumberFromAPI = async(): Promise<number> => {
  const response = await fetch(`https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new`);
  const number = await response.text();
  //throw new Error(`An error has occurred`);
  return Number(number);
}

export const useRandom = () => {
  const query = useQuery(['randomNumber'], getRandomNumberFromAPI);
  return query;
}