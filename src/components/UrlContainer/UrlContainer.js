import React from 'react';
import './UrlContainer.css';

const UrlContainer = (props) => {
  console.log("PROPS: ", props)
  const urlEls = props.urls.map((url, index) => {
    return (
      <div className="url" key={index}>
        <h3>{url.title}</h3>
        <a href={url.short_url} target="blank" className='short-url'>{url.short_url}</a>
        <p className='long-url'>{url.long_url}</p>
      </div>
    )
  });

  return (
    <section className='URL-Container'>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
