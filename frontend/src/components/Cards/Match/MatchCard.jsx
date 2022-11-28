import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../../context';
import Loading from '../../Loading/Loading/';
import RadarChart from '../../Charts/RadarChart';
import { useNavigate, useLocation } from "react-router-dom";
import UserInfo from './UserInfo';
import Swipper from '../../Swipper/Swipper';

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
    const location = useLocation().pathname;
    if (user.name && matchedUser.name && cardData.description && matchedCard.description) {

        const matchView = <div className='py-5 rounded-4 '
            style={{ backgroundImage: `linear-gradient(${userQuadra},${matchedQuadra})` }}>
            <div className='d-flex flex-column gap-4'>
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
                        <RadarChart
                            userData={cardData.dimensional_values}
                            matchData={matchedCard.dimensional_values}
                            enableLabels={true}
                            userQuadra={userQuadra}
                            matchedQuadra={matchedQuadra}
                        />
                    </div>
                </div>
                <UserInfo cardData={matchedCard} user={matchedUser} />
            </div>
        </div>

        const tipsView = <div className='py-5 rounded-4'
            style={{ backgroundImage: `linear-gradient(${userQuadra},${matchedQuadra})` }}>
            <div className='d-flex flex-column gap-4'>
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
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>
                </div>
                <UserInfo cardData={matchedCard} user={matchedUser} />
            </div>
        </div>
        return (
            <>
                {
                    location === '/match' ? matchView : <Swipper data={[matchView,tipsView]} />
                }
            </>

        );
    } else {
        return <Loading />
    }
}

export default MatchCard;