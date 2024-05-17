"use server"
import { Resend } from "resend"
import JobPostTemplate from "./components/mailTemplate/jobPostTemplate"
import { render } from "@react-email/render"

interface State {
    error: string | null
    success: boolean
}

export const sendEmail = async (prevState: State) => {

    const name = "Galen Bowles"
    const email = "comantivirus250@gmail.com"
    const message = "It is testing mail"

    try {
        const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)
        await resend.emails.send({
            from: "noreply@talenovo.com",
            to: email,
            subject: "Job Postig alert!",
            react: render(JobPostTemplate({ name, email, message }))
        })
        return {
            error: null,
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            error: (error as Error).message,
            success: false
        }
    }
}