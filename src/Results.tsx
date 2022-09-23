import React from 'react';
import { IResultsProps } from './domain/IResultsProps';
import './index.css';



function Result(props: IResultsProps) {
  return (
    <>
    <h1>Results</h1>
    <table className="table table-striped">
    <thead>
      <tr>
      <th>Word</th>
      <th>Count</th>
      </tr>
    </thead>
    <tbody>
    {
    Object.entries(props.data!.count).map(([word, count]) => {
      return (
        <tr key={word}>
          <td>{word}</td>
          <td>{count}</td>
      </tr>
      );})
    }
    </tbody>
    </table>
    <div>
    
    </div>
    </>
  );
}

export default Result;