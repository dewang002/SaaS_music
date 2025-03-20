import StreamView from "@/app/component/StreamView";

export default function({params: {creatorId}}:{params: {creatorId: string}}) {
    return <>
        <StreamView creatorId={creatorId} />
    </>
}