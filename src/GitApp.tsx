import { FC } from 'react';
import { Outlet } from 'react-router';

export const GitApp: FC = (): JSX.Element => {
  
  return (
    <div className="container mt-5">
    <h1>Git Issues <small>Seguimiento de problemas</small> </h1>
      <Outlet />
    </div>
  )
}
