import Container from 'react-bootstrap/Container';
import logo from '../assets/tarockLogo.svg';
import patternTarock from '../assets/patternTarock.svg';
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context';

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
                navigate(`/signin?match=${matchUserId}`);
            }
        } else if (userData.type === 'TMP') {
            navigate(`/test?match=${matchUserId}`);
        } else if (userData.type === 'NEW') {
            navigate(`/signin?match=${matchUserId}`);
        }
    }

    useEffect(() => {
        if (matchUserId) {
            handleRedirect();
        }
        if (userData.type === 'NEW') {
            navigate("/signin");
        }
    }, []);
    
    const handleClick = () => {
        if (userData.type === 'REAL') {
            if (userData.isAuthorized) {
                navigate("/home");
            } else {
                navigate("/signin");
            }
        } else if (userData.type === 'TMP') {
            navigate("/test");
        }
    }

    return (
        <Container className='d-flex flex-column min-vh-100' style={{ backgroundColor: '#FBF2DC'}}>
            <img src={logo} alt="logo" height='23.83px' width='120px' className='my-5' style={{
                margin: '0 auto',
            }} />

            <div style={{
                fontWeight: '700',
                fontSize: '36px',
                lineHeight: '36px',
                textAlign: 'center',
                color: '#49304D',
                paddingBottom: '25px',
                paddingTop: '10px'
            }}>
                <span>Welcome back,</span>
                <br />
                <span>{userData.name}!</span>
            </div>
           <div className='d-flex flex-column mt-auto'>
        <div className='rounded-5 py-3' style={{
                        backgroundColor: '#49304D',
                        color: '#999999',
                        fontSize: '16px',
                        lineHeight: '14px',
                        position: 'relative',
                        top: '8rem',
                        zIndex: '1000',
                        border: 'none',
                        textDecoration: 'none',
                        textAlign: 'center',
                    }}>
                <button
                    onClick={handleClick}
                    style={{
                        color: '#999999',
                        border: 'none',
                        backgroundColor: 'transparent',
                    }}
                   >
                    Next
                </button>
            </div>

            <img src={patternTarock} alt="pattern" 
            className='  w-100' style={{zIndex:'100'}} />
            </div>
        </Container>
    )
}

export default Welcome;