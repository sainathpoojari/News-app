import React, { Component } from 'react'
//  import './BlogItem.css'

export class BlogItem extends Component {
    render() {
        let { title, description, imgUrl, newsUrl,date,author,source } = this.props
        return (
            <div className='container '>
                <div className="card my-4">
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {source}</span>
                    <img src={imgUrl ? imgUrl : "https://i.insider.com/62232c8a99086300199890c7?width=1200&format=jpeg"}
                        className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p> <small className="text-muted"> <strong>By {author} on {new Date(date).toGMTString()}</strong></small></p>
                        <a href={newsUrl} target="_blank" rel='noreferrer' className="btn  btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default BlogItem;
