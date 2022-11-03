import Container from 'react-bootstrap/Container';
import logo from '../../assets/tarockLogo.svg';
import patternTarock from '../../assets/patternTarock.svg';
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context';
import Loading from '../common/Loading';

function Welcome() {
    const { userId, setUserId, userData, setUserData } = useContext(GlobalContext);
    const [userName, setUserName] = useState('');
    const [userType, setUserType] = useState('');
    const navigate = useNavigate();

    const getUser = (id, userType) => {
        fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/user/${id}?userType=${userType}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setUserName(data[0].name);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const getUserStatus = () => {
        fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/user/status/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                userData.type = data.userType;
                setUserData(userData);
                if (data.userType === 'REAL' || data.userType === 'TMP') {
                    setUserId(data.id);
                    setUserType(data.userType);
                    getUser(data.id, data.userType);
                } else {
                    navigate('/signin');
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    useEffect(() => {
        // Update page or navigate depending on the user status.
        getUserStatus();
    }, []);
    
    function handleClick() {
        if (userType === 'REAL') {
            fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/login/success`, {credentials: 'include'})
                .then((response) => {
                    if (!response.ok) {
                        navigate("/signin");
                    } else {
                        navigate("/home");
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else {
            navigate("/test");
        }
    }

    if (!userName) {
        return <Loading/>;
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
                <span>{userName}!</span>
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