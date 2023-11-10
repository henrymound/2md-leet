import React from "react";
import {unified} from "unified"
import rehypePrism from "@mapbox/rehype-prism";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkHtml from "remark-html";
import Link from "next/link";
import {Box} from "@mui/material";

export const ProblemDetails = async (props: {
    data: Promise<Problem>,
    theme: string | undefined
}) => {
    const data = await props.data
    const processor = unified()
        .use(remarkHtml, {sanitize: false})
        .use(remarkParse)
        .use(remarkRehype)
        // @ts-ignore
        .use(rehypePrism)
        .use(rehypeStringify)
    const innerHtmlFile = processor.processSync(data.content).value
    return (
        <>
            <Box className="prose lg:prose-xl px-8 m-auto my-4 sm:my-16">
                <Link href={"/problem"}>Home</Link>
            </Box>
            <link rel="stylesheet" type="text/css"
                  href={`https://unpkg.com/prismjs@0.0.1/themes/prism-${props.theme}.css`}/>
            <article
                className="prose lg:prose-xl px-8 m-auto my-4 sm:my-16"
                dangerouslySetInnerHTML={{__html: innerHtmlFile}}
            />
        </>

    )
}