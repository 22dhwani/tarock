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
import linkC from '../assets/buttons/linkC.svg';
import linkNC from '../assets/buttons/linkNC.svg';
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
    const [clickedMatchUserId, setClickedMatchUserId] = useState('');
   
    const onMyCardClick = (card) => {
        setCardType(card);
        setShowCard(true);
    }
    const onMatchCardClick = (card, matchUserId) => {
        setClickedMatchUserId(matchUserId);
        setCardType(card);
        setShowCard(true);
    }
    const getCardData = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/card/user/${userData.id}`, { credentials: 'include' });
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
            credentials: 'include',
            body: JSON.stringify({
                origUserId: matchUserId,
                matchedUserId: userData.id
            })
        });
        if (response.ok || (await response.text()).includes('Duplicated')) {
            setTab(false);
            onMatchCardClick(<MatchCard origID={userData.id} matchedUserID={matchUserId} />, matchUserId);
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
        onMyCardClick(<MyCard />);
        if (!tab) {
            setTab(true);
        }
    }
    const [shareCardOption, setShareCardOption] = useState(false);
    const [linkButton, setLinkButton] = useState(linkNC);
    return isLoading ? <Loading /> : (
        <Container className='d-flex flex-column vh-100 ' style={{ backgroundColor: '#FAE8E7' }}>
            <Popup show={showNotification} setShow={setShowNotification} isNotification={true}>
                <div className='rounded-3 py-3 d-flex flex-column gap-4 align-items-center text-center' style={{ backgroundColor: 'white', color: '#49304D' }}>
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
                            width:'80%'
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
                            color: '#49304D'
                        }}>
                        Share
                    </button>
                    <Popup show={shareCardOption} setShow={setShareCardOption} isNotification={true} >
                        <div className='d-flex gap-5 mx-auto' style={{
                            marginTop: '60vh',
                        }}>
                            <img src={linkButton} alt='link' style={{
                                cursor: 'pointer'
                            }} onClick={() => {
                                if (tab) {
                                    //navigate(`/share/${userData.id}`);
                                    //append domain path here from an env variable
                                    setLinkButton(linkC);
                                    navigator.clipboard.writeText(`/share/${userData.id}`);
                                } else {
                                    navigate(`/matchCard?origUser=${userData.id}&matchedUser=${clickedMatchUserId}`);
                                }
                            }}/>
                            <img src={imgButton} alt='image' style={{
                                cursor: 'pointer'
                            }} onClick={() => {
                                if (tab) {
                                    navigate(`/share/${userData.id}`, { state: { qr: true } })
                                } else {
                                    navigate(`/matchCard?origUser=${userData.id}&matchedUser=${clickedMatchUserId}`);
                                }
                            }}/>
                        </div>
                    </Popup>
                </>
            </Popup>

            <Header />
            <TabSwitch tab={tab} setTab={setTab} />
            <Container className='flex-grow-1 overflow-auto mb-5' >
                <Row lg={2} className='my-3'>
                    {tab ?
                        <>
                            <Col className='justify-content-center d-flex'>
                                <div className='d-flex flex-column my-3' style={{ cursor: 'pointer' }} onClick={() => onMyCardClick(<MyCard />)} >
                                    <GenCard userQuadra={quadra} avatar_index={userData.avatarIndex} />
                                </div>
                            </Col>
                            <Col className='d-flex align-items-center justify-content-center'>
                            <div style={{ cursor: 'pointer' }} onClick={() => setShowNotification(true)} >
                                <AddCardButton />
                            </div>
                            </Col>
                        </>
                        : <>
                            {
                                matchedCardsData.length ? <>
                                    {
                                        matchedCardsData.map((data, index) => {
                                            return <Col key={index} className='justify-content-center d-flex'>
                                                <div style={{ cursor: 'pointer' }}
                                                onClick={() => onMatchCardClick(<MatchCard origID={userData.id} matchedUserID={data.matchedUserId} />, data.matchedUserId)}>
                                                <GenCard cardType='match'
                                                avatar_index={userData.avatarIndex} 
                                                userQuadra={quadra}
                                                matchedQuadra={data.matchedUserQuadra} 
                                                matchedUserName={data.matchedUserName}
                                                matchedUserAvartarIndex={data.matchedUserAvatarIndex}/>
                                                 </div>
                                            </Col>
                                        })
                                    }
                                    <Col className='d-flex align-items-center justify-content-center' >
                                        <div style={{ cursor: 'pointer' }} onClick={shareCard} >
                                            <AddCardButton startMatching={true}/>
                                        </div>
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