import React from "react";
import {getProblems} from "@/lib/helpers/fetching";
import Link from "next/link";
import {Box} from "@mui/material";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Home | code.2md",
}

export default async function Home() {
    const problems = await getProblems()
    const content = (
        <section>
            {problems.map((problem) => (
                <div key={problem.id}>
                    <h2 style={{fontWeight: "bold"}}><Link href={`/problem/${problem.id}`}>{problem.title}</Link></h2>
                    <p>{problem.description}</p>
                </div>
            ))}
        </section>
    )
    return (
        <Box className="prose lg:prose-xl px-8 m-auto my-4 sm:my-16"
        >
            <h1>All Problems</h1>
            {content}
        </Box>
    )
}
