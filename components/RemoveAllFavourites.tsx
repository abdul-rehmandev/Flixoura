"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { RemoveAllFromFavourites } from '@/actions/addtofavourites.actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface ThisTypes {
    userEmail: string;
}

const RemoveAllFavourites = ({ userEmail }: ThisTypes) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleRemove = async () => {
        setIsLoading(true)
        try {
            const result = await RemoveAllFromFavourites(userEmail)
            if (result) {
                toast.success(result.message)
                router.refresh()
            }
        } catch (error) {
            toast.error("Failed to remove the favourite movies")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            className='w-full sm:w-auto cursor-pointer'
            onClick={handleRemove}
            disabled={isLoading}
        >
            {isLoading ? "Removing..." : "UnFavourite All Movies"}
        </Button>
    )
}

export default RemoveAllFavourites