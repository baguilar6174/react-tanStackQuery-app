import { useQuery } from '@tanstack/react-query';

import { api } from "../../api/api";
import { sleep } from '../../utils/sleep';
import { Label } from "../interfaces";

const getLabels = async (): Promise<Label[]> => {
  // await sleep(3);
  const { data } = await api.get<Label[]>(`/labels?per_page=100`);
  return data;
}

export const useLabels = () => {

  /* const query = useQuery(['labels'],getLabels, {
    refetchOnWindowFocus: false
  }); */

  const query = useQuery(['labels'],getLabels, {
    staleTime: 1000 * 60 * 60,
    // initialData: [],
    placeholderData: [
      {
        id: 791921801,
        node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
        url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
        name: "❤️",
        color: "ffffff",
        default: false,
      },
      {
        id: 1649755876,
        node_id: "MDU6TGFiZWwxNjQ5NzU1ODc2",
        url: "https://api.github.com/repos/facebook/react/labels/Component:%20Fast%20Refresh",
        name: "Component: Fast Refresh",
        color: "473bcc",
        default: false,
      }
    ]
  });

  return query;
}