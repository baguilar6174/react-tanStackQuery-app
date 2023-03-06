import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { Loading } from '../components/Loading';
import { useIssues } from '../hooks/useIssues';
import { State } from '../interfaces';

export const ListView = (): JSX.Element => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { query, page, nextPage, prevPage } = useIssues({
    state,
    labels: selectedLabels,
  });

  const onLabelChange = (labelName: string): void => {
    selectedLabels.includes(labelName)
    ? setSelectedLabels( selectedLabels.filter(label => label !== labelName) )
    : setSelectedLabels([...selectedLabels, labelName]);
  }

  return (
    <div className="row mt-5">
      <div className="col-8">
        {
          query.isLoading
          ? <Loading/>
          :
            <IssueList
              issues={query.data || []}
              state={state}
              onStateChanged={ (newState): void => setState(newState)}
            />
        }
        <div className='d-flex mt-5 justify-content-between align-items-center'>
          <button
            className='btn btn-warning'
            onClick={prevPage}
            disabled={ query.isFetching }
          >
            Previous
          </button>
          <span>{ page }</span>
          <button
            className='btn btn-warning'
            onClick={nextPage}
            disabled={ query.isFetching }
          >
            Next
          </button>
        </div>
      </div>
      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={ (labelName): void => onLabelChange(labelName) }
        />
      </div>
    </div>
  )
}
