"use client"

import StreamView from "../component/StreamView"
const creatorId = '12a159ae-a352-4a35-a915-7185a78efc8d'
export default function MusicApp() {
  return (
    <StreamView creatorId={creatorId} nowPlaying={true} />
  )
}

