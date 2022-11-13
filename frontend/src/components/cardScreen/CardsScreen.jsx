import Container from 'react-bootstrap/Container';
import Header from '../common/Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GenCard from '../TarockCards/GenCard';
import Footer from '../common/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context';
import add from '../../assets/add.svg';
import './card.css';

const CardsScreen = () => {
    const { userData } = useContext(GlobalContext);
    const [matchedCardsData, setMatchedCardsData] = useState([]);
    const navigate = useNavigate();
    const search = useLocation().search;
    const matchUserId = new URLSearchParams(search).get('match');

    const onMyCardClick = () => {
        navigate('/myCard');
    }

    const onMatchCardClick = (origId, matchedId) => {
        if (matchedId === userData.id) {
            matchedId = origId;
        }
        navigate(`/matchCard/${matchedId}`);
    }

    const getCardData = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/card/user/${userData.id}`);
        const data = await response.json();
        // Set matched cards data.
        if (data.length > 1) {
            setMatchedCardsData(data[1].data);
        }
    }

    const matchUser = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/match`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                origUserId: matchUserId,
                matchedUserId: userData.id
            })
        });
        if (response.ok) {
            navigate(`/matchCard/${matchUserId}`);
        } else {
            getCardData();
        }
    }

    useEffect(() => {
        if (matchUserId && matchUserId != userData.Id) {
            matchUser();
        } else {
            getCardData();
        }
    }, []);

    return (
        <Container className='d-flex flex-column vh-100' style={{ backgroundColor: '#FAE8E7' }}>
            <Header />
            <div className='mx-auto' style={{
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: '24px',
                lineHeight: '28px',
                color: '#49304D'
            }}>
                Tarock Cards
            </div>
            <Container className='flex-grow-1 overflow-auto '>
                <Row lg={2} className='my-3'>
                    <Col  style={{ cursor: 'pointer' }} onClick={onMyCardClick} className='justify-content-center d-flex'>
                        <GenCard 
                        //quadra={userData.personality_socionic_quadra}
                        quadra='Alpha'
                        avatar_index={userData.avatarIndex} />
                    </Col>
                    {
                        matchedCardsData.map((data) => {
                            return <Col key={data.id} style={{ cursor: 'pointer' }} onClick={() => onMatchCardClick(data.orig_user_id, data.matched_user_id)} className='justify-content-center d-flex'>
                                <GenCard cardType='match' />
                            </Col>
                        })
                    }
                    {/* add card button */}
                    <Col className='justify-content-center d-flex flex-column align-items-center'>
                        <div className='button1' style={{
                            borderRadius: '10px',
                            width: '9rem',
                            height: '14.375rem',
                            border: '1px dashed  #49304D',
                            display: 'flex',
                        }}>
                            <img src={add} alt='add' className='m-auto'/>
                        </div>
                        <div className='col-12 d-flex justify-content-center mt-2' style={{
                            fontFamily: 'Montserrat',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            fontSize: '14px',
                            lineHeight: '14px',
                            color: '#49304D',
                        }}>
                            Add a new card
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer isCardsActive={true} />
        </Container>
    );
}

export default CardsScreen;