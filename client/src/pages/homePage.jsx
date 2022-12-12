import Logout from '../components/logout/logout'
import Quotes from '../components/quotes/quotes'
import { useNavigate } from 'react-router-dom'
import "./homePage.css"
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import CreateQuote from "../components/createQuote/createQuote"
import { toast } from 'react-hot-toast';

export default function HomePage() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [addedQuote, setAddedQuote] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const notify = () => {
        toast('Successfully added quote')
    }

    const notifyFalse = () => {
        toast.error('Failed to add quote')
    }

    return (
        <div className='bigCont'>

            {addedQuote ? notify() : notifyFalse()}

            <div className='buttonsTop'>
            <Logout/>
            <button className="createButton"
            onClick={handleOpen}
            >Create your own quote</button>
            <Modal
            open={open}
            onClose={handleClose}>
                <div>
                <CreateQuote
                toast={setAddedQuote}
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