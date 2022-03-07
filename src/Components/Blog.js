import React, { Component } from 'react'
import BlogItem from './BlogItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class Blog extends Component {
  
    static defaultProps={
      country:'in',
      pageSize:6,
      category:'genral'
  }
    static propTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string,
  }



    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dce260f953ec48ffa94717ca5ae98d20&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
             loading: false
        })
    }

    handlePreviousclick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dce260f953ec48ffa94717ca5ae98d20&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading:false
            
        })
    }

    handleNextclick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
                let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dce260f953ec48ffa94717ca5ae98d20&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
                this.setState({ loading: true })
                let data = await fetch(url);
                let parsedData = await data.json()
                this.setState({
                    page: this.state.page + 1,
                    articles: parsedData.articles,
                    loading:false
                })
            }
        }

        render() {
            return (
                <>
                    <div className='container my-3'>
                        <h2 className='text-center'>BLOG - The News </h2>
                        {this.state.loading && <Spinner />}
                        <div className='row'>
                            {!this.state.loading&&this.state.articles.map((element) => {
                                return <div className='col-md-4' key={element.url}>
                                    <BlogItem title={element.title ? element.title.slice(0, 35) : ""} description={element.description ? element.description.slice(0, 87) : ""} imgUrl={element.urlToImage} newsUrl={element.url} />
                                </div>
                            })}
                            <div className='container d-flex justify-content-between my-3'>
                                <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePreviousclick}> &larr; Previous</button>
                                <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr; </button>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }

export default Blog;
