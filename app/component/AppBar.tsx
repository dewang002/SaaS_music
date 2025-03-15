'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const AppBar = () => {
    const session = useSession()
  return (
    <div className='py-4 border-b flex justify-between items-center px-4'>
        <div>MuzeD</div>
        {session.data?.user && <button className='rounded p-2 bg-blue-700 text-white' onClick={()=>signOut()}>logOut</button> }
        {!session.data?.user && <button className='rounded p-2 bg-blue-700 text-white' onClick={()=>signIn()}>signin</button>}
    </div>
  )
}

export default AppBar