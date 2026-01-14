import React from 'react'
import { useRef } from 'react';

const Manager = () => {
    const ref = useRef()
    const showPassword = (params) => {
        alert("show the password");
        if(ref.current.src.includes("/hidden.png")){
            ref.current.src = "/eye.png" 
        }
        else{
            ref.current.src = "/hidden.png" 
        }
    }
  return (
    <>
    <div className="fixed inset-0 -z-10 bg-green-50  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>


    <div className='mycontainer'>

        <h1 className='text-4xl font-bold text-center'><span className='text-green-700'>/&lt;</span>
        Pass
        <span className='text-green-500'>OP/&gt;</span></h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

        <div className='text-white flex flex-col p-4 text-black gap-8 items-center'>
            <input placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="" id=""/>
            <div className='flex w-full justify-between gap-8'>
                <input placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="" id=""/>

                <div className='relative w-full'>

                <input placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="" id=""/>
                <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                   <img ref={ref} className='p-1' width={26} src="/eye.png" alt="eye" />
                </span>
                </div>
            </div>
            <button className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900'> <lord-icon
                        src="https://cdn.lordicon.com/bjxtqill.json"
                        trigger="hover"
                        colors="primary:#121331,secondary:#242424">
                    </lord-icon>
            Add Password</button>
        </div>
    </div></>
  )
}

export default Manager
