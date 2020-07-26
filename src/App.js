import React from 'react';

import './App.css'

const Input = (props) => (
  <input
    {...props}
    type='file'
    name='file-input'
    multiple
  />
);

const App = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  }

  const onChange = (e) => {
    console.log(e.target.files);
  }

  return (
    <div className='container'>
      <form className='form' onSubmit={onSubmit}>
        <div>
          <Input onChange={onChange} />
        </div>
          <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default App;
