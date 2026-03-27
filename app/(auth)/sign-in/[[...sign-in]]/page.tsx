import { SignIn } from "@clerk/nextjs"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({ title: "Sign In" })

export default function SignInPage() {
  return <SignIn />
}
