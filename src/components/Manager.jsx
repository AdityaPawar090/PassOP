import React from 'react'

const Manager = () => {
  return (
    <>
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

    <div className='container mx-auto bg-slate-50 mycontainer'>

        <h1>PassOP</h1>
        <p>Your own Password Manager</p>

        <div className='text-white flex flex-col p-4'>
            <input className='rounded-full' type="text" name="" id="" />
            <div className='flex'>
                <input type="text" />
                <input type="text" />
            </div>
        </div>
    </div></>
  )
}

export default Manager
