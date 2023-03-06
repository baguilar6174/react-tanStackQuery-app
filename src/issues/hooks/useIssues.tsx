import { useQuery } from '@tanstack/react-query';

import { api } from "../../api/api";
import { sleep } from '../../utils/sleep';
import { Issue, State } from "../interfaces";

type useIssuesProp = {
  state?: State;
  labels: string[];
}

const getIssues = async (labels: string[] = [], state?: State): Promise<Issue[]> => {
  await sleep(2);
  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (labels.length > 0) {
    const labelsTransform = labels.join(',');
    params.append('labels', labelsTransform);
  }
  params.append('page', '1');
  params.append('per_page', '5');
  const { data } = await api.get<Issue[]>(`/issues`, { params } );
  return data;
}

export const useIssues = (props: useIssuesProp) => {

  const { state, labels } = props;

  const query = useQuery(
    ['issues', { state, labels }],
    () => getIssues(labels, state),
    {
      refetchOnWindowFocus: false
    }
  );

  return {
    query
  };
}