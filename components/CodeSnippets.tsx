"use client";
import {highlight, languages} from 'prismjs'
import Editor from "react-simple-code-editor";
import dedent from 'dedent';
import {Box, Button, Fade, Typography} from "@mui/material";
import "./text.css"
import {styled} from "@mui/system";
import {grey} from "@mui/material/colors";
import {Modal as BaseModal} from '@mui/base/Modal';
import React, {Fragment, useEffect} from "react";

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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
        addToQueue(content.code, props.problem, () => {
        }).then(r => {
            r.json().then((json: any) => {
                const newModalContent = json.result
                setModalContent(newModalContent)
                handleOpen()
            })
        })
    };

    return (
        <Fragment>
            <Box className="prose lg:prose-xl px-8 m-auto my-4 sm:my-16"
            >
                <Modal
                    style={{padding: "1rem", margin: "1rem"}}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    closeAfterTransition
                    slots={{backdrop: StyledBackdrop}}
                >

                    <Fade in={open}>
                        <ModalContent sx={style}><Box style={{padding: "1rem"}}>
                            <Typography id="modal-modal-title" variant="h4" component="h4" textAlign={"center"}
                                        width={"100%"}
                                        justifyContent={"center"}>
                                Execution Response
                            </Typography>
                            <Fragment>
                                {modalContent && modalContent?.length > 0 && modalContent.map((item, idx) => {
                                    return <Typography id="modal-modal-description" sx={{mt: 2}}
                                                       key={idx}>{item}</Typography>
                                })}
                            </Fragment>
                        </Box></ModalContent></Fade>
                </Modal>

                <main>
                    <div>
                        <Box display={"flex"} justifyContent={"space-between"} textAlign={"center"} width={"100%"}>
                            <h3 style={{marginTop: "0"}}>Solution</h3>
                            <div><Button variant="contained" style={{backgroundColor: "#4193ff"}}
                                         onClick={handleClick}>Run</Button></div>
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
const ModalContent = styled(Box)(
    ({theme}) => `
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#FFF'};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 4px 12px ${
        theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.20)'
    };
  padding: 1rem;
  color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;


  & .modal-title {
    margin: 0;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
  }
  `,
);
// eslint-disable-next-line react/display-name
const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean }>(
    (props, ref) => {
        const {open, ...other} = props;
        return (
            <Fade in={open}>
                <div ref={ref} {...other} />
            </Fade>
        );
    },
);

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
};
const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;
