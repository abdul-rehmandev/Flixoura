import User from '@/lib/models/user.model';
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const evt = await verifyWebhook(req)

        if (evt.type === 'user.created') {
            const { first_name, last_name, image_url, email_addresses, id } = evt?.data;

            const existingUser = await User.findOne({ email: email_addresses });

            if (!existingUser) {
                const newUser = new User({
                    clerkId: id,
                    email: email_addresses,
                    firstName: first_name,
                    lastName: last_name,
                    profilePictue: image_url
                });

                await newUser.save();
            }
            else {
                return NextResponse.json({ message: "Existing User SignedIn Successfully" })
            }
        }

        return new Response('Webhook received', { status: 200 })
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}