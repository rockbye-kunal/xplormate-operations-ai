import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'Xplormate | AI transformation for manufacturing operations',
 description: 'Explore where AI can reduce the follow-ups around production, quality, maintenance, and materials. Start with one workflow and a conversation with Xplormate.',
 openGraph: {title:'Your factory runs on processes. Too much still runs on follow-ups.',description:'AI transformation for manufacturing operations. Find a practical place to start with Xplormate.',type:'website'},
 icons:{icon:'/xplormate-logo.jpg',shortcut:'/xplormate-logo.jpg'},
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
