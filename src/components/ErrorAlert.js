import React from 'react';
import { useSelector } from 'react-redux';

const ErrorAlert = () => {
  const { error } = useSelector(state => state.tasks);

  return (
    error ? <div className="error-alert">Error: {error}</div> : null
  );
};

export default ErrorAlert;
