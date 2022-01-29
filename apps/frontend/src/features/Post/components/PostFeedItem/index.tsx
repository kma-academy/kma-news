import { Types } from 'shared-api'
import React from 'react'
import { Link } from 'react-router-dom'
export interface PostFeedItemProps {
  post: Types.PostWithPublisher
}
const PostFeedItem: React.FC<PostFeedItemProps> = (props) => {
  const { post } = props
  return (
    <div className="item-news-navbar">
      <div className="img-news-navbar">
        <Link to="/">
          <img src={post.thumbnailUrl || "https://baomoi-static.zadn.vn/web/styles/img/logo-baomoi-gray.png"} alt="" />
        </Link>
      </div>
      <div className="description-item-news">
        <Link to="/">
          <span>{post.description}</span>
        </Link>
        <div className="news-source">
          <Link to="/">
            <img className="logo-source" src="https://photo-baomoi.zadn.vn/26dc73b3aef047ae1ee1.png" alt="" />
          </Link>
          <span className="news-time">2 giờ</span>
        </div>
      </div>
    </div>
  )
}

export default PostFeedItem
