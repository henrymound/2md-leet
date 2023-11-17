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
            setContent({code: problem.solution})
        })
    }, []);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        addToQueue(content.code, props.problem, () => {
        }).then(r => {
            r.json().then((json: any) => {
                const newModalContent = json.result
                setModalContent(newModalContent)
            })
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
                    style={{padding: "1rem", margin: "1rem"}}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    id={id}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                ><Box style={{padding: "1rem"}}>
                    <Typography id="modal-modal-title" variant="h4" component="h4" textAlign={"center"} width={"100%"}
                                justifyContent={"center"}>
                        Execution Response
                    </Typography>
                    <Fragment>
                        {modalContent && modalContent?.length > 0 && modalContent.map((item, idx) => {
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
                                // background: "#272822",
                                borderRadius: "10px",
                                // color: props.theme === THEME_TO_BG.SOLARIZED_LIGHT ? "black" : "white"
                            }}

                            textareaClassName={"custom-language-textarea"}
                            placeholder="Type some code…"
                            value={`${content.code}`}
                            onValueChange={(code) => {
                                setContent({code: code})
                            }}
                            highlight={(code) => highlight(code, languages.python!, 'python')}
                            padding={10}
                            className={`custom-language`}
                            preClassName={"custom-language-pre"}
                        />


                    </div>

                </main>
            </Box>
        </Fragment>

    );
}

const addToQueue = async (code: string, problemNumber: number, onComplete: () => void) => {
    // 👇 Send a fetch request to Backend API
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
