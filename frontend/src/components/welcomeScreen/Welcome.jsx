import Container from 'react-bootstrap/Container';
import logo from '../../assets/tarockLogo.svg';
import pattern from '../../assets/pattern.svg';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import {Link} from 'react-router-dom';
import { redirect } from "react-router-dom";
import { useContext } from 'react';
import { GlobalContext } from '../../context';

function Welcome() {
    const { userID, setUserID } = useContext(GlobalContext);

    // Get user fingerprint
    const {data} = useVisitorData();
    if (data) {
        setUserID(data.visitorId);
        console.log("User fingerprint: " + userID);
    }

    function handleClick() {
         redirect("/signin");
    }
    return (
        <Container style={{ backgroundColor: '#FBF2DC'}}>
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
                <span>User Name!</span>
            </div>
           
        <Link to="/signin"  className='rounded-5 py-3' style={{
                        backgroundColor: '#49304D',
                        color: '#999999',
                        fontSize: '16px',
                        lineHeight: '14px',
                        position: 'relative',
                        top: '320px',
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

            <img src={pattern} alt="pattern" height='210px' 
            className='fixed-bottom' style={{zIndex:'100'}} />
        </Container>
    )
}

export default Welcome;