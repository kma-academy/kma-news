import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { BasicLayout } from '@/layouts/BasicLayout'
import Home from '@/features/HomePage/pages/HomePage'
import { HotTopicPage } from '@/features/Post/pages/HotTopicPage'
import { BlankLayout } from '@/layouts/BlankLayout'
import { SecurityLayout } from '@/layouts/SecurityLayout'
import PostOnTopic from '@/features/Topic/pages/PostOnTopicPage'
const PersonalPage = React.lazy(() => import('@/features/Personal/pages/PersonalPage'))
const HistoryPage = React.lazy(() => import('@/features/Personal/pages/HistoryPage'))
const SuggestPage = React.lazy(() => import('@/features/Personal/pages/SuggestPage'))
const FavoritePage = React.lazy(() => import('@/features/Personal/pages/FavoritePage'))
const CategoryPage = React.lazy(() => import('@/features/Personal/pages/CategoryPage/CategoryPage'))
const SubscriptionPage = React.lazy(() => import('@/features/Personal/pages/SubscriptionPage'))
const ZaloLoginPage = React.lazy(() => import('@/features/Auth/pages/ZaloLoginPage'))
const Topic = React.lazy(() => import('@/features/Topic/pages/TopicPage'))
const ReadingPage = React.lazy(() => import('@/features/Post/pages/ReadingPage'))

export const RootRouter = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            <Route index element={<Home />} />
            <Route path="tin-moi.epi" element={<Home />} />
            <Route path="bai-bao/:slug" element={<ReadingPage />} />
            <Route path="phong-chong-dich-covid-19" element={<HotTopicPage />} />
          </Route>
          <Route path="/ca-nhan" element={<SecurityLayout />}>
            <Route path="" element={<PersonalPage />}>
              <Route path="de-xuat" element={<SuggestPage />} />
              <Route path="doc-gan-day" element={<HistoryPage />} />
              <Route path="muc-da-luu" element={<FavoritePage />} />
              <Route path="muc-cua-ban" element={<CategoryPage />} />
              <Route path="theo-doi" element={<SubscriptionPage />} />
            </Route>
          </Route>
          <Route path="/chu-de" element={<BasicLayout />}>
            <Route path="" element={<Topic />} />
            <Route path=":topicId" element={<PostOnTopic />} />
          </Route>
          <Route path="auth/login" element={<BlankLayout />}>
            <Route path="zalo" element={<ZaloLoginPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}
