<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { instagramScraper } from './instgramScraper.service';

function App() {
  const [postURLs, setPostURLs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function fetchInstagramPosts() {
    setLoading(true);
      instagramScraper.fetchPostData('https://www.instagram.com/explore/tags/sustainability/')
        .then(res => {
          setPostURLs(res);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
  }

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  if(error) {
    return (
      <div>
        Error: {error.message}
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    )
  }

  if(loading) {
    return (
      <div>
        Loading...
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    )
  };

  // console.log('instagramPostData', instagramPostData); // eslint-disable-line no-console
  return (
    <div className="App">
      {postURLs}
    </div>
  );
=======
import React, { Component } from 'react';
import Loader from './Components/Loader';

export default class App extends Component {
  render() {
    return(
      <div>
        <Loader></Loader>
      </div>
    );
  }
>>>>>>> jdev
}

// export default App;
