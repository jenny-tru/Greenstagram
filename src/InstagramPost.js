import React from 'react';
import PropTypes from 'prop-types';

InstagramPost.propTypes = {
  post: PropTypes.object,
};

export function InstagramPost(props) {
  const { post } = props;
  return (
    <a href={post.postUrl} target="_blank">
      <div className="image" style={{ backgroundImage: `url("${post.imageUrl}")` }} />
    </a>
  );
}
