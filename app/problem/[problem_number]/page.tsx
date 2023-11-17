// 'use client'
import {getProblem} from "@/lib/helpers/fetching";
import React, {Suspense} from "react";
import {ProblemDetails} from "@/app/problem/[problem_number]/components/ProblemDetails";
import {AddToQueue} from "@/components/CodeSnippets";
import {Metadata, ResolvingMetadata} from "next";
import "../../globals.css"

type ProblemParams = {
    params: { problem_number: string },
    searchParams: { [key: string]: string | string[] | undefined }
}


export async function generateMetadata(
    props: ProblemParams,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const {params} = props
    const problemNumber = params.problem_number as unknown as number
    const problem = await getProblem(problemNumber)
    return {
        title: `${problem.title} | code.2md`,
    }
}


export default function Problem(props: ProblemParams) {
    const problemNumber = props.params.problem_number as unknown as number
    const problem = getProblem(problemNumber)
    const searchParams = props.searchParams
    const theme = searchParams.theme as string | undefined

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
                alignItems: "center",
            }}>
                <p>Loading...</p>
            </div>}>
                <ProblemDetails data={problem} theme={theme ?? "tomorrow"}/>
                <AddToQueue data={problem} problem={problemNumber}/>
            </Suspense>

        </div>
    )

}