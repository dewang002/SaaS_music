"use client"

import StreamView from "../component/StreamView"
const creatorId = '3786aa5b-5781-4fb9-815f-eb9b492da235'
export default function MusicApp() {
  return (
    <StreamView creatorId={creatorId} nowPlaying={true} />
  )
}

