import axios from "axios";

export const getProblems = async (): Promise<Problem[]> => {
    const problems = [1, 2, 1071];
    const toReturn: Problem[] = []
    for (const pNum of problems) {
        const problem = await getProblem(pNum)
        toReturn.push(problem)
    }
    return toReturn
}
export const getProblem = async (num: number): Promise<Problem> => {
    const res = await axios.post("http://localhost:3000/api/problem", {
        problemNumber: num
    }, {
        headers: {'Content-Type': 'application/json'}
    });

    if (res) {
        const json = res.data
        const input = JSON.parse(json.inputContent)
        if (!!json && "content" in json && !!json?.content) {
            return {
                content: json.content,
                id: num,
                title: `${num}. ${input.title}`,
                description: input.description,
                input: input,
                solution: json.solutionContent,
            }
        } else {
            throw new Error("Invalid response")
        }
    } else {
        throw new Error("No response")
    }

};

