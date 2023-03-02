import { useLabels } from '../hooks/useLabels';
import { Loading } from './Loading';

type LabelPickerProp = {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker: React.FC<LabelPickerProp> = (props): JSX.Element => {

  const { selectedLabels, onChange } = props;
  const query = useLabels();

  if( query.isLoading ) return <Loading/>

  return (
    <div>
      {
        query.data?.map((label): JSX.Element => (
          <span
            key={label.id}
            className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) ? 'label-active' : ''} `}
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
            onClick={ (): void => onChange(label.name) }
          >
            {label.name}
          </span>
        ))
      }
    </div>
  )
}
