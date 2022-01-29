import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostFeed from '@/features/Post/components/PostFeed'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { getPostsOnTopicAction, selectTopicContents } from '../topicSlice'
const PostOnTopic: React.FC = () => {
  const { topicId } = useParams<'topicId'>()
  const [page, setPage] = useState(1)
  const dispatch = useAppDispatch()
  const topicContents = useAppSelector(selectTopicContents)
  useEffect(() => {
    dispatch(
      getPostsOnTopicAction({
        topicId: topicId || '',
        limit: 20,
        page,
      })
    )
  }, [dispatch, topicId, page])
  return (
    <div className="container">
      <div className="col-9 container-main">
        {topicContents && (
          <PostFeed
            name={topicContents.name}
            contents={topicContents.contents}
            loadMore={() => setPage((page) => page + 1)}
          />
        )}
      </div>
    </div>
  )
}

export default PostOnTopic
