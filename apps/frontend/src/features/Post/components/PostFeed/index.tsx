import React from 'react';
import { PostByChannelResponse } from '@kma-news/api-interface';
import PostFeedItem from '../PostFeedItem';
export interface PostFeedProps extends PostByChannelResponse {
  loadMore: () => void;
}
const PostFeed: React.FC<PostFeedProps> = (props) => {
  const { name, contents } = props;
  // Scroll to lasted -> loadMore
  return (
    <div className="content">
      <div className="col-8 content-left">
        <div className="list-news-navbar">
          <div>{name}</div>
          {contents.map((post, i) => (
            <PostFeedItem post={post} key={`feed-${name}-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default PostFeed;
