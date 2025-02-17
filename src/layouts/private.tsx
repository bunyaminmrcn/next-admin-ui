export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}
import Header from "@/components/built-in/header"
import EmulatorLoader from "@/components/built-in/emulator";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>
    <Header />
    <EmulatorLoader />
    {children}
    <Toaster />
  </>
  )
}
