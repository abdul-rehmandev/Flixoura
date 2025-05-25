interface UserTypes {
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
}

interface ResultTypes {
    title: string;
    id: number;
    media_type: string;
    release_date: string;
    first_air_date: string;
    vote_average: any;
    poster_path: string;
    backdrop_path: string;
}

interface detailTypes {
    genres: Array<{
        name: string
    }>,
    original_title: string
    overview: string
    release_date: string
    runtime: number
    status: string
    tagline: string
    vote_average: number
    backdrop_path: string
    poster_path: string
    budget: number
    revenue: number
    original_language: string
    production_companies: Array<{
        name: string
        id: number
    }>
}