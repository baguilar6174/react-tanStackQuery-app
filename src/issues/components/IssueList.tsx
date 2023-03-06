import { Issue, State } from '../interfaces';
import { IssueItem } from './IssueItem';

type IssueListProp = {
  issues: Issue[];
  state?: State;
  onStateChanged: (state?: State) => void
}

export const IssueList: React.FC<IssueListProp> = (props): JSX.Element => {

  const { issues, state, onStateChanged } = props;

  return (
    <div className="card border-white">
      <div className="card-header bg-dark">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <a
              className={`nav-link ${!state ? 'active' : ''}`}
              onClick={(): void => onStateChanged(undefined)}
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${state === State.Open ? 'active' : ''}`}
              onClick={(): void => onStateChanged(State.Open)}
            >
              Open
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${state === State.Closed ? 'active' : ''}`}
              onClick={(): void => onStateChanged(State.Closed)}
            >
              Closed
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body text-dark">
        {
          issues.map( issue => (
            <IssueItem key={issue.id} issue={issue} />
          ))
        
        }                
      </div>
    </div>
  )
}
