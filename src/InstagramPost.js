import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { instagramScraper } from './instgramScraper.service';
const axios = require('axios');

InstagramPost.propTypes = {
  url: PropTypes.string,
};

export function InstagramPost(props) {
  const { url } = props;
  const [embedCode, setEmbedCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchEmbedCode(url) {
    try {
      setLoading(true);
      const res = await axios(`https://api.instagram.com/oembed?url=${url}&omitscript=true`);
      const embed = JSON.parse(res.request.response).html;
      console.log('embed', embed); // eslint-disable-line no-console
      setEmbedCode(embed);
      setLoading(false);
    } catch(error){
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmbedCode(url);
    // fetch embed code
    // set the embed code to state
  }, []);
  
  
  
  return (
    <div dangerouslySetInnerHTML={{ __html: embedCode }}/>
  );
}
