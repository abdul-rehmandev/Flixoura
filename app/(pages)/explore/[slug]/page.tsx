import React from 'react'
import CategoryCheckbox from '@/components/CategoryCheckbox';
import Card from '@/components/Card';
import Search from '@/components/Search';

// Category configuration with display names and TMDB genre IDs
const Categories = [
    {
        name: "All-Categories",
        displayName: "All Categories",
        id: null
    },
    {
        name: "Trending",
        displayName: "Trending",
        id: null
    },
    {
        name: "Action",
        displayName: "Action",
        id: 28
    },
    {
        name: "Comedy",
        displayName: "Comedy",
        id: 35
    },
    {
        name: "Crime",
        displayName: "Crime",
        id: 80
    },
    {
        name: "Drama",
        displayName: "Drama",
        id: 18
    },
    {
        name: "Horror",
        displayName: "Horror",
        id: 27
    },
    {
        name: "Science-Fiction",
        displayName: "Science Fiction",
        id: 878
    },
    {
        name: "War",
        displayName: "War",
        id: 10752
    },
    {
        name: "Animation",
        displayName: "Animation",
        id: 16
    },
    {
        name: "Adventure",
        displayName: "Adventure",
        id: 12
    },
    {
        name: "Fantasy",
        displayName: "Fantasy",
        id: 14
    },
    {
        name: "Romance",
        displayName: "Romance",
        id: 10749
    },
    {
        name: "Thriller",
        displayName: "Thriller",
        id: 53
    }
];

const Explore = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    // Function to fetch movies by genre
    const getMoviesByGenre = async (genreId: number) => {
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&with_genres=${genreId}&sort_by=popularity.desc`);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to fetch movies for genre ${genreId}`);
        }
        return data.results;
    };

    // Fetch data based on slug
    let content;
    if (slug === "All-Categories") {
        // Get all categories with genre IDs
        const genreCategories = Categories.filter(category => category.id !== null);

        // Fetch movies for all genres
        const genreMovies = await Promise.all(
            genreCategories.map(category => getMoviesByGenre(category.id!))
        );

        content = (
            <div>
                {genreCategories.map((category, index) => (
                    <div key={index} className="mt-6">
                        <h2 className='text-2xl font-extrabold mb-4'>{category.displayName} Movies</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {genreMovies[index].map((result: ResultTypes, movieIndex: number) => (
                                <div key={movieIndex}>
                                    <Card result={result} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    } else if (slug === "Trending") {
        const trendingRes = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
        const trendingData = await trendingRes.json();
        if (!trendingRes.ok) {
            throw new Error("Failed to fetch trending data");
        }

        content = (
            <div className="mt-6">
                <h2 className='text-2xl font-extrabold mb-4'>Trending</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {trendingData.results.map((result: ResultTypes, index: number) => (
                        <div key={index}>
                            <Card result={result} />
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        // Handle individual category pages
        const category = Categories.find(cat => cat.name === slug);
        if (category && category.id) {
            const movies = await getMoviesByGenre(category.id);
            content = (
                <div className="mt-6">
                    <h2 className='text-2xl font-extrabold mb-4'>{category.displayName} Movies</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {movies.map((result: ResultTypes, index: number) => (
                            <div key={index}>
                                <Card result={result} />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    }

    return (
        <div className='container flex items-start'>
            <div className="sidebar w-[25%] p-2 sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto">
                <h3 className='font-semibold'>Search by name</h3>
                <Search />
                <h3 className='font-semibold mt-4'>Search by category</h3>
                {Categories.map((category, index) => (
                    <CategoryCheckbox key={index} category={category} />
                ))}
            </div>
            <div className="content w-[75%] p-2">
                {content}
            </div>
        </div>
    )
}

export default Explore