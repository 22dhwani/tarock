import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context';
import Loading from '../Loading/Loading';
import { useNavigate, useLocation } from "react-router-dom";
import Tarock from './Tarock';
import Header from '../Header/Header';
import RadarView from './Tarock/RadarView';
import { Container } from 'react-bootstrap';
import { getAvatar } from '../../utils/userUtil';
import QRCode from 'react-qr-code';

const MyCard = () => {
    const { userData } = useContext(GlobalContext);
    const [cardData, setCardData] = useState({});
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const routeName = useLocation().pathname;

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

    const userInfo = <>
        {/* Avatar */}
        <div className='d-flex justify-content-center'>
            <img className='rounded-circle mx-auto' src={getAvatar(userData.avatarIndex)} alt="avatar" style={{ backgroundColor: '#FFFFFF' }} />
        </div>
        {/* User Name */}
        <div
            className="py-3"
            style={{
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '28px'
            }}>
            {user.name} is
        </div>
    </>
    if (user.name && cardData.description) {
        return (
            routeName === `/myCard` ?
                <div className='d-flex flex-column align-items-center min-vh-100' style={{
                    backgroundColor: '#2c60b0', color: 'white',
                    textAlign: 'center',
                }}>
                    <Header />
                    <Container className='d-flex flex-column py-4 rounded-5  align-items-center'>
                        <RadarView cardData={cardData} userInfo={userInfo} />
                        <div className='d-flex align-items-center gap-3 my-3'>
                            <QRCode value={window.location.href} size={90} />
                            <div className='d-flex flex-column'>
                                <h1 style={{
                                    fontSize: '14px',
                                    lineHeight: '17px',
                                    fontWeight: '700',
                                    textAlign: 'left',
                                }}>Scan QR code or use <br></br>the link to match or rate:</h1>
                                <span style={{
                                    fontSize: '10px',
                                    lineHeight: '12px',
                                    fontWeight: '400',
                                    textAlign: 'left',
                                }}>
                                    {window.location.href}
                                </span>
                            </div>

                        </div>
                    </Container>
                </div>
                :
                <Tarock user={user} cardData={cardData} />
        )
    } else {
        return <Loading />
    }
}

export default MyCard;