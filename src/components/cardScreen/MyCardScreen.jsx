import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context';
import Loading from '../common/Loading';
import CommonCard from './CommonCard';
import { useNavigate } from "react-router-dom";

const MyCard = () => {
    const { userData } = useContext(GlobalContext);
    const [cardData, setCardData] = useState({});
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/user/${userData.id}?userType=${userData.type}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setUser(data[0]);
                }
            })
            .catch(err => console.log(err.message));
        fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/result?userId=${userData.id}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const type = data[0].result_code;
                    fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/card/${type}`)
                        .then(response => response.json())
                        .then(data => setCardData(data))
                        .catch(err => console.log(err.message));
                } else {
                    // User hasn't tested, navigate to the test page.
                    // TODO(Zane): show popup window.
                    navigate("/test");
                }
            })
            .catch(err => console.log(err.message));
    }, []);
    if (user.name && cardData.description) {
        return (
            <div className='d-flex flex-column min-vh-100' style={{ backgroundColor: '#3069B3' }}>
                <CommonCard user={user} cardData={cardData} showDescription={true} showShare={true}/>
            </div>
        );
    } else {
        return <Loading/>
    }
}

export default MyCard;