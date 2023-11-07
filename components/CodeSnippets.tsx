"use client";
import React, {Fragment} from "react";
import {highlight, languages} from 'prismjs'
import Editor from "react-simple-code-editor";
import dedent from 'dedent';
import {Box, Button, Popover, Typography} from "@mui/material";

require('prismjs/components/prism-python');
require('prismjs/components/prism-json');

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
    theme: THEME_TO_BG
}) => {
    switch (props.theme) {
        case THEME_TO_BG.PRISM_FUNKY:
            require('prismjs/themes/prism-tomorrow.css');
            break;
        case THEME_TO_BG.PRISM_OKAIDIA:
            require('prismjs/themes/prism-okaidia.css');
            break;
        case THEME_TO_BG.TWILIGHT:
            require('prismjs/themes/prism-twilight.css');
            break;
        case THEME_TO_BG.SOLARISED_DARK:
            require('prismjs/themes/prism-solarizedlight.css');
            break;
        case THEME_TO_BG.SOLARIZED_LIGHT:
            require('prismjs/themes/prism-solarizedlight.css');
            break;
        case THEME_TO_BG.TOMORROW:
            require('prismjs/themes/prism-tomorrow.css');
            break;
        default:
            require('prismjs/themes/prism-tomorrow.css');
            break;
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [modalContent, setModalContent] = React.useState([""])

    const [content, setContent] = React.useState({
        code: dedent`
            def pipeline(config, input):
                keys = []
                totalLength = 0
                for i in input.values():
                    if isinstance(i, str):
                      keys.append("Input Val Found: " + i)
                      totalLength += len(i)
                    
                return ["Keys have a total length of " + str(totalLength), keys]
               ### Ask gpt-3.5-turbo with some prompt template to generate an email
               # return openai.ChatCompletion.create(...)
   `,
    })
    const [configs, setConfigs] = React.useState({
        code: dedent`
             [
                {
                    "topic": "enterprise SaaS pitch",
                    "input_metadata": {
                        "importance": 0.9
                    },
                },
                {
                    "topic": "marketing campaign",
                    "input_metadata": {
                        "importance": 0.5
                    }
                }
            ]`,
    })
    const [inputs, setInputs] = React.useState({
        code: dedent`
            [
                {
                    "model": "gpt-3.5-turbo",
                    "temperature": 0.5
                },
                {
                    "model": "gpt-4",
                    "temperature": 0
                }
            ]
           `
    })

    return (
        <Fragment>
            <Box bgcolor={"transparent"}>
                <Popover
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
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
                        {/*<a*/}
                        {/*    className="button"*/}
                        {/*    href="https://github.com/henrymound"*/}
                        {/*>*/}
                        {/*    GitHub*/}
                        {/*</a>*/}
                        {/*<br/>*/}
                        {/*<br/>*/}
                        <h1>Pipeline</h1>
                        <Editor
                            style={{backgroundColor: props.theme, color: "white"}}
                            placeholder="Type some code…"
                            value={`${content.code}`}
                            onValueChange={(code) => {
                                console.log(code)
                                setContent({code: code})
                            }}
                            highlight={(code) => highlight(code, languages.python!, 'python')}
                            padding={10}
                            className={"language-python"}
                        />
                        <h1>Inputs</h1>
                        <Editor
                            style={{backgroundColor: props.theme}}
                            placeholder="Type some code…"
                            value={inputs.code}
                            onValueChange={(inputs) => {
                                console.log(inputs)
                                setInputs({code: inputs})
                            }}
                            highlight={(code) => highlight(code, languages.json!, 'json')}
                            padding={10}
                            className={"language-json"}

                        />
                        <h1>Configs</h1>
                        <Editor
                            style={{backgroundColor: props.theme}}
                            placeholder="Type some code…"
                            value={configs.code}
                            onValueChange={(code) => {
                                console.log(code)
                                setConfigs({code: code})
                            }}
                            highlight={(code) => highlight(code, languages.json!, 'json')}
                            padding={10}
                            className="language-json"
                        />
                        <div><Button variant="contained" style={{backgroundColor: "#4193ff"}} onClick={() => {
                            addToQueue(configs.code, inputs.code, content.code, handleOpen).then(r => {
                                console.log(r.json().then((json: any) => {
                                    console.log(json)
                                    const res = JSON.parse(json.request)
                                    const newModalContent = []
                                    for (let i = 0; i < res.length; i++) {
                                        if (typeof res[i] === "string") {
                                            newModalContent.push(res[i])
                                        } else {
                                            newModalContent.push(JSON.stringify(res[i]))
                                        }
                                    }
                                    console.log(newModalContent)
                                    setModalContent(newModalContent)

                                }))
                                console.log(r)
                            })
                        }}>Add to Queue</Button></div>

                    </div>

                </main>
            </Box>
        </Fragment>

    );
}

const addToQueue = async (config: string, inputs: string, python: string, onComplete: () => void) => {
    // 👇 Send a fetch request to Backend API
    return fetch("/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({
            config: JSON.stringify(config),
            python: JSON.stringify(python),
            inputs: JSON.stringify(inputs)
        })
        ,
    }).then((res) => {
        onComplete()
        return res
    }).catch((e) => {
        return e
    });
};
