import React from 'react';
import { PostByChannelResponse } from '@kma-news/api-interface';
import PostFeedItem from '../PostFeedItem';
export interface PostFeedProps extends Omit<PostByChannelResponse, 'id'> {
  loadMore: () => void;
}
const PostFeed: React.FC<PostFeedProps> = (props) => {
  const { name, contents } = props;
  // Scroll to lasted -> loadMore
  return (
    <div className="content">
      <div className="col-8 content-left">
        <div className="title-news-navbar">{name}</div>
        <div className="list-news-navbar">
          {contents.map((post, i) => (
            <PostFeedItem post={post} key={`feed-${name}-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default PostFeed;
