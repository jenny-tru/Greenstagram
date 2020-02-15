const axios = require('axios');

class InstagramScraper {
  parseSharedDataFromHTML(rawHTML) {
    const _sharedData = rawHTML.match(/.*_sharedData.*/g)[0]
      .replace('<script type="text/javascript">window._sharedData = ', '')
      .replace(';</script>', '');
    return JSON.parse(_sharedData);
  }

  async fetchPostData(instagramSearchURL) {
    const res = await axios(instagramSearchURL);
    const sharedData = this.parseSharedDataFromHTML(res.data);
    // const hashtag = sharedData.entry_data.TagPage[0].graphql.hashtag.name;
    const posts = sharedData.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges;
    const postURLs = posts.map(post => `https://www.instagram.com/p/${post.node.shortcode}`);
    // console.log('posts', posts); // eslint-disable-line no-console
    // console.log('postURLs', postURLs); // eslint-disable-line no-console
    return postURLs;
  }

}

export const instagramScraper = new InstagramScraper();


