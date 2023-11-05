import { TailSpin } from 'react-loader-spinner';

import css from './loader.module.css';

export function Loader() {
  return (
    <div className={css.loader}>
      <TailSpin height="100" width="100" color="#3f51b5" />
    </div>
  );
}
