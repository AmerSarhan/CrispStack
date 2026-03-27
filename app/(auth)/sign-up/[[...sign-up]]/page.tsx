import { SignUp } from "@clerk/nextjs"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({ title: "Sign Up" })

export default function SignUpPage() {
  return <SignUp />
}
