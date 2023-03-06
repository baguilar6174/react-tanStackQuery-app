import { useQueryClient } from '@tanstack/react-query';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { Issue, State } from '../interfaces';
import { getIssue, getIssueComments } from '../hooks/useIssue';

type IssueItemProp = {
  issue: Issue;
}

export const IssueItem: React.FC<IssueItemProp> = (props): JSX.Element => {

  const { issue } = props;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <div className="card mb-2 issue" onClick={gotoIssueDetails} onMouseEnter={onMouseEnter} >
      <div className="card-body d-flex align-items-center">
        {
          issue.state === State.Open ? <FiInfo size={30} color="red" /> : <FiCheckCircle size={30} color="green" />
        }
        <div className="d-flex flex-column flex-fill px-2">
          <span>{ issue.title }</span>
          <span className="issue-subinfo">#{issue.number} opened 2 days ago by <span className='fw-bold'>{issue.user.login}</span></span>
        </div>
        <div className='d-flex align-items-center'>
          <img src={issue.user.avatar_url} alt="User Avatar" className="avatar" />
          <span className='px-2'>{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  )

  function gotoIssueDetails(): void {
    navigate(`/issues/issue/${issue.number}`);
  }

  function onMouseEnter(): void {
    // * Important: We can anticipate the user's actions and request the information with this event.
    /* queryClient.prefetchQuery(["issue", issue.number], () => getIssue(issue.number));
    queryClient.prefetchQuery(['issue', issue.number, 'comments'], () => getIssueComments(issue.number)); */
  }
}
