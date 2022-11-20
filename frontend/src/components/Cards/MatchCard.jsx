import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context';
import Loading from '../Loading/Loading/';
import patternWaves from '../../assets/patternWaves.svg';
import male from '../../assets/avatarMale.svg';
import female from '../../assets/avatarFemale.svg';
import RadarChart from '../Charts/RadarChart';
import { useNavigate } from "react-router-dom";
import share from '../../assets/myCard/share.svg';
import deck from '../../assets/footer/cards.svg';
import Header from '../Header/Header';
function MatchCard(props) {
  
    const { userData } = useContext(GlobalContext);
    const [cardData, setCardData] = useState({});
    const [matchedUser, setMatchedUser] = useState('');
    const [matchedCard, setMatchedCard] = useState({});
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    function fetchUserData(setUser, setCardData, id) {
        fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/user/${id}?userType=REAL`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setUser(data[0]);
                }
            })
            .catch(err => console.log(err.message));
        fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/result?userId=${id}`)
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
    }
    useEffect(() => {
        fetchUserData(setUser, setCardData, userData.id);
        let matchedId = props.matchedUserID;
        if (matchedId === userData.id) {
            matchedId = props.origID;
        }
        if (matchedId) {
            fetchUserData(setMatchedUser, setMatchedCard, matchedId);
        }
    }, []);
    if (user.name && matchedUser.name && cardData.description && matchedCard.description) {
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
                                    <RadarChart 
                                        userData={cardData.dimensional_values}
                                        matchData={matchedCard.dimensional_values}
                                        enableLabels={true} 

                                        />
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
                            <img src={share} alt='share' className='w-75' onClick={() => navigate(`/share/${userData.id}`)}/>
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