"use client"

import StreamView from "../component/StreamView"
const creatorId = '12ce2756-2a45-452a-97a7-5ebb6a73584c'
export default function MusicApp() {
  return (
    <StreamView creatorId={creatorId} nowPlaying={true} />
  )
}

