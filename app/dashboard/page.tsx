"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowBigUp, ArrowBigDown, Play, Pause, SkipForward, Volume2, VolumeX } from "lucide-react"
import Image from "next/image"
import AppBar from "../component/AppBar"

// Define the music track type
interface Track {
  id: string
  title: string
  artist: string
  thumbnail: string
  youtubeId: string
  upvotes: number
  downvotes: number
}

export default function MusicApp() {
  // Sample initial tracks
  const initialTracks: Track[] = [
    {
      id: "1",
      title: "Blinding Lights",
      artist: "The Weeknd",
      thumbnail: "/placeholder.svg?height=80&width=80",
      youtubeId: "fHI8X4OXluQ",
      upvotes: 124,
      downvotes: 12,
    },
    {
      id: "2",
      title: "As It Was",
      artist: "Harry Styles",
      thumbnail: "/placeholder.svg?height=80&width=80",
      youtubeId: "H5v3kku4y6Q",
      upvotes: 98,
      downvotes: 8,
    },
    {
      id: "3",
      title: "Stay",
      artist: "The Kid LAROI, Justin Bieber",
      thumbnail: "/placeholder.svg?height=80&width=80",
      youtubeId: "kTJczUoc26U",
      upvotes: 156,
      downvotes: 14,
    },
    {
      id: "4",
      title: "Heat Waves",
      artist: "Glass Animals",
      thumbnail: "/placeholder.svg?height=80&width=80",
      youtubeId: "mRD0-GxqHVo",
      upvotes: 87,
      downvotes: 9,
    },
    {
      id: "5",
      title: "Bad Habits",
      artist: "Ed Sheeran",
      thumbnail: "/placeholder.svg?height=80&width=80",
      youtubeId: "orJSJGHjBLI",
      upvotes: 112,
      downvotes: 18,
    },
  ]

  const [tracks, setTracks] = useState<Track[]>(initialTracks)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Sort tracks by upvotes and set initial current track
  useEffect(() => {
    const sortedTracks = [...tracks].sort((a, b) => b.upvotes - a.upvotes)
    setTracks(sortedTracks)
    if (!currentTrack && sortedTracks.length > 0) {
      setCurrentTrack(sortedTracks[0])
    }
  }, [])

  const REFRESH_INTERVAL = 10 * 1000
  const refreshStream = async () => {
        const res = await fetch(`/api/streams/my`,{
            method:"GET"
        });
        const data = await res.json()
        console.log(data)
  }
  
  useEffect(()=>{   
      refreshStream()
    const interval = setInterval(()=>{

    },REFRESH_INTERVAL)
  },[])

  // Handle voting
  const handleVote = (id: string, isUpvote: boolean) => {
    setTracks((prevTracks) =>
      prevTracks
        .map((track) => {
          if (track.id === id) {
            if (isUpvote) {
              return { ...track, upvotes: track.upvotes + 1 }
            } else {
              return { ...track, downvotes: track.downvotes + 1 }
            }
          }
          return track
        })
        .sort((a, b) => b.upvotes - a.upvotes),
    )
  }

  const shareTrackList = () => {
    if (navigator.share) {
      const shareText = tracks
        .map((track, index) => `${index + 1}. ${track.title} by ${track.artist}`)
        .join("\n")
  
      navigator
        .share({
          title: "Check out this playlist!",
          text: `Here’s a cool playlist:\n${shareText}\n\nListen now: ${window.location.href}`,
          url: window.location.href,
        })
        .then(() => console.log("Playlist shared successfully!"))
        .catch((error) => console.error("Error sharing:", error))
    } else {
      alert("Sharing not supported on this device.")
    }
  }
  

  // Play a track
  const playTrack = (track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  // Skip to next track
  const playNextTrack = () => {
    if (!currentTrack || tracks.length === 0) return

    const currentIndex = tracks.findIndex((track) => track.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % tracks.length
    setCurrentTrack(tracks[nextIndex])
  }

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80">
      <AppBar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Main Player Section */}
        <Button variant="outline" size="sm" onClick={shareTrackList}>
            Share Playlist
        </Button>

        <section className="mb-12">
          <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-primary/10">
            <div className="grid md:grid-cols-[1fr_400px] gap-6 p-6">
              {/* YouTube Embed */}
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                {currentTrack && (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>

              {/* Now Playing Info */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Now Playing</h2>
                  {currentTrack ? (
                    <div className="flex items-start gap-4">
                      <Image
                        src={currentTrack.thumbnail || "/placeholder.svg"}
                        alt={currentTrack.title}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{currentTrack.title}</h3>
                        <p className="text-muted-foreground">{currentTrack.artist}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm text-green-500 font-medium">{currentTrack.upvotes} upvotes</span>
                          <span className="text-sm text-red-500 font-medium">{currentTrack.downvotes} downvotes</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No track selected</p>
                  )}
                </div>

                {/* Player Controls */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={togglePlayPause} className="rounded-full h-12 w-12">
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={playNextTrack} className="rounded-full">
                      <SkipForward className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" onClick={toggleMute} className="rounded-full">
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
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
            {tracks.map((track) => (
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
                      onClick={() => handleVote(track.id, true)}
                      className="h-8 w-8 rounded-full text-green-500 hover:text-green-600 hover:bg-green-100"
                    >
                      <ArrowBigUp className="h-5 w-5" />
                    </Button>
                    <span className="font-medium text-sm">{track.upvotes - track.downvotes}</span>
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
                  <div className="relative cursor-pointer" onClick={() => playTrack(track)}>
                    <Image
                      src={track.thumbnail || "/placeholder.svg"}
                      alt={track.title}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Track Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold">{track.title}</h3>
                    <p className="text-sm text-muted-foreground">{track.artist}</p>
                  </div>

                  {/* Play Button (visible on mobile) */}
                  <Button variant="ghost" size="icon" onClick={() => playTrack(track)} className="md:hidden">
                    <Play className="h-5 w-5" />
                  </Button>
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

