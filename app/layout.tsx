import type { Metadata } from 'next';
import type {ReactNode} from 'react';
import './globals.css';
export const metadata:Metadata={title:'PRODUCT / ZERO | Operating desk',description:'AI Product Design Operating System. A working private pilot.',robots:{index:false,follow:false},referrer:'no-referrer'};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body>{children}</body></html>;}
