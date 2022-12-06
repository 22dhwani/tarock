import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import CommonCard from './CommonCard';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import QRCode from 'react-qr-code';

const Share = () => {
    const { userId } = useParams();
    const { state, pathname } = useLocation();
    const [cardData, setCardData] = useState({});
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const qr = state ? state.qr : false;

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/user/${userId}?userType=REAL`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setUser(data[0]);
                }
            })
            .catch(err => console.log(err.message));
        fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/result?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const type = data[0].result_code;
                    fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/card/${type}`)
                        .then(response => response.json())
                        .then(data => setCardData(data))
                        .catch(err => console.log(err.message));
                }
            })
            .catch(err => console.log(err.message));
    }, [userId]);
    if (user.name && cardData.description) {
        return (
            <div className='d-flex flex-column min-vh-100' style={{ backgroundColor: '#3069B3' }}>
                <CommonCard
                    user={user}
                    cardData={cardData}
                    showDescription={false}
                    showShare={false}
                    onMatchClick={qr ? undefined : () => navigate(`/?match=${userId}`)}
                    children={
                        qr ? <Row className='m-5'>
                            <Col className='col-4 d-flex justify-content-center align-self-center'>
                                <QRCode value={window.location.href} size={64} />
                            </Col>
                            <Col className='col-8' style={{
                                wordBreak: 'break-all',
                                fontFamily: 'Montserrat',
                                fontWeight: '700',
                                fontSize: '14px',
                                color: '#FFFFFF',
                            }}>
                                <div style={{ lineHeight: '24px' }}>
                                    Scan QR code to start
                                </div>
                                <div style={{ lineHeight: '16px' }}>
                                    Or visit:<br />tarockapp.com{pathname}
                                </div>
                            </Col>
                        </Row> : undefined
                    }
                />
            </div>
        );
    } else {
        return <Loading />
    }
}
export default Share;