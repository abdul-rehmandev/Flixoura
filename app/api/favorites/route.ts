import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Favourites from '@/lib/models/favourites';
import connectDB from '@/lib/mongodb/db';

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const userFavorites = await Favourites.findOne({ userEmail: userId });

        if (!userFavorites) {
            return NextResponse.json({ movieIDs: [] });
        }

        return NextResponse.json({ movieIDs: userFavorites.movieIDs });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 