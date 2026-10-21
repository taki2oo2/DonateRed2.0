import PostCampForm from "@/components/forms/PostCampForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const PostCampPage = () => {
    return (
        <main className="relative min-h-screen bg-zinc-50 dark:bg-[#050508] text-zinc-900 dark:text-white flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-x-hidden selection:bg-[#FB2C36]/20 selection:text-[#FB2C36] dark:selection:bg-[#FB2C36]/30 dark:selection:text-white transition-colors duration-300">
            {/* Ambient Background Glows & Lighting */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Top Center Primary Crimson Aura */}
                <div className="absolute -top-44 left-1/2 -translate-x-1/2 size-[700px] rounded-full bg-[#FB2C36]/10 dark:bg-[#FB2C36]/15 blur-[150px]" />
                {/* Bottom Right Secondary Warm Aura */}
                <div className="absolute -bottom-36 -right-36 size-[550px] rounded-full bg-[#FB2C36]/8 dark:bg-[#FB2C36]/10 blur-[140px]" />
                {/* Top Left Subtle Ambient Glow */}
                <div className="absolute top-1/3 -left-36 size-[450px] rounded-full bg-[#FB2C36]/4 dark:bg-[#FB2C36]/5 blur-[120px]" />
                {/* Top Beam Gradient */}
                <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#FB2C36]/8 via-[#FB2C36]/2 dark:from-[#FB2C36]/10 dark:via-[#FB2C36]/2 to-transparent" />
            </div>

            {/* Subtle Grid Pattern Overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-25 dark:opacity-15"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }}
            />

            <Card className="relative z-10 w-full max-w-3xl bg-white/90 dark:bg-[#0A0A0E]/90 border border-zinc-200/80 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_-10px_rgba(251,44,54,0.12)] backdrop-blur-2xl p-6 sm:p-10 overflow-hidden before:absolute before:top-0 before:inset-x-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#FB2C36] before:to-transparent transition-colors duration-300">
                <CardHeader className="p-0 mb-8 space-y-2">
                    <CardTitle className="font-heading text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl text-wrap: balance">
                        Post a New Blood Donation Camp
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-[65ch] text-wrap: pretty">
                        Organize a community event to save lives. Fill out the details below to publish your camp to the LifeStream network.
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                    <PostCampForm />
                </CardContent>
            </Card>
        </main>
    )
}

export default PostCampPage