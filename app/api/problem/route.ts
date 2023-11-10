import fs from 'fs';
import {join} from 'path';
import matter from 'gray-matter';

const docsDirectory = join(process.cwd(), 'app/api/problems');
const inputsDirectory = join(process.cwd(), 'app/api/problem_inputs');
const solutionsDirectory = join(process.cwd(), 'app/api/solutions');
type ResponseData = {
    content: string
}

export async function POST(
    req: Request) {
    if (req.method === 'POST') {
        // Process a POST request
        const reqContent = await req.json();
        const {problemNumber: number} = reqContent;
        const filePath = `${number}.md`;
        const solutionPath = `${number}.py`;
        const inputPath = `${number}.json`;
        const fullPath = join(docsDirectory, `${filePath}`);
        const fullSolutionPath = join(solutionsDirectory, `${solutionPath}`);
        const fullInputPath = join(inputsDirectory, `${inputPath}`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const solutionFileContents = fs.readFileSync(fullSolutionPath, 'utf8');
        const inputFileContents = fs.readFileSync(fullInputPath, 'utf8');
        const {content} = matter(fileContents);
        const {content: inputContent} = matter(inputFileContents);
        const {content: solutionContent} = matter(solutionFileContents);

        return Response.json({
            content: content,
            inputContent: inputContent,
            solutionContent: solutionContent,
        }, {
            status: 200,
        });

    } else {
        return Response.json({
            content: "Error"
        }, {
            status: 200,
        });
        // Handle any other HTTP method

    }

}

