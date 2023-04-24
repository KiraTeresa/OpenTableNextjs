"use client"
import {Box, Button, Modal, Typography} from "@mui/material"
import {useState} from "react";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
}

export default function LoginModal({isSignin}: {isSignin: boolean}){
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const renderContent = (signinContent: string, signupContent: string) => {
        return isSignin? signinContent : signupContent
    }

    return (
        <div>
            <Button onClick={handleOpen} className={`${renderContent("bg-blue-400 text-white","")} border p-1 px-4 rounded mr-3`}>
                {renderContent("Sign in", "Sign up")}
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        Lorem Ipsum lorem ipsum....
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}