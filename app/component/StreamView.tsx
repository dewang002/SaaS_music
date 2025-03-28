"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowBigUp, ArrowBigDown, SkipForward } from "lucide-react"
import AppBar from "../component/AppBar"
import { NextResponse } from "next/server"
// @ts-expect-error: YouTubePlayer might not have TypeScript definitions
import YouTubePlayer from 'youtube-player';
import Image from "next/image"

type count = {
  upvotes: number
}

// Define the music track type
interface Track {
  id: string
  extractedId: string
  title: string
  smallImg: string
  artist: string
  upvotes: { upvotes: number }
  downvotes: number
  _count: count
  haveUpVoted: boolean
}

export default function StreamView({ creatorId, nowPlaying = false }: { creatorId: string, nowPlaying: boolean }) {
  const [ytlink, setytLink] = useState('')
  const [tracks, setTracks] = useState<Track[]>([])
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [loading, setLoading] = useState(false)
  const musicRef = useRef(null)

  // Sort tracks by upvotes and set initial current track

  const REFRESH_INTERVAL = 10 * 1000

  const refreshStream = useCallback(async () => {
    try {
      const res = await fetch(`/api/streams/?creatorId=${creatorId}`);
      if (!res.ok) {
        return NextResponse.json(
          { msg: "error" },
          { status: 411 }
        );
      }
  
      const data = await res.json();
      setTracks(data.stream);
  
      setCurrentTrack(prev => {
        if (currentTrack?.id === data?.currentStream?.id) {
          return prev;
        }
        return data.currentStream.stream;
      });
  
    } catch {
      console.error("Failed to refresh stream");
    }
  }, [creatorId, currentTrack?.id]);
  
  useEffect(() => {
    refreshStream()
    const interval = setInterval(() => {
      refreshStream()
    }, REFRESH_INTERVAL)

    return () => clearInterval(interval)
  }, [])


  // Handle voting
  const handleVote = async (id: string, isUpvote: boolean) => {
    setTracks((prevTracks) =>
      prevTracks.map((track) => {
        if (track.id === id) {
          if (isUpvote) {
            return {
              ...track,
              upvotes: {
                ...track.upvotes,
                upvotes: track.upvotes.upvotes + 1
              },
              haveUpVoted: true
            }
          } else {
            return {
              ...track,
              downvotes: track.downvotes + 1
            }
          }
        }
        return track;
      }).sort((a, b) => b.upvotes.upvotes - a.upvotes.upvotes)
    )
    fetch(`/api/streams/${isUpvote ? 'upVote' : 'downVote'}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        streamId: id
      })
    })

  }

  const shareTrackList = () => {
    const sharingUrl = `${window.location.hostname}/creator/${creatorId}`
    navigator.clipboard.writeText(sharingUrl)
  }

  // Skip to next track
  const playNextTrack = async () => {
    const playnext = await fetch(`/api/streams/next`,
      {
        method: "GET"
      })
    const nextsong = await playnext.json()
    if (nextsong) {
      setCurrentTrack(nextsong.stream)
    }
    setTracks(prevtracks => prevtracks.slice(1))
  }

  const handleLink = async () => {
    setLoading(true)
    await fetch('http://localhost:3000/api/streams', {
      method: 'POST',
      body: JSON.stringify({
        creatorId: creatorId,
        url: ytlink
      })
    })
    setytLink("")
    setLoading(false)
  };

  

  useEffect(() => {
    if(!musicRef.current) return

    const player = YouTubePlayer(musicRef.current);

    player.loadVideoById(currentTrack?.extractedId);

    player.playVideo();
    // @ts-expect-error: `event.data` might not be properly typed, but we rely on YouTube's state change event.
    const eventHandler = (event) => {
      if(event.data === 0){
        playNextTrack()
      }
    }
    player.on('stateChange', eventHandler);
    return ()=> {
      player.destroy()
    }
  }, [currentTrack, musicRef, REFRESH_INTERVAL, refreshStream])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80">
      <AppBar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Main Player Section */}
        <Button variant="outline" size="sm" onClick={shareTrackList}>
          Share Playlist
        </Button>
        <div>
          <input value={ytlink} type="text" onChange={(e) => setytLink(e.target.value)} placeholder=" put the link of youtube here" className="p-2 w-xl h-8 mx-4 border rounded" />
          <button disabled={loading} className="active:scale-95 px-4 py-2 bg-purple-800 text-white" onClick={handleLink}>{loading ? "loading..." : "add music"}</button>
        </div>
        <section className="mb-12">
          <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-primary/10">
            <div className="grid grid-cols-12 gap-6 p-6">
              {/* YouTube Embed */}
              <div className="aspect-video md:col-span-6 col-span-12  bg-black">
                {currentTrack? (
                  <div ref={musicRef} className="w-full"  />

                  // <iframe
                  //   width="100%"
                  //   height="100%"
                  //   src={`https://www.youtube.com/embed/${currentTrack.extractedId}?autoplay=1`}
                  //   title="YouTube video player"
                  //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  //   allowFullScreen
                  // ></iframe>
                ): <div className="md:col-span-6 col-span-12 bg-black text-white text-center">
                    <h1>NOTHING TO PLAY OR PLAY NEXT</h1>
                  </div>
                  }
              </div>

              {/* Now Playing Info */}
              <div className="md:col-span-6 col-span-12 w-full">
                <>
                  <h2 className="text-2xl font-bold mb-2">Now Playing</h2>
                  {currentTrack ? (
                    <div className="flex items-start gap-4 w-full">
                      <Image
                        src={currentTrack.smallImg}
                        alt={currentTrack.title}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{currentTrack.title}</h3>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No track selected</p>
                  )}
                </>

                {/* Player Controls */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2">
                    {nowPlaying &&
                      <Button variant="outline" size="icon" onClick={playNextTrack} className="rounded-full">
                        <SkipForward className="h-5 w-5" />
                      </Button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Music Queue Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Up Next</h2>
            <p className="text-sm text-muted-foreground">Sorted by upvotes</p>
          </div>

          <div className="grid gap-4">
            {tracks?.map((track) => (

              <Card
                key={track.id}
                className={`p-4 transition-all hover:bg-accent/50 ${currentTrack?.id === track.id ? "border-primary bg-primary/5" : ""}`}
              >
                <div className="flex items-center gap-4">
                  {/* Voting */}
                  <div className="flex flex-col items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => !track.haveUpVoted && handleVote(track.id, true)}
                      className="h-8 w-8 rounded-full text-green-500 hover:text-green-600 hover:bg-green-100"
                    >
                      <ArrowBigUp className="h-5 w-5" />
                    </Button>
                    <span className="font-medium text-sm">{track.upvotes.upvotes}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleVote(track.id, false)}
                      className="h-8 w-8 rounded-full text-red-500 hover:text-red-600 hover:bg-red-100"
                    >
                      <ArrowBigDown className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative cursor-pointer">
                    <Image
                      src={track.smallImg || "/placeholder.svg"}
                      alt={track.title}
                      width={140}
                      height={140}
                      className="rounded-lg object-cover"
                    />
                    
                  </div>

                  {/* Track Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold">{track.title}</h3>
                    <p className="text-sm text-muted-foreground">{track.artist}</p>
                  </div>

                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-6 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MusicVote. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

