import React from 'react'
import { useRef, useState, useEffect } from 'react';


const Manager = () => {
    const ref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })




    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showPassword = () => {
        alert("show the password");
        console.log(ref.current.src)
        if (ref.current.src.includes("/hidden.png")) {
            ref.current.src = "/eye.png"
        }
        else {
            ref.current.src = "/hidden.png"
        }
    }

    const savePassword = () => {
        setPasswordArray([...passwordArray, form])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        console.log(passwordArray)
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
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
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1 text-black' type="text" name="site" id="" />
                    <div className='flex w-full justify-between gap-8'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1 text-black' type="text" autoComplete='off' name="username" id="" />

                        <div className='relative w-full'>

                            <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1 text-black' type="text" name="password" id="" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900'> <lord-icon
                        src="https://cdn.lordicon.com/bjxtqill.json"
                        trigger="hover"
                        colors="primary:#121331,secondary:#242424">
                    </lord-icon>
                        Add Password</button>
                </div>
                <div className='passwords'>
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 &&
                    <table className='table-auto w-full rounded-md overflow-hidden'>
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>

                            {passwordArray.map((item, index) => (
                                <tr key={index}>
                                <td className='py-2 border border-white text-center w-32'><a href={item.site} target='_blank'>{item.site}</a></td>
                                <td className='py-2 border border-white text-center w-32'>{item.username}</td>
                                <td className='py-2 border border-white text-center w-32'>{item.password }</td>
                            </tr>
                            ))}
                            
                            
                        </tbody>
                    </table>}

                </div>
            </div></>
    )
}

export default Manager
