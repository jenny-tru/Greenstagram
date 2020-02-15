const axios = require('axios');
const moment = require('moment');

class InstagramScraper {
  parseSharedDataFromHTML(rawHTML) {
    const _sharedData = rawHTML.match(/.*_sharedData.*/g)[0]
      .replace('<script type="text/javascript">window._sharedData = ', '')
      .replace(';</script>', '');
    return JSON.parse(_sharedData);
  }

  async fetchPostURL(instagramSearchURL) {
    const res = await axios(instagramSearchURL);
    const sharedData = this.parseSharedDataFromHTML(res.data);
    const posts = sharedData.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges;
    const postURLs = posts.map(post => `https://www.instagram.com/p/${post.node.shortcode}`);
    return postURLs;
  }

  async fetchPost(instagramSearchURL) {
    const res = await axios(instagramSearchURL);
    const sharedData = this.parseSharedDataFromHTML(res.data);
    const posts = sharedData.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges;
    const postImages = posts.map(post => {
      console.log('post.node.taken_at_timestamp', post.node.taken_at_timestamp); // eslint-disable-line no-console
      return {
        imageUrl: post.node.display_url,
        postUrl: `https://www.instagram.com/p/${post.node.shortcode}`,
        comment: '',
        postDate: moment(post.node.taken_at_timestamp, 'x').format('MM D YYYY hh:mm'),
        username: '',
      };
    });
    return postImages;
  }

}

export const instagramScraper = new InstagramScraper();


