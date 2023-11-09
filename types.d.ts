type Problem = {
    id: number;
    title: string;
    description: string;
    content: string;
    solution: string;
    input: {
        tests: {
            input: string;
            output: string;
        }[],
        functionName: string,
        baseCode: string | undefined,
    };
}