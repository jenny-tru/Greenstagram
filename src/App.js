
import React, { useEffect, useState } from 'react';
import { InstagramPost } from './InstagramPost';
import logo from './logo.svg';
import './App.css';
import { instagramScraper } from './instgramScraper.service';

function App() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function keepFetching() {
    setInterval(() => {      
      instagramScraper.fetchPost('https://www.instagram.com/explore/tags/greenstagram2020/')
        .then(res => {
          setPosts(res);
        });
    }, 5000);
  }

  function fetchInstagramPosts() {
    setLoading(true);
    instagramScraper.fetchPost('https://www.instagram.com/explore/tags/greenstagram2020/')
      .then(res => {
        setPosts(res);
        setLoading(false);
        keepFetching();
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  if (!posts || loading) {
    return (
      <div className="wrapper -loading" key="loading">
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="wrapper" key="loaded">
      <div id="images">
        <div className="images-container">
          {posts.map((post, i) => <InstagramPost post={post} key={post} />)}
        </div>
      </div>
      <header id="header">
        <div className="header-content">
          <h1 data-subtitle="Live sustainably">Greenstagram</h1>
          <p>
            Share your sustainability story to show up on our wall!
          </p>
          <div className="content">            
            <h3>How It Works:</h3>
            <ol>
              <li>Take a picture of how you're promoting sustainability in the world.</li>
              <li>Share your image on Instagram with <strong>#greenstagram2020</strong></li>
              <li>@mention your friends and brands that you want to take part in our sustainability challenge!</li>
            </ol>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
