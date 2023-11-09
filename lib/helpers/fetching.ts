import axios from "axios";
import {unified} from "unified";
import remarkParse from "remark-parse";
import Prism from 'prismjs';
import rehypePrism from '@mapbox/rehype-prism';
import remark2rehype from 'remark-rehype';

export const parseMarkdown = async (markdown: string): Promise<any> => {
    console.log(Prism)

    return unified()
        .use(remarkParse)
        .use(remark2rehype)
        // @ts-ignore
        .use(rehypePrism)
}
export const getProblems = async (): Promise<Problem[]> => {
    const problems = [1, 2];
    const toReturn: Problem[] = []
    for (const pNum of problems) {
        const problem = await getProblem(pNum)
        toReturn.push(problem)
    }
    return toReturn
}
export const getProblem = async (number: number): Promise<Problem> => {
    console.log("Getting problem", number)
    const res = await axios.post("http://localhost:3000/api/problem", {
        problemNumber: number
    }, {
        headers: {'Content-Type': 'application/json'}
    });

    if (res) {
        const json = res.data
        if (!!json && "content" in json && !!json?.content) {
            return {
                content: json.content,
                id: number,
                title: `Problem ${number}`,
                description: `Problem ${number} description`,
                input: JSON.parse(json.inputContent),
                solution: json.solutionContent,
            }
        } else {
            throw new Error("Invalid response")
        }
    } else {
        throw new Error("No response")
    }

};

