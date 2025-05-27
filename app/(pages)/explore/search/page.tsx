import React from 'react'
import Card from '@/components/Card'
import Search from '@/components/Search'

interface PageProps {
    searchParams: Promise<{ q: string }>
}

const SearchPage = async ({ searchParams }: PageProps) => {
    const params = await searchParams;
    const query = params.q;

    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US`
    )
    const data = await res.json()

    if (!res.ok) {
        throw new Error('Failed to fetch search results')
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Search />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold mb-6">
                Search Results for: {query}
            </h1>
            {data.results.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {data.results.map((result: ResultTypes) => (
                        <Card key={result.id} result={result} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg">No results found for your search.</p>
            )}
        </div>
    )
}

export default SearchPage 