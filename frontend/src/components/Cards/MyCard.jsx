import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context';
import Loading from '../Loading/Loading';
import { useNavigate } from "react-router-dom";
import Tarock from './Tarock';

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
                    alert("Please take the test first.");
                    navigate("/test");
                }
            })
            .catch(err => console.log(err.message));
    }, []);

    if (user.name && cardData.description) {
        return <Tarock user={user} cardData={cardData} />
    } else {
        return <Loading />
    }
}

export default MyCard;