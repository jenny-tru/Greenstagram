import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { instagramScraper } from './instgramScraper.service';
const axios = require('axios');

InstagramPost.propTypes = {
  url: PropTypes.string,
};

export function InstagramPost(props) {
  const { url } = props;
  return (
    <div className="image" style={{backgroundImage:`url("${url}")`}}>
      {/* <img src={url}/> */}
    </div>
  );
}
