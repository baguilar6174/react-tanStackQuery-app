import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { Loading } from '../components/Loading';
import { useIssues } from '../hooks/useIssues';
import { State } from '../interfaces';

export const ListView = (): JSX.Element => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { query } = useIssues({
    state,
    labels: selectedLabels,
  });

  const onLabelChange = (labelName: string) => {
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
      </div>
      
      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={ (labelName) => onLabelChange(labelName) }
        />
      </div>
    </div>
  )
}
