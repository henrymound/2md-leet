import {Metadata} from "next";
import {getProblems} from "@/lib/helpers/fetching";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Problem",
}
export default async function ProblemList() {
    const problems = await getProblems()
    const content = (
        <section>
            <h2><Link href={"/"}>Home</Link></h2>
            <br/>
            {problems.map((problem) => (
                <div key={problem.id}>
                    <h3><Link href={`/problem/${problem.id}`}>{problem.title}</Link></h3>
                    <p>{problem.description}</p>
                    <br/>
                </div>
            ))}
        </section>
    )
    return (
        <div>
            <h1>Problems</h1>
            {content}
        </div>
    )
}