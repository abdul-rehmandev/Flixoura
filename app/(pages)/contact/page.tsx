"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { contactUs, suggestion } from '@/actions/contact.actions'
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"

const Contact = () => {
    const { user, isLoaded } = useUser();
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [message, setMessgae] = useState<string>("")
    const [suggestionMessage, setSuggestionMessgae] = useState<string>("")
    const [isSuggestionLoading, setIsSuggestionLoading] = useState<boolean>(false)
    const [isContactLoading, setIsContactLoading] = useState<boolean>(false)

    useEffect(() => {
        if (isLoaded && user) {
            setFirstName(user.firstName || "")
            setLastName(user.lastName || "")
            setEmail(user.primaryEmailAddress?.emailAddress || "")
        }
    }, [isLoaded, user])

    const contactQuery = async () => {
        if (!firstName || !email || !message) return toast("All fields required")
        setIsContactLoading(true)
        const contactDetails = {
            firstName,
            lastName,
            email,
            message
        }

        const newQuery = await contactUs(contactDetails)

        if (newQuery) {
            setIsContactLoading(false)
            return toast("Submitted Successfully")
        }
        setIsContactLoading(false)
    }

    const sendSuggestionMessage = async () => {
        if (!suggestionMessage) return toast("Please write some suggestion before submit.")
        setIsSuggestionLoading(true)
        const suggestionM = {
            suggestionMessage
        }

        const newSuggestion = await suggestion(suggestionM);

        if (newSuggestion) {
            setSuggestionMessgae("")
            setIsSuggestionLoading(false)
            return toast("Submitted Successfully")
        }
        setIsSuggestionLoading(false)
    }

    return (
        <div className="container w-full min-h-[91vh] py-8 px-4 md:px-6 lg:px-8 flex items-center justify-center">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full max-w-7xl">
                {/* Content Section */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold'>Contact Us</h1>
                    <p className='w-full lg:w-[90%] text-sm md:text-base'>For inquiries, support, or further information, please contact us using the form below or through our official communication channels.</p>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className='p-4 bg-gray-50 rounded-lg'>
                            <h3 className='font-semibold mb-2'>Submit Your Inquiry</h3>
                            <small className='text-sm'>Fill out the contact form with accurate details, including your name, email address, and message. This helps us understand your request clearly.</small>
                        </div>
                        <div className='p-4 bg-gray-50 rounded-lg'>
                            <h3 className='font-semibold mb-2'>Review and Response</h3>
                            <small className='text-sm'>Our support team reviews all submissions promptly and ensures that your inquiry is directed to the appropriate department.</small>
                        </div>
                        <div className='p-4 bg-gray-50 rounded-lg'>
                            <h3 className='font-semibold mb-2'>Personalized Assistance</h3>
                            <small className='text-sm'>Once reviewed, our team will reach out with a tailored response or solution to address your specific inquiry or concern.</small>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <h2 className='text-xl md:text-2xl font-semibold mb-2'>Share Your Suggestions</h2>
                        <small className='text-sm'>We value your feedback. If you have ideas or suggestions on how we can improve our website or services, please feel free to include them in your message. Your input helps us serve you better.</small>
                        <div className='flex flex-col sm:flex-row items-center gap-2 mt-4'>
                            <Input type="text" placeholder="Have an idea for us? We'd love to hear it..." className='w-full' value={suggestionMessage} onChange={(e) => setSuggestionMessgae(e.target.value)} />
                            <Button className='w-full sm:w-auto cursor-pointer' onClick={sendSuggestionMessage} disabled={isSuggestionLoading}>
                                {isSuggestionLoading ? "Submitting..." : "Submit Suggestion"}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <Card className="w-full max-w-[350px]">
                        <CardHeader>
                            <CardTitle className='text-2xl md:text-3xl'>Get in touch</CardTitle>
                            <CardDescription>You can reach us anytime.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="f_name">First Name</Label>
                                    <Input
                                        id="f_name"
                                        placeholder="Enter your first name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        readOnly={!!user}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="l_name">Last Name</Label>
                                    <Input
                                        id="l_name"
                                        placeholder="Enter your last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        readOnly={!!user}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="f_name">Email</Label>
                                    <Input
                                        id="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        readOnly={!!user}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="message">How can we help you?</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Type your message here."
                                        value={message}
                                        onChange={(e) => setMessgae(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className='flex flex-col text-center'>
                            <Button className='w-full cursor-pointer' onClick={contactQuery} disabled={isContactLoading}>
                                {isContactLoading ? "Submitting..." : "Submit"}
                            </Button>
                            <small className='mt-2'>By submitting this form, you agree to our <b>Terms of Service</b> and consent to being contacted regarding your inquiry.</small>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Contact