import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context';
import Loading from '../common/Loading';
import patternWaves from '../../assets/patternWaves.svg';
import male from '../../assets/avatarMale.svg';
import female from '../../assets/avatarFemale.svg';
import logo from '../../assets/tarockLogo.svg';
import RadarChart from '../Charts/RadarChart';
import { useNavigate, Link } from "react-router-dom";
import share from '../../assets/myCard/share.svg';
import deck from '../../assets/footer/cards.svg';
import Header from '../common/Header';
function MatchCard() {
    const { userData } = useContext(GlobalContext);
    const [cardData, setCardData] = useState({});
    const [matchedUser, setMatchedUser] = useState();
    const [matchedCard, setMatchedCard] = useState({});
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    function fetchUserData(setUser, setCardData) {
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
    }
    useEffect(() => {
        fetchUserData(setUser, setCardData);
        if (userData.matchedUser) {
            fetchUserData(setMatchedUser, setMatchedCard);
        }
    }, []);
    if (user.name && cardData.description) {
        return (
            <div className='pb-3' style={{
                backgroundImage: `url(${patternWaves})`,
                backgroundColor: 'black',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                overflow: 'hidden',
                minHeight: '100vh',
            }}>
                <div className='d-flex flex-column gap-4'>
                    <Header />
                    <div className='d-flex gap-3 justify-content-center align-items-center mx-3'>
                        <img src={male} alt='user1' width='70px' style={{
                            border: '4px solid #EC6348',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                        }} />
                        <div >
                            <p style={{
                                fontWeight: '700',
                                fontSize: '20px',
                                lineHeight: '10px',
                                color: 'white',
                            }}>{user.name}</p>

                            <p style={{
                                fontWeight: '500',
                                fontSize: '14px',
                                lineHeight: '10px',
                                color: 'white',
                                lineHeight: '20px',
                            }}>
                                {cardData.description.STRENGTHS.replaceAll(';', ',')}.
                            </p>
                        </div>
                    </div>

                    <div className='px-3'>

                        <div style={{
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.6) 100%)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '8px',
                            height: '300px',
                            margin: '0 auto',
                            width: '100%',
                        }} >
                            <div className='d-flex justify-content-center'>
                                <div className='mx-auto'>
                                    <RadarChart apiResponse={cardData.dimensional_values} enableLabels={true} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {matchedUser && <div className='d-flex gap-3 justify-content-center align-items-center  mx-3'>
                        <img src={female} alt='user2' width='70px' style={{
                            border: '4px solid #69C7BF',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                        }} />
                        <div >
                            <p style={{
                                fontWeight: '500',
                                fontSize: '14px',
                                lineHeight: '10px',
                                color: 'white',
                                lineHeight: '20px',
                            }}>
                                {matchedCard.description.STRENGTHS.replaceAll(';', ',')}.
                            </p>
                            <p style={{
                                fontWeight: '700',
                                fontSize: '20px',
                                lineHeight: '10px',
                                color: 'white',
                            }}>{matchedUser.name}</p>
                        </div>
                    </div>}
                    {
                        //to be used to display qr code
                        // props.showShare &&

                        <div className='d-flex justify-content-center gap-2'>
                            <img src={share} alt='share' className='w-75' />
                            <div style={{
                                borderRadius: '8px',
                                backgroundColor: 'black',
                                color: 'white',
                                cursor: 'pointer',
                                padding: '10px',
                            }}
                                onClick={() => navigate('/cards')}
                            >
                                <img src={deck} alt='deck' width='40px' />
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    } else {
        return <Loading />
    }
}

export default MatchCard;