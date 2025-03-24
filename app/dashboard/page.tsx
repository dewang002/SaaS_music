"use client"

import StreamView from "../component/StreamView"
const creatorId = '41f10f3a-7936-49d0-b671-ccf1c70d291c'
export default function MusicApp() {
  return (
    <StreamView creatorId={creatorId} nowPlaying={true} />
  )
}

