import Logout from '../components/logout/logout'
import Quotes from '../components/quotes/quotes'
import { useNavigate } from 'react-router-dom'
import "./homePage.css"
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import CreateQuote from "../components/createQuote/createQuote"
import toast, { Toaster } from 'react-hot-toast';
import Button from '@mui/material/Button'


export default function HomePage() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState("Logged in successfully")
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleNotify = () => {
        toast.success(`${notify}`)
    }


    useEffect(() => {
        handleNotify()
    },[notify])

    return (
        <div className='bigCont'>

            <Toaster/>
            <div className='buttonsTop'>
            <Logout/>
            <Button className="createButton"
            onClick={handleOpen}
            variant="contained" 
            color="success"
            >Create your own quote</Button>
            <Modal
            open={open}
            onClose={handleClose}>
                <div>
                <CreateQuote
                notification={setNotify}
                close={setOpen}/>
                </div>
            </Modal>
            </div>
            <Quotes
            openState={open}
            />
        </div>
    )
}