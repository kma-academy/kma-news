import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdOutlineFullscreen, MdOutlineFullscreenExit } from 'react-icons/md'
import './index.css'
interface ImageInfor {
  id: number
  url: string
  description?: string
}
interface FrameImageProps {
  arrImg: ImageInfor[]
  visible: boolean
  toggleVisible: (visible: boolean) => void
}
export const FullScreenImage: React.FC<FrameImageProps> = (props) => {
  // export const FrameImage = () => {
  const [fullState, setFullState] = useState(false)
  const { toggleVisible, arrImg } = props
  const [idCurrent, setIdCurrent] = useState(3)
  const index = Math.max(
    arrImg.findIndex((el) => el.id === idCurrent),
    0
  )
  const data: ImageInfor = arrImg[index]
  const handlePage = (params: boolean) => {
    if (params === true) {
      if (idCurrent === arrImg.length) setIdCurrent(1)
      else setIdCurrent(idCurrent + 1)
    } else {
      if (idCurrent === 1) setIdCurrent(arrImg.length)
      else setIdCurrent(idCurrent - 1)
    }
  }
  const elem = document.documentElement
  const handleScreen = () => {
    fullState ? document.exitFullscreen() : elem.requestFullscreen()
    setFullState(!fullState)
  }
  const handleOut = () => {
    toggleVisible(false)
    if (fullState) document.exitFullscreen()
  }
  return (
    <div className="frame-image">
      <div className="frame-image__header">
        <div className="frame-image__page">{data.id + '/' + arrImg.length}</div>
        <div className="frame-image__button">
          <div className="frame-image__full-scrren" onClick={() => handleScreen()}>
            {fullState ? (
              <MdOutlineFullscreenExit className="frame-image__icon" />
            ) : (
              <MdOutlineFullscreen className="frame-image__icon" />
            )}
          </div>
          <div className="frame-image__out" onClick={() => handleOut()}>
            <AiOutlineClose className="frame-image__icon" />
          </div>
        </div>
      </div>
      <div className="frame-immage__body">
        <div className="frame-image__left" onClick={() => handlePage(false)}></div>
        <div className="frame-image__img">
          <img src={data.url} alt="" className="frame-image__img-c" />
        </div>
        <div className="frame-image__right" onClick={() => handlePage(true)}></div>
      </div>
      <div className="frame-image__description">
        {data.description ? <p>{data.description}</p> : ''}
      </div>
    </div>
  )
}
