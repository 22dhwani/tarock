import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Loading from '../common/Loading';
import Card from './CommonCard';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import QRCode from 'react-qr-code';

const Share = () => {
    const { userId } = useParams();
    const location = useLocation();
    const [cardData, setCardData] = useState({});
    const [userData, setUserData] = useState('');
    useEffect(() => {
        fetch(`http://35.184.195.100:3000/api/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setUserData(data[0]);
                }
            })
            .catch(err => console.log(err.message));
        fetch(`http://35.184.195.100:3000/api/result?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const type = data[0].result_code;
                    fetch(`http://35.184.195.100:3000/api/card/${type}`)
                        .then(response => response.json())
                        .then(data => setCardData(data))
                        .catch(err => console.log(err.message));
                }
            })
            .catch(err => console.log(err.message));
    }, [userId]);
    if (userData.name && cardData.description) {
        return (
            <div className='d-flex flex-column vh-100' style={{ backgroundColor: '#3069B3' }}>
                <Card userData={userData} cardData={cardData} showDescription={false} showShare={false}/>
                <Row className='m-5'>
                    <Col className='col-4 d-flex justify-content-center align-self-center'>
                        <QRCode value={ window.location.href } size={64}/>
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
                            Or visit:<br/>Tarock.me{location.pathname}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    } else {
        return <Loading/>
    }
}

export default Share;