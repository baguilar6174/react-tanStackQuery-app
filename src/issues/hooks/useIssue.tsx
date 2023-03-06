import { useQuery } from '@tanstack/react-query';

import { api } from "../../api/api";
import { sleep } from '../../utils/sleep';
import { Issue } from "../interfaces";

export const getIssue = async (number: number): Promise<Issue> => {
  await sleep(2);
  const { data } = await api.get<Issue>(`/issues/${number}`);
  return data;
}

export const getIssueComments = async (number: number): Promise<Issue[]> => {
  await sleep(2);
  const { data } = await api.get<Issue[]>(`/issues/${number}/comments`);
  return data;
}

export const useIssue = (number: number) => {

  const issueQuery = useQuery(['issue', number], () => getIssue(number), {
    refetchOnWindowFocus: false
  });

  const commentsQuery = useQuery(['issue', number, 'comments'], () => getIssueComments(number), {
    refetchOnWindowFocus: false
  });

  return {
    issueQuery,
    commentsQuery,
  };
}