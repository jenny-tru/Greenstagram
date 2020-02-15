import React, { useEffect, useState } from 'react';
import { InstagramPost } from './InstagramPost';
import logo from './logo.svg';
import './App.css';
import { instagramScraper } from './instgramScraper.service';

function App() {
  const [postURLs, setPostURLs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function fetchInstagramPostURLs() {
    setLoading(true);
    instagramScraper.fetchPostURL('https://www.instagram.com/explore/tags/sustainability/')
      .then(res => {
        setPostURLs(res);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }

  function fetchInstagramPosts() {
    setLoading(true);
    instagramScraper.fetchPost('https://www.instagram.com/explore/tags/greenstagram2020/')
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
    // fetchInstagramPostURLs();
    fetchInstagramPosts();
  }, []);

  if (!postURLs || loading) {
    return (
      <div>
        Loading...
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Error: {error.message}
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }

  // console.log('instagramPostData', instagramPostData); // eslint-disable-line no-console
  return (
    <div className="wrapper">
      <header id="header">
        <div className="header-content">
          <h1>Greenstagram</h1>
          <p>
            Share your sustainability story!
          </p>
          <h3>How It Works:</h3>
          <ol>
            <li>Take a picture of how you're promoting sustainability in the world.</li>
            <li>Share your image on Instagram with #greenstagram2020</li>
            <li>@mention your friends and brands that you want to take part in our sustainability challenge!</li>
          </ol>
        </div>
      </header>
    <div id="images">
        {postURLs.map(url => <InstagramPost url={url} />)}

    </div>
    </div>
  );
}

export default App;
