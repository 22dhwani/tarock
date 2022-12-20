import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../../context';
import logo from '../../../assets/tarockLogo.svg';
import Loading from '../../Loading/Loading/';
import RadarChart from '../../Charts/RadarChart';
import { useLocation, useNavigate } from "react-router-dom";
import UserInfo from './UserInfo';
import Swipper from '../../Swipper/Swipper';
import Header from '../../Header/Header';
import chartImg from '../../../assets/chart/chart_bg_black_text.png';
import { getUserMatchChartImageData, getUserMatchLinearColorFromQuadra } from '../../../utils/userUtil';

function MatchCard(props) {

    const { userData } = useContext(GlobalContext);
    const [cardData, setCardData] = useState({});
    const [matchedUser, setMatchedUser] = useState('');
    const [matchedCard, setMatchedCard] = useState({});
    const [matchingTips, setMatchingTips] = useState([]);
    const [user, setUser] = useState('');
    const searchParams = new URLSearchParams(useLocation().search);
    const origUserFromUrl = searchParams.get('origUser');
    const matchedUserFromUrl = searchParams.get('matchedUser');
    const navigate = useNavigate()

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
        fetchUserData(setUser, setCardData, origUserFromUrl ? origUserFromUrl : userData.id);
        let matchedId = matchedUserFromUrl ? matchedUserFromUrl : props.matchedUserID;
        if (!origUserFromUrl && !matchedUserFromUrl && matchedId === userData.id) {
            matchedId = props.origID;
        }
        if (matchedId) {
            fetchUserData(setMatchedUser, setMatchedCard, matchedId);
        }
    }, []);

    useEffect(() => {
        setMatchingTips(parseMatchingTips(matchedCard.personality_code, matchedUser.name));
    }, [cardData, matchedCard]);

    function parseMatchingTips(matchedType, matchedUserName) {
        if (!matchedType || !matchedUserName) {
            return [];
        }
        if (cardData && cardData.matching_tips) {
            if (cardData.personality_code === matchedType && !cardData.matching_tips[matchedType]) {
                // Return a placeholder for the identical matched types.
                return ['Is that a mirror?'];
            }
            const list = cardData.matching_tips[matchedType] ?? [];
            const shuffled = list.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 2);
            return selected.map((item) => {
                return item.replaceAll('[User_' + cardData.personality_code + ']', user?.name?.trim().split(' ')[0]).replaceAll('[User_' + matchedType + ']', matchedUserName?.trim().split(' ')[0]);
            });
        }
        return [];
    }

    function getColor(quadra) {
        if (quadra === 'Alpha') {
            return '#3069B3';
        } else if (quadra === 'Beta') {
            return '#EBBD45';
        } else if (quadra === 'Gamma') {
            return '#69C7BF';
        } else if (quadra === 'Delta') {
            return '#BB6BD9';
        }
    }
    let userQuadra = getColor(cardData.personality_socionic_quadra);
    let matchedQuadra = getColor(matchedCard.personality_socionic_quadra);
    const linearColor = getUserMatchLinearColorFromQuadra(cardData.personality_socionic_quadra, matchedCard.personality_socionic_quadra)
    const linearColorWithNoise = `url("../assets/cards/noise.png"), ${linearColor}`
    const location = useLocation().pathname;
    if (user.name && matchedUser.name && cardData.description && matchedCard.description) {

        const userChartDataImage = getUserMatchChartImageData(cardData.personality_category)
        const matchedChartDataImage = getUserMatchChartImageData(matchedCard.personality_category)

        const matchView = <div className={`${location === '/matchCard' && "d-flex flex-column justify-content-center min-vh-100"}`}>
            <div className='py-5 rounded-4 text-white card-noise' style={{ backgroundImage: linearColorWithNoise }}>
                <div className='d-flex flex-column gap-4'>
                    {location === '/matchCard' && <img src={logo} alt="logo" height='23.83px' width='120px' className='mb-3 mx-auto' onClick={()=>navigate('/')} style={{cursor:'pointer'}}/>}
                    <UserInfo cardData={cardData} user={user} />
                    <div className='px-3'>
                        <div style={{
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.6) 100%)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '8px',
                            height: '300px',
                            margin: '0 auto',
                            width: '100%',
                            padding: '20px',
                        }}>
                            <div className="position-relative" style={{height: "260px"}}>
                                <img src={chartImg} alt="" style={{width: '100%',height: "100%", objectFit: 'contain',}} />
                                <img src={userChartDataImage} alt="" style={{width: '100%',height: "100%", objectFit: 'contain', position: 'absolute', top: 0, left: '0'}} />
                                <img src={matchedChartDataImage} alt="" style={{width: '100%',height: "100%", objectFit: 'contain', position: 'absolute', top: 0, left: '0'}} />
                            </div>
                        </div>
                    </div>
                    <UserInfo cardData={matchedCard} user={matchedUser} />
                    {
                        location === '/matchCard' &&
                        <div className='mt-2' style={{
                            textAlign: 'center',
                            fontWeight: '500',
                            fontSize: '14px',
                            color: 'white'
                        }}>
                            tarockapp.com
                        </div>
                    }
                </div>
            </div>
        </div>

        const tipsView = <div className='py-5 rounded-4' style={{ backgroundImage: linearColorWithNoise }}>
            <div className='d-flex flex-column gap-4 text-white'>
                <UserInfo cardData={cardData} user={user} />
                <div className='px-3'>
                    <div style={{
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.6) 100%)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '8px',
                        color: "#49304D",
                        height: '300px',
                        margin: '0 auto',
                        width: '100%',
                        padding: '20px',
                        overflow: 'auto'
                    }}>
                        {matchingTips.map((item, index) => {
                            return (
                                <p key={index}>
                                    {item}
                                </p>
                            )
                        })}
                    </div>
                </div>
                <UserInfo cardData={matchedCard} user={matchedUser} />
            </div>
        </div>
        return (
            <>
                {
                    location === '/matchCard' || matchingTips.length == 0 ? matchView : <Swipper data={[matchView,tipsView]} />
                }
            </>

        );
    } else {
        return <Loading />
    }
}

export default MatchCard;