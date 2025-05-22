import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest, NextResponse } from 'next/server'
import { clerkClient } from "@clerk/nextjs/server";
import { createUser } from "@/actions/user.actions"

export async function POST(req: NextRequest) {

    try {
        const evt = await verifyWebhook(req)

        if (evt.type === 'user.created') {
            const userInfo = evt.data;

            const user = {
                clerkId: userInfo.id,
                email: userInfo.email_addresses[0].email_address,
                firstName: userInfo.first_name || "",
                lastName: userInfo.last_name || "",
                profilePicture: userInfo.image_url
            };

            const newUser = await createUser(user);

            if (newUser) {
                await (await clerkClient()).users.updateUserMetadata(userInfo.id, {
                    publicMetadata: {
                        userId: newUser._id,
                    },
                });
            }

            return NextResponse.json({ message: "OK", user: newUser });
        }

        return new Response('Webhook received', { status: 200 })
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}