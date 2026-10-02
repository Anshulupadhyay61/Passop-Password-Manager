import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { v4 as uuidv4 } from "uuid"

const API_URL = import.meta.env.VITE_API_URL

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()

    const [form, setform] = useState({
        site: "",
        username: "",
        password: "",
        id: ""
    })

    const [passwordArray, setPasswordArray] = useState([])

    // =========================
    // FETCH PASSWORDS
    // =========================
    useEffect(() => {
        fetchPasswords()
    }, [])

    const fetchPasswords = async () => {
        try {
            const response = await fetch(API_URL)

            if (!response.ok) {
                throw new Error("Failed to fetch passwords")
            }

            const data = await response.json()

            setPasswordArray(data)

        } catch (error) {
            console.error("Fetch Error:", error)

            toast.error("Could not load passwords from server!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            })
        }
    }

    // =========================
    // COPY TEXT
    // =========================
    const copyText = (text) => {
        navigator.clipboard.writeText(text)

        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }

    // =========================
    // SHOW / HIDE PASSWORD
    // =========================
    const showPassword = () => {
        if (passwordRef.current.type === "password") {
            passwordRef.current.type = "text"

            ref.current.src =
                "https://static.thenounproject.com/png/2255759-200.png"
        } else {
            passwordRef.current.type = "password"

            ref.current.src =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-d6XBWXWM7BzAy_wkBgThQ9tPSaepj73jTg&s"
        }
    }

    // =========================
    // SAVE / UPDATE PASSWORD
    // =========================
    const savePassword = async () => {

        if (
            form.site.trim().length > 3 &&
            form.username.trim().length > 3 &&
            form.password.trim().length > 3
        ) {

            try {

                // =========================
                // UPDATE EXISTING PASSWORD
                // =========================
                if (form.id) {

                    const response = await fetch(
                        `${API_URL}/${form.id}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                site: form.site,
                                username: form.username,
                                password: form.password
                            })
                        }
                    )

                    if (!response.ok) {
                        throw new Error("Failed to update password")
                    }

                    const updatedEntry = await response.json()

                    setPasswordArray(prev =>
                        prev.map(item =>
                            item.id === updatedEntry.id
                                ? updatedEntry
                                : item
                        )
                    )

                    toast.success('Password updated!', {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "dark",
                    })

                }

                // =========================
                // CREATE NEW PASSWORD
                // =========================
                else {

                    const newEntry = {
                        site: form.site,
                        username: form.username,
                        password: form.password,
                        id: uuidv4()
                    }

                    const response = await fetch(
                        API_URL,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newEntry)
                        }
                    )

                    if (!response.ok) {
                        throw new Error("Failed to save password")
                    }

                    const savedEntry = await response.json()

                    setPasswordArray(prev => [
                        ...prev,
                        savedEntry
                    ])

                    toast.success('Password saved!', {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "dark",
                    })
                }

                // Clear form
                setform({
                    site: "",
                    username: "",
                    password: "",
                    id: ""
                })

            } catch (error) {

                console.error("Save Error:", error)

                toast.error("Something went wrong while saving!", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark"
                })
            }

        } else {

            toast.error('Please Enter Valid Details!', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            })
        }
    }

    // =========================
    // DELETE PASSWORD
    // =========================
    const deletePassword = async (id) => {

        const confirmed = confirm(
            "Do you really want to delete this password?"
        )

        if (!confirmed) return

        try {

            const response = await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            )

            if (!response.ok) {
                throw new Error("Failed to delete password")
            }

            setPasswordArray(prev =>
                prev.filter(item => item.id !== id)
            )

            toast('Password Deleted Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

        } catch (error) {

            console.error("Delete Error:", error)

            toast.error("Could not delete password!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            })
        }
    }

    // =========================
    // EDIT PASSWORD
    // =========================
    const editPassword = (id) => {

        const selectedPassword =
            passwordArray.find(item => item.id === id)

        if (!selectedPassword) return

        setform({
            id: selectedPassword.id,
            site: selectedPassword.site,
            username: selectedPassword.username,
            password: selectedPassword.password
        })

        toast('Password ready for editing!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }

    // =========================
    // HANDLE INPUT CHANGE
    // =========================
    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
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
            />

            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className="p-2 md:p-0 md:mycontainer">

                <h1 className='text-4xl text font-bold text-center'>

                    <span className='text-green-700'>
                        &lt;
                    </span>

                    <span className='text-white'>
                        Pass
                    </span>

                    <span className='text-green-500'>
                        OP/ &gt;
                    </span>

                </h1>

                <p className='text-green-100 text-lg text-center'>
                    Your own password manager
                </p>


                <div className='flex flex-col p-4 text-black gap-8 items-center'>

                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder='Enter Website URL'
                        className='rounded-full border border-green-500 w-full p-4 py-1'
                        type="text"
                        name="site"
                        id="site"
                    />

                    <div className='flex flex-col md:flex-row w-full justify-between gap-3'>

                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder='Enter UserName'
                            className='rounded-full border border-green-500 w-full p-4 py-1'
                            type="text"
                            name="username"
                            id="username"
                        />

                        <div className="relative">

                            <input
                                ref={passwordRef}
                                value={form.password}
                                onChange={handleChange}
                                placeholder='Enter Password'
                                className='rounded-full border border-green-500 w-full p-4 py-1'
                                type="password"
                                name="password"
                                id="password"
                            />

                            <span
                                className='absolute right-[3px] top-[4px] cursor-pointer'
                                onClick={showPassword}
                            >

                                <img
                                    ref={ref}
                                    className='p-1'
                                    width={26}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-d6XBWXWM7BzAy_wkBgThQ9tPSaepj73jTg&s"
                                    alt="eye"
                                />

                            </span>

                        </div>

                    </div>


                    <button
                        onClick={savePassword}
                        className='flex justify-center items-center bg-green-400 hover:bg-green-500 rounded-full px-8 py-2 w-fit gap-2 border border-green-900'
                    >

                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>

                        {form.id ? "Update" : "Save"}

                    </button>

                </div>


                <div className="passwords text-black">

                    <h2 className='text-white font-bold text-2xl py-4'>
                        Your Passwords
                    </h2>


                    {passwordArray.length === 0 &&
                        <div className='text-white'>
                            No password to show
                        </div>
                    }


                    {passwordArray.length !== 0 &&

                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">

                            <thead className='bg-green-800 texw'>

                                <tr>

                                    <th className='py-2'>
                                        Site
                                    </th>

                                    <th className='py-2'>
                                        Username
                                    </th>

                                    <th className='py-2'>
                                        Password
                                    </th>

                                    <th className='py-2'>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody className='bg-green-100'>

                                {passwordArray.map((item) => {

                                    return (

                                        <tr key={item.id}>

                                            {/* Site */}

                                            <td className='py-2 border border-white text-center w-32'>

                                                <div className='flex justify-center items-center gap-2'>

                                                    <a
                                                        href={item.site}
                                                        target='_blank'
                                                        rel="noreferrer"
                                                    >
                                                        {item.site}
                                                    </a>

                                                    <span
                                                        className='lordiconcopy cursor-pointer'
                                                        onClick={() =>
                                                            copyText(item.site)
                                                        }
                                                    >

                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            colors="primary:#121331,secondary:#16a34a"
                                                            style={{
                                                                width: "20px",
                                                                height: "20px"
                                                            }}
                                                        >
                                                        </lord-icon>

                                                    </span>

                                                </div>

                                            </td>


                                            {/* Username */}

                                            <td className='py-2 border border-white text-center w-32'>

                                                <div className='flex justify-center items-center gap-2'>

                                                    {item.username}

                                                    <span
                                                        className='lordiconcopy cursor-pointer'
                                                        onClick={() =>
                                                            copyText(item.username)
                                                        }
                                                    >

                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            colors="primary:#121331,secondary:#16a34a"
                                                            style={{
                                                                width: "20px",
                                                                height: "20px"
                                                            }}
                                                        >
                                                        </lord-icon>

                                                    </span>

                                                </div>

                                            </td>


                                            {/* Password */}

                                            <td className='py-2 border border-white text-center w-32'>

                                                <div className='flex justify-center items-center gap-2'>

                                                    {item.password}

                                                    <span
                                                        className='lordiconcopy cursor-pointer'
                                                        onClick={() =>
                                                            copyText(item.password)
                                                        }
                                                    >

                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            colors="primary:#121331,secondary:#16a34a"
                                                            style={{
                                                                width: "20px",
                                                                height: "20px"
                                                            }}
                                                        >
                                                        </lord-icon>

                                                    </span>

                                                </div>

                                            </td>


                                            {/* Actions */}

                                            <td className='py-2 border border-white text-center w-32'>

                                                <span
                                                    className='cursor-pointer mx-1'
                                                    onClick={() =>
                                                        editPassword(item.id)
                                                    }
                                                >

                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="morph"
                                                        state="morph-pencil"
                                                        colors="primary:#000000,secondary:#22c55e"
                                                        style={{
                                                            width: "26px",
                                                            height: "26px"
                                                        }}
                                                    >
                                                    </lord-icon>

                                                </span>


                                                <span
                                                    className='cursor-pointer mx-1'
                                                    onClick={() =>
                                                        deletePassword(item.id)
                                                    }
                                                >

                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="morph"
                                                        colors="primary:#000000,secondary:#ef4444"
                                                        style={{
                                                            width: "24px",
                                                            height: "24px"
                                                        }}
                                                    >
                                                    </lord-icon>

                                                </span>

                                            </td>

                                        </tr>

                                    )

                                })}

                            </tbody>

                        </table>

                    }

                </div>

            </div>

        </>

    )
}

export default Manager