'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
    const [loginUser, setloginUser] = useState(null)
    const router = useRouter()

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
                setloginUser(res)
            } catch (error) {
                setloginUser(null)
                console.log(error)
            }
        }
        getLoginUser()
    }, [])

    return (
        <div className="flex flex-col flex-1 font-sans p-5">
            <div className="flex justify-end w-full gap-5">
                {!!isNil(loginUser) && (
                    <Button
                        onClick={() =>
                            router.push(
                                `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`
                            )
                        }
                        className={'w-fit text-base'}
                        size={'lg'}
                    >
                        Login
                    </Button>
                )}

                {!isNil(loginUser) && (
                    <Badge
                        variant={'destructive'}
                        className={'w-fit text-base text-zinc-200'}
                    >
                        {get(loginUser, 'name')}
                    </Badge>
                )}

                {!isNil(loginUser) && (
                    <Button
                        onClick={() =>
                            router.push(
                                `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`
                            )
                        }
                        className={'w-fit text-base'}
                        size={'lg'}
                    >
                        Logout
                    </Button>
                )}
            </div>
        </div>
    )
}
