import {join} from "path";
import fs from "fs";
import matter from "gray-matter";
import axios from "axios";

type ResponseData = {
    message: string
}

export async function POST(
    req: Request) {
    if (req.method === 'POST') {
        // Process a POST request
        const reqContent = await req.json();
        const {problemNumber, code} = reqContent;
        const decodedCode = atob(code)
        const filePath = `${problemNumber}.json`;
        const docsDirectory = join(process.cwd(), 'app/api/problem_inputs')
        const fullPath = join(docsDirectory, `${filePath}`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const {data, content} = matter(fileContents);
        const parsedContent = JSON.parse(content)
        const tests = parsedContent.tests
        const functionName = parsedContent.functionName
        const baseCode = JSON.parse(content).baseCode
        const newCode = baseCode ? baseCode + '\n\n\n' + decodedCode : decodedCode
        const codeEncoded = btoa(newCode)
        const baseCodeEncoded = baseCode ? btoa(baseCode) : undefined
        const result = await axios.post('https://022hfroav5.execute-api.us-east-2.amazonaws.com/default/leet', {
            code: codeEncoded,
            tests: tests,
            baseCode: baseCodeEncoded,
            functionName: functionName,
        }).then(res => {
            return res.data;
        }).catch((err) => {
            console.log(err);
            return err
        })
        return Response.json({
            tests: tests,
            code: code,
            result: result
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

