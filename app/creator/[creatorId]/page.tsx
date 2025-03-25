"use client"
import StreamView from "@/app/component/StreamView";

interface PageProps {
  params: {
    creatorId: string;
  };
}

export default function CreatorPage({ params }: PageProps) {
  return <StreamView creatorId={params.creatorId} nowPlaying={false} />;
}

