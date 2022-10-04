import Container from 'react-bootstrap/Container';
import logo from '../../assets/tarockLogo.svg'
import pattern from '../../assets/pattern.svg'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
function SignInScreen(props) {
    return (
        <Container style={{ backgroundColor: '#FBF2DC' }}>
            <img src={logo} alt="logo" height='23.83px' width='120px' className='my-5' style={{
                margin: '0 auto',
            }} />

            <div style={{
                fontWeight: '700',
                fontSize: '36px',
                lineHeight: '36px',
                textAlign: 'left',
                color: '#49304D',
                paddingBottom: '25px',
                paddingTop: '10px'
            }}>
                <span>Welcome to <br></br>Tarock, the personality test <br></br>app that tells you more</span>

            </div>

<div style={{
                position: 'relative',
                top: '100px',
                zIndex: '1000',
                display: 'flex',
                flexDirection: 'column',
            gap: '20px',
            }}>
            <Form >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control className='py-3' type="email" placeholder="First and Last name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control className='py-3' type="password" placeholder="Password" />
                </Form.Group>

                <button className='w-100 rounded-5 py-3' style={{
                    backgroundColor: '#49304D',
                    color: '#999999',
                    fontSize: '16px',
                    lineHeight: '14px',
                    border: 'none',

                }}>Sign In</button>
            </Form>
            <button className='w-100 rounded-5 py-3' style={{
                    backgroundColor: 'transparent',
                    color: 'black',
                    fontSize: '16px',
                    lineHeight: '14px',
                    fontWeight: '700',

                }}>Sign Up</button>
</div>

            <img src={pattern} alt="pattern" height='210px'
                className='fixed-bottom' style={{ zIndex: '100' }} />
        </Container>
    )
}

export default SignInScreen;