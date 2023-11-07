import React from "react";
import {unified} from "unified"
import rehypePrism from "@mapbox/rehype-prism";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkHtml from "remark-html";

export const ProblemDetails = async (props: {
    data: Promise<Problem>,
    theme: string | undefined
}) => {
    const data = await props.data
    // if (props.theme && typeof window !== "undefined") {
    //     console.log("THEME", props.theme)
    //     switch (props.theme) {
    //         case "twilight":
    //             require(twilight)
    //             break
    //         case "tomorrow":
    //             import("@/app/problem/[problem_number]/components/themes/prism-tomorrow.css")
    //             break
    //         case "coy":
    //             import("@/app/problem/[problem_number]/components/themes/prism-coy.css")
    //             break
    //         case "okaidia":
    //             import("@/app/problem/[problem_number]/components/themes/prism-okaidia.css")
    //             break
    //         case "funky":
    //             import("@/app/problem/[problem_number]/components/themes/prism-funky.css")
    //             break
    //         default:
    //             import("@/app/problem/[problem_number]/components/themes/prism-tomorrow.css")
    //             break
    //
    //
    //     }
    // }
    const processor = unified()
        .use(remarkHtml, {sanitize: false})
        .use(remarkParse)

        .use(remarkRehype)
        // @ts-ignore
        .use(rehypePrism)
        // .use(rehypeDocument)
        // .use(rehypeFormat)
        // .use(rehypeSanitize)
        .use(rehypeStringify)
    // .use(remark2rehype)
    // @ts-ignore
    // .use(rehype2react, production)
    const res = processor.processSync(data.content).toString()
    console.log("PARSING")
    // @ts-ignore
    console.log(processor.processSync(data.content).value)
    const innerHtmlFile = processor.processSync(data.content).value
    return (
        <>
            <link rel="stylesheet" type="text/css"
                  href={`https://unpkg.com/prismjs@0.0.1/themes/prism-${props.theme}.css`}/>

            <article
                className="prose lg:prose-xl px-8 m-auto my-4 sm:my-16"
                dangerouslySetInnerHTML={{__html: innerHtmlFile}}
            />
        </>

    )
}