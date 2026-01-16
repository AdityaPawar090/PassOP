import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })


    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("/hidden.png")) {
            ref.current.src = "/eye.png"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "/hidden.png"
            passwordRef.current.type = "password"
        }
    }

    const savePassword = () => {
        if(form.site.length >3 && form.username.length >3 && form.password.length >3) {
            setPasswordArray([...passwordArray,{...form, id: uuidv4()}])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
        console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" })
        toast('Password saved', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        }
        else{
            toast('Error: Password not saved')
        }
        
    }

    const deletePassword = (id) => {
        console.log("Deleting with id", id)
        let c =confirm("Do you really want to delete this")
        if(c) {
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify([passwordArray.filter(item=>item.id!==id)]))
            toast('Password Deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        }
    }

    const editPassword = (id) => {
        console.log("Editing with id", id)
        setform(passwordArray.filter(i=>i.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="fixed inset-0 -z-10 bg-green-50  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>


            <div className='p-3 md:mycontainer min-h-[89.2vh]'>

                <h1 className='text-4xl font-bold text-center'><span className='text-green-700'>/&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span></h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className='text-white flex flex-col p-4 text-black gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1 text-black' type="text" name="site" id="site" />
                    <div className='flex flex-col md:flex-row w-full justify-between gap-8'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1 text-black' type="text" autoComplete='off' name="username" id="username" />

                        <div className='relative w-full'>

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1 text-black' type="password" name="password" id="password" />
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
                        Save</button>
                </div>
                <div className='passwords'>
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className='table-auto w-full rounded-md overflow-hidden mb-10'>
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>

                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'><a href={item.site} target='_blank'><span>{item.site}</span></a>
                                                <div className='size-7' onClick={() => copyText(item.site)}><FontAwesomeIcon
                                                    icon={faCopy}
                                                    className="ml-2 cursor-pointer text-black-700 hover:text-black-900"
                                                /></div>
                                            </div>

                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'><span>{item.username}</span>
                                                <div className='size-7' onClick={() => copyText(item.username)}><FontAwesomeIcon
                                                    icon={faCopy}
                                                    className="ml-2 cursor-pointer text-black-700 hover:text-black-900"
                                                /></div></div></td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'><span>{item.password}</span>
                                                <div className='size-7' onClick={() => copyText(item.password)}><FontAwesomeIcon
                                                    icon={faCopy}
                                                    className="ml-2 cursor-pointer text-black-700 hover:text-black-900"
                                                /></div></div></td>
                                                <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'><span onClick={() => {editPassword(item.id)}}><FontAwesomeIcon
  icon={faPenToSquare}
  className="cursor-pointer text-black-600 hover:text-black-800"
/> </span>
<span onClick={() => {deletePassword(item.id)}}>
<FontAwesomeIcon
  icon={faTrashCan}
  className="ml-3 cursor-pointer text-black-600 hover:text-black-800"
/>

</span>
                                                </div></td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>}

                </div>
            </div></>
    )
}

export default Manager
