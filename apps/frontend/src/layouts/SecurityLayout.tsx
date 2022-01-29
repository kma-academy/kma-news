import React from 'react'
import { useAppSelector } from '@/app/hooks'
import { selectLoading, selectProfile } from '@/features/Auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { BasicLayout } from './BasicLayout'

export const SecurityLayout: React.FC = () => {
  const profile = useAppSelector(selectProfile)
  const profileLoading = useAppSelector(selectLoading)
  const redirect_url = window.location.pathname
  const navigate = useNavigate()
  if (profileLoading === 'error') {
    navigate(`/auth/login?redirect_url=${redirect_url}`)
  }
  if (profileLoading === 'done' && !profile) {
    navigate(`/auth/login?redirect_url=${redirect_url}`)
  }
  return <BasicLayout />
}
