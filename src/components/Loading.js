import React from 'react';
import '../styles/Loading.css';

function Loading() {
  return (
    <main className="loading">
      <p>Loading</p>
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </main>
  );
}

export default Loading;
