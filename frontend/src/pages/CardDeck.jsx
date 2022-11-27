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
import Loading from '../components/Loading/Loading';
import MatchCard from '../components/Cards/Match/MatchCard';
import linkButton from '../assets/buttons/link.svg';
import imgButton from '../assets/buttons/image.svg';

const CardsScreen = () => {
    const { userData } = useContext(GlobalContext);
    const [matchedCardsData, setMatchedCardsData] = useState([]);
    const navigate = useNavigate();
    const { state, search } = useLocation();
    const matchUserId = new URLSearchParams(search).get('match');
    const [showNotification, setShowNotification] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [cardType, setCardType] = useState();
    const [quadra, setQuadra] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    const onMyCardClick = (card) => {
        setCardType(card);
        setShowCard(true);
    }
    const onMatchCardClick = (card) => {
        setCardType(card);
        setShowCard(true);
    }
    const getCardData = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/card/user/${userData.id}`);
        const data = await response.json();
        if (data.length == 0 || data[0].type != 'Tarock') {
            // No Tarock card result for current user, navigate to test page.
            navigate(matchUserId ? `/test?match=${matchUserId}` : '/test');
            throw new Error('No Tarock card result found!');
        }
        setQuadra(data[0].data.quadra);
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
            setTab(false);
            onMatchCardClick(<MatchCard origID={userData.id} matchedUserID={matchUserId} />);
        }
    }

    useEffect(() => {
        getCardData()
            .then(async() => {
                if (matchUserId && matchUserId != userData.Id) {
                    await matchUser().then(() => getCardData());
                }
                if (state && state.card === 'tarock') {
                    setTab(true);
                    onMyCardClick(<MyCard />);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const [tab, setTab] = useState(true);
    function shareCard() {
        navigate(`/share/${userData.id}`);
    }
    const [shareCardOption, setShareCardOption] = useState(false);
 
    return isLoading ? <Loading /> : (
        <Container className='d-flex flex-column vh-100 ' style={{ backgroundColor: '#FAE8E7' }}>
            <Popup show={showNotification} setShow={setShowNotification} isNotification={true}>
                <div className='text-center rounded-3 py-3' style={{ backgroundColor: 'white', color: '#49304D' }}>
                    <h1 style={{
                        fontWeight: '700',
                        fontSize: '22px',
                        lineHeight: '36px',

                    }}>
                        Coming Soon
                    </h1>
                    <p style={{
                        fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '19.5px',

                    }}>
                        We are working hard to develop this feature. <br></br><b>Stay tuned!</b>
                    </p>
                    <button
                        onClick={() => setShowNotification(false)}
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
                        Got it
                    </button>
                </div>
            </Popup>
            <Popup show={showCard} setShow={setShowCard} isCard={true}>
                <>
                    {cardType}
                    {shareCardOption && <div className='share'></div>}
                    <button
                        onClick={() => setShareCardOption(true)}
                        style={{
                            border: 'none',
                            backgroundColor: '#FFD874',
                            borderRadius: '50px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            fontWeight: '900',
                            width: '60%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '33px',
                        }}>
                        Share
                    </button>
                    <Popup show={shareCardOption} setShow={setShareCardOption} isNotification={true} >
                        <div className='d-flex gap-5 mx-auto' style={{
                            marginTop: '85%',
                        }}>
                            <img src={linkButton} alt='link' style={{
                                cursor: 'pointer'
                            }} />
                            <img src={imgButton} alt='image' style={{
                                cursor: 'pointer'
                            }} />
                        </div>
                    </Popup>
                </>

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