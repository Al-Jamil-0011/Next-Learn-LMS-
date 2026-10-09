import { useApp } from '../../context/AppContext.jsx';
import Icon from './Icon.jsx';

export default function Toast() {
  const { toastMsg, toastOn } = useApp();
  return (
    <div className={`toast${toastOn ? ' on' : ''}`} role="status">
      <Icon name="checkc" />
      <span>{toastMsg}</span>
    </div>
  );
}
