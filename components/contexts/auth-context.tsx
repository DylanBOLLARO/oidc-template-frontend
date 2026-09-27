'use client'

import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

// Create context
const AuthContext = createContext<any>(undefined)

// Create a provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getLoginUser = async () => {
            try {
                const res = (
                    await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`,
                        {
                            withCredentials: true,
                        }
                    )
                )?.data
                setUser(res)
            } catch (error) {
                setUser(null)
                console.log(error)
            }
        }
        getLoginUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
