import React, { useEffect ,useState} from 'react'
import BlogItem from './BlogItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const Blog=(props)=> {
const [articles,setArticles]=useState([])
const [loading,setLoading]=useState([true])
const [page,setPage]=useState(1)
const [totalResults,setTotalResults]=useState(0)
  

   const  updateNews= async () =>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}
         &page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100);
    }

    useEffect(()=>{
document.title = `${props.category}-THE NEWS`;
        updateNews();
        // eslint-disable-next-line
    },[])

   const fetchMoreData = async () => {
       const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}
       &page=${page+1}&pageSize=${props.pageSize}`;
       setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };

        return (
            <>
                <h2 className='text-center ' style={{margin:'11px 0px',marginTop: '80px'}}>The News - Top {props.category} Headlines </h2>
                {loading&&<Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}>
                    <div className='container'>
                        <div className='row'>
                            {articles.map((element) => {
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

Blog.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'genral'
}
Blog.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default Blog;
