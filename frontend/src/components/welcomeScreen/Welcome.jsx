import Container from 'react-bootstrap/Container';
import logo from '../../assets/tarockLogo.svg';
import patternTarock from '../../assets/patternTarock.svg';
import { Link, redirect, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context';
import Loading from '../common/Loading';

function Welcome() {
    const { userId, setUserId } = useContext(GlobalContext);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Determine if user exists in database.
        fetch(`http://35.184.195.100:3000/api/user/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setUserName(data[0].name);
                } else {
                    navigate('/signin');
                }
            })
            .catch((err) => {
                console.log(err.message)
            });
    }, []);
    
    function handleClick() {
        redirect("/home");
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
        <Link to="/home"  className='rounded-5 py-3' style={{
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
            </Link>

            <img src={patternTarock} alt="pattern" 
            className='  w-100' style={{zIndex:'100'}} />
            </div>
        </Container>
    )
}

export default Welcome;