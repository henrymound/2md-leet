'use client'
import {Inter} from 'next/font/google'
import React from "react";
import Head from "next/head";
import "tailwindcss/tailwind.css"

const inter = Inter({subsets: ['latin']})

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout(props: {
    children: React.ReactNode
}) {
    const meta = {
        title: "2MD",
        description: "2MD",
    }
    return (
        <html lang={"en"}>
        <Head>
            <title>{meta.title}</title>
            <meta charSet="utf-8"/>
            <meta content="IE=edge" httpEquiv="X-UA-Compatible"/>
            <meta content="width=device-width, initial-scale=1" name="viewport"/>
            <meta name="robots" content="follow, index"/>
            <meta content={meta.description} name="description"/>
            <meta property="og:type" content="website"/>
            <meta property="og:site_name" content={meta.title}/>
            <meta property="og:description" content={meta.description}/>
            <meta property="og:title" content={meta.title}/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content="@vercel"/>
            <meta name="twitter:title" content={meta.title}/>
            <meta name="twitter:description" content={meta.description}/>
        </Head>
        <body className="bg-gray-100">
        {props.children}
        </body>
        </html>
    )
}