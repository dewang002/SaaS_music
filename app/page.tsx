import AppBar from "./component/AppBar";
import {
  ArrowRight,
  CheckCircle,
  Disc,
  Facebook,
  Headphones,
  Instagram,
  Menu,
  Music,
  Play,
  Radio,
  Twitter,
  Volume2,
  Youtube,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main>
      <AppBar />
      
      {/* Header */}
      

      <main className="flex flex-col items-center md:px-50 bg-black/95">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-black to-zinc-900 border-b border-zinc-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center space-x-2 rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
                  <span className="inline-block h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
                  <span>Discover authentic creator music</span>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                    The <span className="text-purple-500">Oldschool</span> Way to Stream New Music
                  </h1>
                  <p className="max-w-[600px] text-zinc-400 md:text-xl">
                    VinylVerse brings back the golden age of music discovery. Connect with creators, build your
                    collection, and experience music the way it was meant to be heard.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button on size="lg" className="gap-1 bg-purple-600 hover:bg-purple-700 text-white">
                    Start Listening <Play className="h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-zinc-700 hover:bg-zinc-800 hover:text-purple-400"
                  >
                    Meet Our Creators
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center relative">
                <div className="absolute w-full h-full bg-purple-500/20 blur-3xl rounded-full"></div>
                <svg
    width="600"
    height="600"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
>
    <defs>
        <linearGradient id="musicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff00ff"/>
            <stop offset="50%" stop-color="#00ffff"/>
            <stop offset="100%" stop-color="#ffcc00"/>
        </linearGradient>
    </defs>

    <path
        d="M12 3V16.28A3.5 3.5 0 1 0 14 19V7h6V3h-8Z"
        fill="url(#musicGradient)">
        <animate
            attributeName="opacity"
            values="0;1;0"
            dur="2s"
            repeatCount="indefinite"
        />
    </path>
</svg>

              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-zinc-900 border-b border-zinc-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-500/20 px-3 py-1 text-sm text-purple-300">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">
                  Rediscover the Art of Listening
                </h2>
                <p className="max-w-[700px] text-zinc-400 md:text-xl">
                  VinylVerse combines the warmth of vintage audio with modern streaming convenience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-zinc-800 bg-zinc-950/50 p-6 backdrop-blur">
                <div className="rounded-full bg-purple-500/20 p-2 text-purple-400">
                  <Headphones className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Creator Collections</h3>
                <p className="text-center text-zinc-400">
                  Browse curated collections from your favorite music creators, organized like vinyl records.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-zinc-800 bg-zinc-950/50 p-6 backdrop-blur">
                <div className="rounded-full bg-purple-500/20 p-2 text-purple-400">
                  <Volume2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Vintage Sound Processing</h3>
                <p className="text-center text-zinc-400">
                  Experience optional vinyl warmth, tape saturation, and analog-inspired sound processing.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-zinc-800 bg-zinc-950/50 p-6 backdrop-blur">
                <div className="rounded-full bg-purple-500/20 p-2 text-purple-400">
                  <Radio className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Direct Creator Support</h3>
                <p className="text-center text-zinc-400">
                  Your subscription directly supports the creators you listen to most, just like buying their records.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Creators Section */}
        <section id="creators" className="w-full py-12 md:py-24 lg:py-32 bg-black border-b border-zinc-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-500/20 px-3 py-1 text-sm text-purple-300">
                  Featured Creators
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">
                  Voices That Define Our Sound
                </h2>
                <p className="max-w-[700px] text-zinc-400 md:text-xl">
                  Discover the artists who are pushing boundaries and creating the soundtrack to your life.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Creator 1 */}
              <div className="flex flex-col justify-between rounded-lg border border-zinc-800 bg-zinc-950/50 p-6 backdrop-blur">
                <div className="space-y-4">
                  <div className="relative h-48 w-full overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Midnight Echo"
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">Midnight Echo</h3>
                  <p className="text-zinc-400">
                    "VinylVerse has connected me with listeners who truly appreciate the craft behind my synthwave
                    productions."
                  </p>
                </div>
                <Button variant="outline" className="mt-4 border-zinc-700 hover:bg-zinc-800 hover:text-purple-400">
                  <Music className="mr-2 h-4 w-4" /> Browse Collection
                </Button>
              </div>

              {/* Creator 2 */}
              <div className="flex flex-col justify-between rounded-lg border border-zinc-800 bg-zinc-950/50 p-6 backdrop-blur">
                <div className="space-y-4">
                  <div className="relative h-48 w-full overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Analog Dreams"
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">Analog Dreams</h3>
                  <p className="text-zinc-400">
                    "I love how VinylVerse lets me organize my tracks like sides of a record. It's brought back the
                    album experience."
                  </p>
                </div>
                <Button variant="outline" className="mt-4 border-zinc-700 hover:bg-zinc-800 hover:text-purple-400">
                  <Music className="mr-2 h-4 w-4" /> Browse Collection
                </Button>
              </div>

              {/* Creator 3 */}
              <div className="flex flex-col justify-between rounded-lg border border-zinc-800 bg-zinc-950/50 p-6 backdrop-blur">
                <div className="space-y-4">
                  <div className="relative h-48 w-full overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Cassette Culture"
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">Cassette Culture</h3>
                  <p className="text-zinc-400">
                    "The direct support from fans has allowed me to invest in vintage equipment and create more
                    authentic lo-fi sounds."
                  </p>
                </div>
                <Button variant="outline" className="mt-4 border-zinc-700 hover:bg-zinc-800 hover:text-purple-400">
                  <Music className="mr-2 h-4 w-4" /> Browse Collection
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-zinc-900 border-b border-zinc-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-500/20 px-3 py-1 text-sm text-purple-300">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">
                  Choose Your Listening Experience
                </h2>
                <p className="max-w-[700px] text-zinc-400 md:text-xl">
                  From casual listeners to dedicated audiophiles, we have a plan that fits your style.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              {/* Listener Plan */}
              <div className="flex flex-col rounded-lg border border-zinc-800 bg-zinc-950/50 p-6 backdrop-blur">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Listener</h3>
                  <p className="text-zinc-400">For casual music explorers.</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-white">$5</span>
                  <span className="ml-1 text-zinc-400">/month</span>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="text-zinc-300">Stream unlimited music</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="text-zinc-300">Basic sound quality</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="text-zinc-300">Create custom playlists</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="text-zinc-300">Mobile listening</span>
                  </li>
                </ul>
                <Button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
              </div>

              {/* Collector Plan */}
              <div className="flex flex-col rounded-lg border border-purple-700 bg-zinc-950/50 p-6 backdrop-blur relative">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Collector</h3>
                  <p className="text-zinc-400">For dedicated music enthusiasts.</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-white">$12</span>
                  <span className="ml-1 text-zinc-400">/month</span>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="text-zinc-300">Everything in Listener</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="text-zinc-300">High-fidelity audio</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="text-zinc-300">Vintage sound processing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="text-zinc-300">Offline listening</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="text-zinc-300">Creator exclusives</span>
                  </li>
                </ul>
                <Button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
              </div>

              {/* Audiophile Plan */}
              <div className="flex flex-col rounded-lg border border-zinc-800 bg-zinc-950/50 p-6 backdrop-blur">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Audiophile</h3>
                  <p className="text-zinc-400">For the ultimate listening experience.</p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold text-white">$20</span>
                  <span className="ml-1 text-zinc-400">/month</span>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="text-zinc-300">Everything in Collector</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="text-zinc-300">Studio master quality</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="text-zinc-300">Advanced EQ controls</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="text-zinc-300">Early access to releases</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="text-zinc-300">Virtual listening rooms</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="text-zinc-300">Creator live sessions</span>
                  </li>
                </ul>
                <Button className="mt-6 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-black border-b border-zinc-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">
                  Ready to Experience Music Differently?
                </h2>
                <p className="max-w-[700px] text-zinc-400 md:text-xl">
                  Join thousands of listeners who have rediscovered the joy of intentional music listening.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1 bg-purple-600 hover:bg-purple-700 text-white">
                  Start Your Free Trial <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-zinc-700 hover:bg-zinc-800 hover:text-purple-400">
                  Browse Creator Collections
                </Button>
              </div>
              <p className="text-sm text-zinc-500">No credit card required. 7-day free trial.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800 bg-black py-12 md:px-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Disc className="h-8 w-8 text-purple-500" />
                <span className="text-xl font-bold tracking-wider text-white">
                  VINYL<span className="text-purple-500">VERSE</span>
                </span>
              </div>
              <p className="text-sm text-zinc-400">Rediscover the art of listening.</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
                <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                    For Listeners
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                    For Creators
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                    Devices
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                    Sound Quality
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                    Creator Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                    Listening Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-purple-400 transition-colors">
                    Vinyl Care
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
            <p>© {new Date().getFullYear()} VinylVerse. All rights reserved.</p>
            <div className="mt-2 flex justify-center space-x-4">
              <Link href="#" className="hover:text-purple-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-purple-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-purple-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
