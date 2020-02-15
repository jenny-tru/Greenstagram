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
        let pics = ['200', '200', '200', '200', '200'];
        let perm_url = 'https://picsum.photos/';
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