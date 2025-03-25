"use client"
import StreamView from "@/app/component/StreamView";

export default function CreatorPage({ params }: { params: { creatorId: string } }) {
    return <StreamView creatorId={params.creatorId} nowPlaying={false} />;
  }
  
