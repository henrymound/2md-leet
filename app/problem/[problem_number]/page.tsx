'use client'
import {getProblem} from "@/lib/helpers/fetching";
import React, {Suspense, useState} from "react";
import {ProblemDetails} from "@/app/problem/[problem_number]/components/ProblemDetails";
import {AddToQueue, THEME_TO_BG} from "@/components/CodeSnippets";

type ProblemParams = {
    problem_number: string // From url
}
export default function Problem(params: {
    params: ProblemParams,
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const problem = getProblem(params.params.problem_number as unknown as number)
    const searchParams = params.searchParams
    const theme = searchParams.theme as string | undefined
    const [theme2, setTheme2] = useState<THEME_TO_BG>(THEME_TO_BG.SOLARIZED_LIGHT)

    return (
        <div>
            <Suspense fallback={<div style={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                flexDirection: "row",
                justifyContent: "center",
                justifyItems: "center",
                alignContent: "center",
                alignItems: "center"
            }}>
                <p>Loading...</p>
            </div>}>
                <ProblemDetails data={problem} theme={theme ?? "tomorrow"}/>
                <AddToQueue theme={theme2} data={problem} problem={params.params.problem_number as unknown as number}/>
            </Suspense>

        </div>
    )

}