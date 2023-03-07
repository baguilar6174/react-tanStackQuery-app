import { createBrowserRouter, Navigate } from 'react-router-dom';

import { GitApp } from '../GitApp';
import { ListView, IssueView, ListViewInfinite } from '../issues/views';
import { RandomComponent } from '../random/components/Random';

export const router = createBrowserRouter([
  {
    path: '/random',
    element: <RandomComponent />,
  },
  {
    path: '/issues',
    element: <GitApp />,
    children: [
        { path: 'list', element: <ListView />,  },
        { path: 'list/infinite', element: <ListViewInfinite />,  },
        { path: 'issue/:id', element: <IssueView /> },
        { path: '*', element: <Navigate to="list" /> },
    ]
  },
  {
    path: '/',
    element: <Navigate to="issues/list" />
  },
  {
    path: '*',
    element: <h1>Not found</h1>,
  },
]);

