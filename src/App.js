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
    instagramScraper.fetchPost('https://www.instagram.com/explore/tags/sustainability/')
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
    <div>
      <ul>
        {postURLs.map(url => {
          return (
            <li>
              <img src={url} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
