import { useQuery } from '@tanstack/react-query';

import { api } from "../../api/api";
import { Issue, Label } from "../interfaces";

const getIssues = async (): Promise<Issue[]> => {
  // await sleep(3);
  const { data } = await api.get<Issue[]>(`/issues`);
  return data;
}

export const useIssues = () => {

  const query = useQuery(['issues'], getIssues, {
    refetchOnWindowFocus: false
  });

  return {
    query
  };
}