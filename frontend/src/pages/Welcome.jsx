import Container from 'react-bootstrap/Container';
import logo from '../assets/logoSplash.svg';
import patternTarock from '../assets/patterns/patternSplash.svg';
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

    function callBack() {
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
    }

    useEffect(() => {
        setTimeout(() => callBack(), 2000);
    }, []);

    return (
        <Container className='min-vh-100' style={{ backgroundColor: '#EC6348', position: 'relative' }}>
            <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
                <img
                    src={logo}
                    alt="logo"
                    width='230px'
                    style={{
                        margin: '0 auto',
                        paddingBottom: '5rem'
                    }}
                />
            </div>

            <img
                src={patternTarock}
                alt="pattern"
                style={{
                    zIndex: '100',
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                }}
            />
        </Container>
    )
}

export default Welcome;