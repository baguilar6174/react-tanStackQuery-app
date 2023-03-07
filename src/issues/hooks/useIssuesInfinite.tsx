import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { api } from "../../api/api";
import { sleep } from '../../utils/sleep';
import { Issue, State } from "../interfaces";

type useIssuesProp = {
  state?: State;
  labels: string[];
}

type QueryProp = {
  pageParam?: number;
  queryKey: (string | useIssuesProp)[];
}

const getIssues = async ({ pageParam = 1, queryKey }: QueryProp): Promise<Issue[]> => {

  const [,,args] = queryKey;
  const { state, labels } = args as useIssuesProp;

  await sleep(2);
  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (labels.length > 0) {
    const labelsTransform = labels.join(',');
    params.append('labels', labelsTransform);
  }
  params.append('page', pageParam.toString());
  params.append('per_page', '5');
  const { data } = await api.get<Issue[]>(`/issues`, { params } );
  return data;
}

export const useIssuesInfinite = (props: useIssuesProp) => {

  const { state, labels} = props;

  const query = useInfiniteQuery(
    ['issues', 'infinite', { state, labels }],
    (data) => getIssues(data),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return;
        return pages.length + 1; 
      }
    }
  );

  return {
    query,
  };
}