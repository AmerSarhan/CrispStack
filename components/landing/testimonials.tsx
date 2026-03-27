import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    quote: "Finally, a starter that doesn't look like every other AI-generated template. The attention to design detail saved us weeks of polish work.",
    name: "Sarah Chen",
    role: "CTO at TechFlow",
    initials: "SC",
  },
  {
    quote: "We evaluated 20+ starters before choosing CrispStack. The dual theme system and SEO setup are exactly what we needed for our client projects.",
    name: "Marcus Rodriguez",
    role: "Lead Developer at PixelForge",
    initials: "MR",
  },
  {
    quote: "Clean code, no bloat, beautiful defaults. This is what a starter kit should be — a foundation, not a framework.",
    name: "Emily Park",
    role: "Indie Maker",
    initials: "EP",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by developers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what others are saying about CrispStack.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-border/50 bg-card/50">
              <CardContent className="pt-6">
                <blockquote className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
