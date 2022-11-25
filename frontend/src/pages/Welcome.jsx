import Container from 'react-bootstrap/Container';
import logo from '../assets/tarockLogo.svg';
import patternTarock from '../assets/patternTarock.svg';
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context';
import Loading from '../components/Loading/Loading';

function Welcome() {
    const { userData } = useContext(GlobalContext);
    const navigate = useNavigate();
    const search = useLocation().search;
    const matchUserId = new URLSearchParams(search).get('match');

    const handleRedirect = () => {
        if (userData.type === 'REAL') {
            if (userData.isAuthorized) {
                navigate(`/cards?match=${matchUserId}`);
            } else {
                navigate(`/signin?match=${matchUserId}`, { state: { stage: 'signin' } });
            }
        } else if (userData.type === 'TMP') {
            navigate(`/test?match=${matchUserId}`);
        } else if (userData.type === 'NEW') {
            navigate(`/signin?match=${matchUserId}`, { state: { stage: 'new' } });
        }
    }

    useEffect(() => {
        if (matchUserId) {
            handleRedirect();
        } else if (userData.type === 'NEW') {
            navigate("/signin", { state: { stage: 'new' } });
        } else if (userData.type === 'REAL') {
            if (userData.isAuthorized) {
                navigate("/signin", { state: { stage: 'welcome' } });
            } else {
                navigate("/signin", { state: { stage: 'signin' } });
            }
        } else if (userData.type === 'TMP') {
            navigate("/test");
        }
    }, []);
    
    return (
        <Loading/>
    )
}

export default Welcome;