import React, { Fragment } from 'react';
import './App.css';

// components

import InputTodo from '../src/components/InputTodo';
import ListTodos from '../src/components/ListTodos';

function App() {
  return (
    <Fragment>
      <div className='container'>
        
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;
