import fs from 'fs';
import {join} from 'path';
import matter from 'gray-matter';

const docsDirectory = join(process.cwd(), 'app/api/problems');
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
        const fullPath = join(docsDirectory, `${filePath}`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const {data, content} = matter(fileContents);
        // const htmlFile = await unified()
        //     .use(remarkParse)
        //     .use(remarkRehype)
        //     .use(rehypeSanitize)
        //     .use(rehypeStringify)
        //     .process(content)

        const markdown = content

        return Response.json({
            content: markdown
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

