import React from 'react'
import Post from './Post'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import LoaderComponent from '../Loader/Loader'
import './ListPage.css'
class ListPage extends React.Component {

  render () {

    if (this.props.allPostsQuery.loading) {
      return <LoaderComponent/>
    }
    console.log(this.props.allPostsQuery.allPosts);
    
    return (
      <div className='listContainer'>
        <div className='grid'>
          {this.props.allPostsQuery.allPosts.map((post) =>
            <Post key={post.id} post={post} />
          )}
        </div>
      </div>
    )
  }
}

const ALL_POSTS_QUERY = gql`
  query AllPostsQuery {
    allPosts(orderBy: createdAt_DESC) {
      id
      imageUrl
      description
    }
  }
`

export default compose( 
  graphql(ALL_POSTS_QUERY, { name: 'allPostsQuery'}),
  )(ListPage)
