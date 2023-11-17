import React, {memo} from "react";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
// import "prismjs/themes/prism-tomorrow.min.css";

type Props = {
    code: string;
};

const CodeRenderer = ({code}: Props) => {
    //first we split the lines, the first line will be reserved for the language definition.
    //the next lines will be reserved for the code itself.
    const [lang, ...body] = code.split("\n");

    //get the language
    const language = lang.slice(1);
    //join the body
    const _body = body.join("\n");


    return (
        <pre>
      <code className={`language-${language}`}>{_body}</code>
    </pre>
    );
};

export default memo(CodeRenderer);
