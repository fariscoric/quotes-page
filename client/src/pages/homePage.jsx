import Logout from '../components/logout/logout'
import Quotes from '../components/quotes/quotes'
import { useNavigate } from 'react-router-dom'
import "./homePage.css"

export default function HomePage() {
    const navigate = useNavigate();
    return (
        <div className='bigCont'>
            <div className='buttonsTop'>
            <Logout/>
            <button className="createButton" onClick={() => {
                navigate("/createQuote")
            }}>Create your own quote</button>
            </div>
            <Quotes/>
        </div>
    )
}