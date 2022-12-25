import React from 'react'
import { AiOutlineShareAlt } from "react-icons/ai"
import "./Additional.css"
import {
  FacebookIcon, LinkedinIcon, TwitterIcon, InstapaperIcon, RedditIcon,
  TelegramIcon, FacebookShareCount, FacebookShareButton, InstapaperShareButton, LineShareButton, TwitterShareButton, RedditShareButton, LinkedinShareButton,
} from "react-share"
import { useState } from 'react'
function Share(props) {

  const shareUrl = props.link
  const [showApp, setShowApp] = useState(false)
  return (
    <div className='sharing-apps'>

      <FacebookShareButton url={shareUrl}>
        <FacebookIcon className='shareIcons' size="25" />
      </FacebookShareButton>
      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon className='shareIcons' size="25" />
      </LinkedinShareButton>
      <TwitterShareButton url={shareUrl}>
        <TwitterIcon className='shareIcons' size="25" />
      </TwitterShareButton>
      <RedditShareButton url={shareUrl}>
        <RedditIcon className='shareIcons' size="25" />
      </RedditShareButton>
    </div>

  )
}

export default Share