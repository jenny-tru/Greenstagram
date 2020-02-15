import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

export default class Loader extends Component {
    constructor() {
        super();

        this.state = {
            urls: [],
            hasMorePics: true,
            nextHref: null
        }
    }

    loadItems() {
        
    }

    render() {
        let pics = ['B8h_UJkg5TA', 'BIrTU23h5mK', 'BHmfkOjAzOE', 'BJTcUUFA3aw', 'BHu9abagUVk'];
        let perm_url = 'https://www.instagram.com/p/';
        let urls = [];

        pics.map((pic, i) => {
            urls.push(
            <div key={i}>
                <img src={perm_url + pic}></img>
            </div>
            )
        });

        return (
            <div>
                <InfiniteScroll
                    pageStart = {0}
                    loader={<div className="loader" key={0}>chugga chugga</div>}
                    loadMore={this.loadItems.bind(this)}
                    hasMore={false}
                >
                    {urls}
                </InfiniteScroll>
                <span>loader is here</span>
            </div>
        );
    }
};

// export default Loader;