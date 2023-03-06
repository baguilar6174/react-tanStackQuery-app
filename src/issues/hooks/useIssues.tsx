import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { api } from "../../api/api";
import { sleep } from '../../utils/sleep';
import { Issue, State } from "../interfaces";

type useIssuesProp = {
  state?: State;
  labels: string[];
}

const getIssues = async (labels: string[] = [], state?: State, page: number = 1): Promise<Issue[]> => {
  await sleep(2);
  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (labels.length > 0) {
    const labelsTransform = labels.join(',');
    params.append('labels', labelsTransform);
  }
  params.append('page', page.toString());
  params.append('per_page', '5');
  const { data } = await api.get<Issue[]>(`/issues`, { params } );
  return data;
}

export const useIssues = (props: useIssuesProp) => {

  const { state, labels } = props;

  const [page, setPage] = useState<number>(1);

  useEffect((): void => {
    setPage(1);
  }, [state, labels])
  

  const query = useQuery(
    ['issues', { state, labels, page }],
    () => getIssues(labels, state, page),
    {
      refetchOnWindowFocus: false
    }
  );

  function nextPage(): void {
    if ( query.data?.length === 0 ) return;
    setPage(page + 1);
    // * When state changed refetch is executed automatically
    // query.refetch();
  }

  function prevPage(): void {
    if ( page > 1 ) setPage(page - 1);
  }

  return {
    query,
    page: query.isFetching ? 'Loading ...' : page,
    nextPage,
    prevPage,
  };
}