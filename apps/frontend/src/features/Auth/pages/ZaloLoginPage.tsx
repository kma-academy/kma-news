import { useAppDispatch, useAppSelector } from '@/app/hooks'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { loginZaloAction, selectLoading, selectLoggedIn, selectMessage } from '../authSlice'

const ZaloLoginPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const loggedIn = useAppSelector(selectLoggedIn)
  const loading = useAppSelector(selectLoading)
  const message = useAppSelector(selectMessage)
  const code = searchParams.get('code')
  useEffect(() => {
    if (loggedIn) {
      window.opener.location.reload()
      window.close()
    }
  }, [loggedIn])
  useEffect(() => {
    if (!!code) dispatch(loginZaloAction(code))
  }, [code, dispatch])
  return (
    <div>
      <h1>Zalo Login</h1>
      {/* <p>Token: {code}</p> */}
      {loading === 'pending' && <p>Loading...</p>}
      {loading === 'error' && <p>{message}</p>}
      <p>{message}</p>
    </div>
  )
}

export default ZaloLoginPage
