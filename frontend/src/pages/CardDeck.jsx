import Container from 'react-bootstrap/Container';
import Header from '../components/Header/Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GenCard from '../components/Cards/GenCard';
import Footer from '../components/Footer/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context';
import AddCardButton from '../components/Buttons/AddCardButton/AddCardButton';
import TabSwitch from '../components/TabSwitch/TabSwitch';
import Popup from '../components/PopUp/PopUp';
import MyCard from '../components/Cards/MyCard';
import MatchCard from '../components/Cards/MatchCard';
import Loading from '../components/Loading/Loading';
const CardsScreen = () => {
    const { userData } = useContext(GlobalContext);
    const [matchedCardsData, setMatchedCardsData] = useState([]);
    const navigate = useNavigate();
    const search = useLocation().search;
    const matchUserId = new URLSearchParams(search).get('match');
    const [showNotification, setShowNotification] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [cardType, setCardType] = useState();
    const [quadra, setQuadra] = useState('');
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isMatching, setIsMatching] = useState(false);
    
    const onMyCardClick = (card) => {
        setCardType(card);
        setShowCard(true);
    }
    const onMatchCardClick = (card) => {
        setCardType(card);
        setShowCard(true);
    }
    const getCardData = async () => {
        setIsLoadingData(true);
        const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/card/user/${userData.id}`);
        const data = await response.json();
        if (data.length == 0 || data[0].type != 'Tarock') {
            // No Tarock card result for current user, navigate to test page.
            navigate(matchUserId ? `/test?match=${matchUserId}` : '/test');
            return;
        }
        setQuadra(data[0].data.quadra);
        // Set matched cards data.
        if (data.length > 1) {
            setMatchedCardsData(data[1].data);
        }
        setIsLoadingData(false);
    }

    const matchUser = async () => {
        setIsMatching(true);
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
            setTab(false);
            onMatchCardClick(<MatchCard origID={userData.id} matchedUserID={matchUserId} />);
        }
        setIsMatching(false);
    }

    useEffect(() => {
        getCardData();
        if (matchUserId && matchUserId != userData.Id) {
            matchUser();
        }
    }, []);

    const [tab, setTab] = useState(true);
    function shareCard() {
        navigate(`/share/${userData.id}`);
    }
 
    return (isLoadingData || isMatching) ? <Loading /> : (
        <Container className='d-flex flex-column vh-100 ' style={{ backgroundColor: '#FAE8E7' }}>
            <Popup show={showNotification} setShow={setShowNotification} isNotification={true} />
            <Popup show={showCard} setShow={setShowCard} isCard={true}>
                {cardType}
            </Popup>

            <Header />
            <TabSwitch tab={tab} setTab={setTab} />
            <Container className='flex-grow-1 overflow-auto' >
                <Row lg={2} className='my-3'>
                    {tab ?
                        <>
                            <Col style={{ cursor: 'pointer' }} onClick={() => onMyCardClick(<MyCard />)} className='justify-content-center d-flex'>
                                <GenCard
                                    quadra={quadra}
                                    avatar_index={userData.avatarIndex} />
                            </Col>
                            <Col className='d-flex align-items-center justify-content-center' onClick={() => setShowNotification(true)}>
                                <AddCardButton />
                            </Col>
                        </>
                        : <>
                            {
                                matchedCardsData.length ? <>
                                    {
                                        matchedCardsData.map((data, index) => {
                                            return <Col
                                                key={index}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => onMatchCardClick(<MatchCard origID={userData.id} matchedUserID={data.matchedUserId} />)}
                                                className='justify-content-center d-flex'>
                                                <GenCard cardType='match' />
                                            </Col>
                                        })
                                    }
                                    <Col className='d-flex align-items-center justify-content-center' onClick={shareCard}>
                                        <AddCardButton />
                                    </Col>
                                </>
                                    :
                                    <div className='d-flex flex-column align-items-center w-100 gap-3' style={{
                                        marginTop: '10rem'
                                    }}>
                                        <h1 style={{
                                            fontWeight: '700',
                                            fontSize: '16px',
                                            lineHeight: '19.5px',
                                            textAlign: 'center',
                                            width: '70%',
                                        }}>
                                            Share your Tarock card to your friends and start matching.
                                        </h1>
                                        <button
                                            onClick={shareCard}
                                            style={{
                                                border: 'none',
                                                backgroundColor: '#49304D',
                                                color: '#FFFFFF',
                                                borderRadius: '50px',
                                                paddingLeft: '1.5rem',
                                                paddingRight: '1.5rem',
                                                paddingTop: '0.5rem',
                                                paddingBottom: '0.5rem',
                                                fontWeight: '700',
                                            }}>
                                            Share my card
                                        </button>
                                    </div>
                            }
                        </>
                    }
                </Row>
            </Container>
            <Footer isCardsActive={true} />
        </Container>
    );
}

export default CardsScreen;