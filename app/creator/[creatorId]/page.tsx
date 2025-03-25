"use client"
import StreamView from "@/app/component/StreamView";

export default function CreatorPage({ params }: { params: Record<string, string> }) {
    return <StreamView creatorId={params.creatorId} nowPlaying={false} />;
}
  
  
