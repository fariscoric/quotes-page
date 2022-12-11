import Logout from '../components/logout/logout'
import Quotes from '../components/quotes/quotes'
import { useNavigate } from 'react-router-dom'
import "./homePage.css"
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import CreateQuote from "../components/createQuote/createQuote"

export default function HomePage() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className='bigCont'>
            <div className='buttonsTop'>
            <Logout/>
            <button className="createButton"
            onClick={handleOpen}
            >Create your own quote</button>
            <Modal
            open={open}
            onClose={handleClose}>
                <div>
                <button onClick={handleClose}>X</button>
                <CreateQuote
                close={setOpen}/>
                </div>
            </Modal>
            </div>
            <Quotes/>
        </div>
    )
}