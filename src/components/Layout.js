import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';

export default function Layout({ children }) {
  const history = useHistory();
  return (
    <>
      <Header history={history} />
      {children}
    </>
  );
}
