"use client"

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'

const Search = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
    const debouncedSearch = useDebounce(searchQuery, 500)

    useEffect(() => {
        if (debouncedSearch) {
            router.push(`/explore/search?q=${encodeURIComponent(debouncedSearch)}`)
        }
    }, [debouncedSearch, router])

    return (
        <Input
            type="text"
            placeholder="Search your favourites"
            className='w-full'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    )
}

export default Search