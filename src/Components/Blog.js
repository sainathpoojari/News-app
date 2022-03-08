import React, { Component } from 'react'
import BlogItem from './BlogItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class Blog extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'genral'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.props.category}-THE NEWS`;
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dce260f953ec48ffa94717ca5ae98d20
         &page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false,
            totalResults: parsedData.totalResults
        }
        )
    }

    async componentDidMount() {
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dce260f953ec48ffa94717ca5ae98d20
      &page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        }
        )
    };

    render() {
        return (
            <>
                <h2 className='text-center my-3'>The News - Top {this.props.category} Headlines </h2>
                {this.state.loading&&<Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}>
                    <div className='container'>
                        <div className='row'>
                            {this.state.articles.map((element) => {
                                return <div className='col-md-4' key={element.url}>
                                    <BlogItem title={element.title ? element.title.slice(0, 35) : ""}
                                        description={element.description ? element.description.slice(0, 87) : ""}
                                        imgUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author ? element.author : "unkown"}
                                        date={element.publishedAt}
                                        source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </>
        )
    }
}

export default Blog;
