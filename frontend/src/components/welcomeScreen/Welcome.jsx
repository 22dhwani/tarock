import Container from 'react-bootstrap/Container';
import logo from '../../assets/tarockLogo.svg';
import pattern from '../../assets/pattern.svg';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';

function Welcome(props) {
    // Get user fingerprint
    const {
        isLoading,
        error,
        data,
    } = useVisitorData();
    if (data) {
        console.log("User fingerprint: " + data.visitorId);
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
           
            <button
                style={{
                    backgroundColor: '#49304D',
                    color: '#999999',
                    fontSize: '16px',
                    lineHeight: '14px',
                    position: 'relative',
                    top: '400px',
                    zIndex: '1000',
                    border: 'none',
                }}
                className='rounded-5 py-3'>
                Next
            </button>
            
            <img src={pattern} alt="pattern" height='210px' 
            className='fixed-bottom' style={{zIndex:'100'}} />
        </Container>
    )
}

export default Welcome;