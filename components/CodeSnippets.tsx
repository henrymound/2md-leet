"use client";
import React, {Fragment, useEffect} from "react";
import {highlight, languages} from 'prismjs'
import Editor from "react-simple-code-editor";
import dedent from 'dedent';
import {Box, Button, Popover, Typography} from "@mui/material";
import "./text.css"

export enum THEME_TO_BG {
    PRISM_FUNKY = "black",
    PRISM_OKAIDIA = "#272822",
    TWILIGHT = "#272822",
    SOLARISED_DARK = "#073642",
    SOLARIZED_LIGHT = "#fdf6e3",
    TOMORROW = "#2d2d2d"
}

// export const CodeSnippets = () => {
//     const EditorBlock = dynamic(() => import("../components/CodeEditor"), {
//         ssr: false,
//     });
//     const initialData: OutputData = {
//         time: 1664631046512,
//         blocks: [
//             {
//                 id: "i1HDCAxqng",
//                 type: "code",
//                 data: {
//                     code: "#python\n\n# This program prints Hello, world!\nprint('Hello, world!')\n",
//                 },
//             },
//             {
//                 id: "S_oEvbfKfl",
//                 type: "code",
//                 data: {
//                     code: "#css\n\nhtml,\nbody {\n  padding: 0;\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,\n    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\n}\n\n",
//                 },
//             },
//         ],
//         version: "2.25.0",
//     };
//     const [data, setData] = useState<OutputData>(initialData);
//
//     return (
//         <div className="grid grid-cols-2 gap-2">
//             <div className="col-span-1 ">
//                 <h1>Editor</h1>
//                 <div className="border rounded-md">
//                     <EditorBlock
//                         data={data}
//                         onChange={setData}
//                         holder="editorjs-container"
//                     />
//                 </div>
//             </div>
//             <div className="col-span-1 ">
//                 <h1>Preview</h1>
//                 <div className="border rounded-md">
//                     <div className="p-16">{data && <EditorJsRenderer data={data}/>}</div>
//                 </div>
//             </div>
//         </div>
//     );
//
//     // useEffect(() => {
//     //     Prism.highlightAll()
//     // }, [])
//     // const code = `var data = 1;`;
//     // const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
//     //
//     // const md = '<pre>Sheeb</pre>'
//     // return (
//     //     <div className='container'>
//     //         <div>
//     //             {html}
//     //         </div>
//     //     </div>
//     // )
// }
// type State = {
//     code: string;
// };

export const AddToQueue = (props: {
    problem: number
    theme?: THEME_TO_BG,
    data: Promise<Problem>
}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    require('prismjs/components/prism-python');
    require('prismjs/components/prism-json');
    // require('prismjs/themes/prism-coy.css');
    const [modalContent, setModalContent] = React.useState([""])
    const [content, setContent] = React.useState({
        code: dedent`
            
   `,
    })
    useEffect(() => {
        Promise.resolve(props.data).then((problem) => {
            console.log(problem.solution)
            setContent({code: problem.solution})
        })
    }, []);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        addToQueue(content.code, props.problem, () => {
        }).then(r => {
            console.log(r.json().then((json: any) => {
                console.log(JSON.stringify(json))
                console.log(json.result)
                const newModalContent = json.result
                console.log(newModalContent)
                setModalContent(newModalContent)

            }))
            console.log(r)
        })
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Fragment>
            <Box className="prose lg:prose-xl px-8 m-auto my-4 sm:my-16"
            >
                <Popover
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    id={id}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                ><Box>
                    <Typography id="modal-modal-title" variant="h4" component="h2" textAlign={"center"} width={"100%"}
                                justifyContent={"center"}>
                        Execution Response
                    </Typography>
                    <Fragment>
                        {modalContent.map((item, idx) => {
                            return <Typography id="modal-modal-description" sx={{mt: 2}} key={idx}>{item}</Typography>
                        })}
                    </Fragment>
                </Box>
                </Popover>

                <main>
                    <div>
                        <Box display={"flex"} justifyContent={"space-between"} textAlign={"center"} width={"100%"}>
                            <h3 style={{marginTop: "0"}}>Solution</h3>
                            <div><Button variant="contained" style={{backgroundColor: "#4193ff"}}
                                         onClick={handleClick} aria-describedby={id}>Run</Button></div>
                        </Box>

                        {/*<code>*/}
                        <Editor
                            style={{
                                background: "#272822",
                                borderRadius: "10px",
                                // color: props.theme === THEME_TO_BG.SOLARIZED_LIGHT ? "black" : "white"
                            }}

                            textareaClassName={"language-python"}
                            placeholder="Type some code…"
                            value={`${content.code}`}
                            onValueChange={(code) => {
                                console.log(code)
                                setContent({code: code})
                            }}
                            highlight={(code) => highlight(code, languages.python!, 'python')}
                            padding={10}
                            className={"language-python"}
                            preClassName={"language-python-pre"}
                        />


                    </div>

                </main>
            </Box>
        </Fragment>

    );
}

const addToQueue = async (code: string, problemNumber: number, onComplete: () => void) => {
    // 👇 Send a fetch request to Backend API
    console.log(btoa(code))
    return fetch("/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({
            code: btoa(code),
            problemNumber: problemNumber
        })
        ,
    }).then((res) => {
        onComplete()
        return res
    }).catch((e) => {
        return e
    });
};
