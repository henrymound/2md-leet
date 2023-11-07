import {getProblem} from "@/lib/helpers/fetching";
import {Suspense} from "react";
import {ProblemDetails} from "@/app/problem/[problem_number]/components/ProblemDetails";

type ProblemParams = {
    problem_number: string // From url
}
export default function Problem(params: { params: ProblemParams, searchParams: { [key: string]: string | string[] | undefined } }) {
    const problem = getProblem(params.params.problem_number as unknown as number)
    const searchParams = params.searchParams
    const theme = searchParams.theme as string | undefined
    return (
        <div>
            <Suspense fallback={"Loading..."}><ProblemDetails data={problem} theme={theme ?? "coy"}/></Suspense>
        </div>
    )

}