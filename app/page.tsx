'use client'

import { useAuth } from '@/components/contexts/auth-context'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import { useRouter } from 'next/navigation'

export default function Home() {
    const { user } = useAuth() ?? {}
    const router = useRouter()

    return (
        <div className="flex flex-col flex-1 font-sans p-5">
            <div className="flex justify-end w-full gap-5">
                {!!isNil(user) && (
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

                {!isNil(user) && (
                    <Badge
                        variant={'destructive'}
                        className={'w-fit text-base text-zinc-200'}
                    >
                        {get(user, 'name')}
                    </Badge>
                )}

                {!isNil(user) && (
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
