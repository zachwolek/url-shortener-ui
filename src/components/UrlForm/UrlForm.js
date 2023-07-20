import React, { useState } from 'react';

function UrlForm() {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');

  handleSubmit = e => {
    e.preventDefault();
    clearInputs();
  }

  clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={title}
          // onChange={e => }
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='title'
          value={title}
          // onChange={e => }
        />

        <button onClick={e => handleSubmit(e)}>
          Shorten Please!
        </button>
      </form>
    )
  }
}

export default UrlForm;
