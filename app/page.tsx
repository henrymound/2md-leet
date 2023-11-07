'use client'
import {THEME_TO_BG} from "@/components/CodeSnippets";
import React, {useState} from "react";
import {Box, MenuItem, Select} from "@mui/material";


export default function Home() {
    const [theme, setTheme] = useState<THEME_TO_BG>(THEME_TO_BG.TOMORROW)

    return (
        <main>
            <Box className="flex min-h-screen flex-col items-center justify-between p-24" bgcolor={"white"}>
                <Select
                    labelId="select-theme-label"
                    id="select-theme"
                    value={theme}
                    label="theme"
                    onChange={(event) => {
                        setTheme(event.target.value as THEME_TO_BG)
                    }}
                >
                    <MenuItem value={THEME_TO_BG.PRISM_OKAIDIA}>Okaidia</MenuItem>
                    <MenuItem value={THEME_TO_BG.PRISM_FUNKY}>Funky</MenuItem>
                    <MenuItem value={THEME_TO_BG.TOMORROW}>Tomorrow</MenuItem>
                    <MenuItem value={THEME_TO_BG.SOLARIZED_LIGHT}>Solarized Light</MenuItem>
                    <MenuItem value={THEME_TO_BG.SOLARISED_DARK}>Solarized Dark</MenuItem>
                    <MenuItem value={THEME_TO_BG.TWILIGHT}>Twilight</MenuItem>
                </Select>
                {/*<AddToQueue theme={theme}/>*/}
            </Box>
        </main>
    )
}