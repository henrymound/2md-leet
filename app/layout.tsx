'use client'
import {Inter} from 'next/font/google'
import React, {useEffect, useState} from "react";
import Head from "next/head";
import "tailwindcss/tailwind.css"
import {Box, createTheme, useMediaQuery} from "@mui/material";
import "./globals.css"
import {Stack, ThemeProvider} from "@mui/system";
import {ThemeToggle} from "@/components/ThemeToggle/ThemeToggle";

const inter = Inter({subsets: ['latin']})
const getInitialTheme = () => {
    if (typeof window !== 'undefined' &&
        window.localStorage) {

        const storedPrefs = window.localStorage.getItem('color-theme') ?? null
        if (storedPrefs) {
            return storedPrefs
        }

        const userMedia =
            window.matchMedia('(prefers-color-scheme: dark)')
        if (userMedia.matches) {
            return 'dark'
        }
    }

    // If you want to use light theme as the default,
    // return "light" instead
    return 'dark'
}
// export const metadata: Metadata = {
//     title: 'code.2md',
//     description: 'A collection of curated problems and solutions for software engineers.',
// }
const metadata = {
    title: 'code.2md',
    description: 'A collection of curated problems and solutions for software engineers.',
}

export default function RootLayout(props: {
    children: React.ReactNode
}) {
    const initialTheme = React.useMemo(() => getInitialTheme(), [])
    const meta = {
        title: metadata.title?.toString(),
        description: metadata.description?.toString(),
        image: 'https://code.2md.dev/og.png',
        type: 'website',
        date: '2021-09-03',
        url: 'https://code.2md.dev',
    }
    const [isDark, setIsDark] = useState(true);

    const systemPrefersDark = useMediaQuery(
        "(prefers-color-scheme: dark)",
        undefined
    );
    useEffect(() => {
        setIsDark(systemPrefersDark);
        console.log(systemPrefersDark)
    }, [systemPrefersDark]);
    useEffect(() => {
        console.log("isDark", isDark)
        window.localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
        if (isDark) {
            document.body.classList.add('dark');
            document.body.classList.remove('light');
        } else {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
        }
        // if (window === undefined) return
        // const root = window.document.documentElement
        // root.classList.remove(!isDark ? 'light' : 'dark')
        // root.classList.add(!isDark ? 'dark' : 'light')
    }, [isDark]);


    const darkTheme = createTheme({
        palette: {
            // mode: 'dark',
            // background: {
            //     default: "#000000",
            // },
            // text: {
            //     primary: "#ffffff"
            // }
        },
        typography: {
            fontFamily: "Inter, sans-serif"
        },
    })
    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            background: {
                default: "#ffffff",
            },
            text: {
                primary: "#000000"
            }
        },
        typography: {
            fontFamily: "Inter, sans-serif"
        },
    })
    const theme = darkTheme
    return (
        <html lang={"en"}
            // className={
            //     `${darkMode ? "dark" : "light"}`}
            //       style={{
            //     backgroundColor: theme.palette.background.default,
            //     color: theme.palette.text.primary,
            // }}
        >
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

        <body>
        <Box className="prose lg:prose-xl px-8 mx-auto mt-4">
            <Stack spacing={2} direction={"row-reverse"} width={"100%"}>
                <ThemeToggle isLightTheme={!isDark}
                             setThemeLight={(isLight) => {
                                 setIsDark(!isLight)
                             }}/>
            </Stack>
        </Box>

        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            {props.children}</ThemeProvider>
        </body>
        </html>
    )
}
