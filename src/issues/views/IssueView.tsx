import { Link, Navigate, useParams } from 'react-router-dom';
import { IssueComment } from '../components/IssueComment';
import { Loading } from '../components/Loading';
import { useIssue } from '../hooks/useIssue';

export const IssueView = (): JSX.Element => {

  const params = useParams();
  const { id = '0' } = params;
  const { issueQuery, commentsQuery } = useIssue(Number(id));

  if (issueQuery.isLoading) return <Loading/>;

  if (!issueQuery.data) return <Navigate to='./issues/list' />;

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to='./issues/list'>Go Back</Link>
      </div>
      <IssueComment issue={issueQuery.data} />
      { commentsQuery.isLoading && <Loading/> }
      {
        commentsQuery.data?.map( issue => (
          <IssueComment key={issue.id} issue={ issue } />
        ))
      }
    </div>
  )
}
