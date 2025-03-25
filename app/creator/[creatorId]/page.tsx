"use client"
import StreamView from "@/app/component/StreamView";

type Params = Promise<{ creatorId: string }>;

export default async function CreatorPage({ params }: { params: Params }) {
    const { creatorId } = await params;
    return <StreamView creatorId={creatorId} nowPlaying={false} />;
}