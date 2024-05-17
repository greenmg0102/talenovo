import { Html, Heading, Text } from "@react-email/components"

const JbPostEmailTemplate = ({
    name,
    email,
    message
}: {
    name: string
    email: string
    message: string
}) => {
    return (
        <Html lang="en">
            <Heading as="h1">Your job posting is checking up.</Heading>
            <Text>You just submitted a job. We will check soon.</Text>
            <Text>Name: {name}</Text>
            <Text>Email: {email}</Text>
            <Text>Message: {message}</Text>
        </Html>
    )
}
export default JbPostEmailTemplate