import Container from 'react-bootstrap/Container';
import Header from '../components/Header/Header.jsx';
import signup from '../assets/signin/signup.svg';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { GlobalContext } from '../context';
import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import male from '../assets/avatarMale.svg';
import female from '../assets/avatarFemale.svg';
import bi from '../assets/avatarBi.svg';
import line from '../assets/signin/line.svg';
import bg from '../assets/signin/bg.svg';
import { getUser, logout } from '../utils/userUtil';
import resend from '../assets/signin/resend.svg';
import GoogleButton from '../components/Buttons/GoogleButton/index.jsx';
function SignIn() {
    const { userData, setUserData } = useContext(GlobalContext);
    const navigate = useNavigate();
    const { state, search } = useLocation();
    const matchUserId = new URLSearchParams(search).get('match');
    const [stage, setStage] = useState('');
    const [validation, setValidation] = useState(false);
    const [avatarSelection, setAvatarSelection] = useState(userData.avatarIndex);
    const [formData, setFormData] = useState(
        {
            name: "",
            avatarIndex: userData.avatarIndex,
            password: "",
            email: "",
        }
    )

    useEffect(() => {
        if (state && state.stage) {
            setValidation(false);
            setStage(state.stage);
        } else {
            // No state or stage, navigate to main page.
            navigate('/');
        }
    }, []);

    function getGender(avatarIndex) {
        if (avatarIndex == 0) {
            return 'Female';
        } else if (avatarIndex == 1) {
            return 'Male';
        } else {
            return 'Other';
        }
    }

    async function handleSubmit() {
        try {
            const data = {
                name: formData.name ? formData.name : userData.name,
                avatarIndex: formData.avatarIndex,
                gender: userData.userType === 'REAL' ? undefined : getGender(formData.avatarIndex), // Don't update gender if user is updating avatar only
                userId: userData.id,
                userType: userData.type
            };
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/user`, {
                method: userData.type === 'NEW' ? 'POST' : 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error('User update failed!');
            }
            if (userData.type != 'REAL') {
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    name: data.name,
                    gender: data.gender,
                    avatarIndex: data.avatarIndex,
                    type: 'TMP'
                }));
                const nav = '/test' + (matchUserId ? `?match=${matchUserId}` : '');
                navigate(nav);
            } else {
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    gender: data.gender,
                    avatarIndex: data.avatarIndex,
                }));
                navigate(-1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    async function handleSignIn() {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                })
            });
            if (response.status == 401) {
                alert('Incorrect email and password.');
                return;
            }
            const data = await response.json();
            const user = await getUser(data.id, 'REAL');
            setUserData((prevUserData) => ({
                ...prevUserData,
                name: user.name,
                gender: user.gender,
                avatarIndex: user.avatar_index,
                email: user.email,
                dob: user.birth_date,
                id: user.internal_user_id,
                type: 'REAL',
                isAuthorized: true
            }));
            if (matchUserId) {
                navigate(`/cards?match=${matchUserId}`);
            } else {
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSignUp() {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    tempId: userData.visitorId,
                })
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const data = await response.json();
            const user = await getUser(data.id, 'REAL');
            setUserData((prevUserData) => ({
                ...prevUserData,
                name: user.name,
                gender: user.gender,
                avatarIndex: user.avatar_index,
                email: user.email,
                dob: user.birth_date,
                id: user.internal_user_id,
                type: 'REAL',
                isAuthorized: true
            }));
            if (matchUserId) {
                navigate(`/cards?match=${matchUserId}`);
            } else {
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
        }
    }

    function nextStage() {
        setValidation(true);
        const validation = getValidation();
        if (!validation) {
            return;
        }
        if (stage === 'new') {
            setValidation(false);
            setStage('avatar');
        } else if (stage === 'avatar') {
            handleSubmit();
        } else if (stage === 'signup') {
            handleSignUp();
        } else if (stage === 'signin') {
            handleSignIn();
        } else if (stage === 'welcome') {
            navigate('/home');
        } else if (stage === 'forgot') {
            forgotPassword();
            setValidation(false);
            setStage('resend');
        } else if (stage === 'resend') {
            forgotPassword();
        }
    }

    async function forgotPassword() {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/password/forget?email=${formData.email}`);
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function newGuest() {
        try {
            if (userData.isAuthorized) {
                await logout(userData.visitorId, setUserData);
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/user/updateIsPermanentUser`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userData.visitorId,
                    isPermanentUser: 0,
                })
            })
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            setUserData((prevUserData) => ({
                ...prevUserData,
                type: prevUserData.type === 'REAL' ? 'TMP' : 'NEW'
            }));
            setValidation(false);
            setStage('new');
        } catch (error) {
            console.log(error);
        }
    }

    function getValidation() {
        const forms = document.getElementById('signinForm');
        for (let i = 0; i < forms.length; i++) {
            if (!forms[i].checkValidity()) {
                return false;
            }
        }
        return true;
    }

    function getButtonText() {
        if (stage === 'signup') {
            return 'Sign Up';
        } else if (stage === 'signin') {
            return 'Login';
        } else if (stage === 'welcome') {
            return 'Start';
        } else if (stage === 'forgot') {
            return 'Confirm Email';
        } else if (stage === 'resend') {
            return 'Resend Email';
        }
        return 'Save & Continue';
    }

    function handleGoogleSignin() {
        let url = `${import.meta.env.VITE_SERVER_BASE_URL}/login/federated/google?id=${userData.id}&type=${userData.type}`;
        if (matchUserId) {
            const path = `/cards?match=${matchUserId}`;
            url += `&redirect=${encodeURIComponent(path)}`;
        } else {
            url += `&redirect=${encodeURIComponent('/home')}`;
        }
        window.location.href = url;
    }

    function goBack() {
        if (userData.type === 'REAL' && stage === 'avatar') {
            // Modify avatar navigated from setting page.
            navigate(-1);
        } else if (stage === 'avatar') {
            setValidation(false);
            setStage('new');
        } else if (stage === 'forgot') {
            setValidation(false);
            setStage('signin');
        } else if (stage === 'resend') {
            setValidation(false);
            setStage('forgot');
        }
    }

    return (
        <Container className='d-flex flex-column vh-100 px-0 pb-4' style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover'
        }}>
            <Header goBackFunc={stage != 'avatar' && stage != 'forgot' && stage != 'resend' ? undefined : goBack} />
            {
                stage === 'signup' &&
                <img src={signup} alt="signup" className='mx-auto mt-4' />
            }
            {
                stage === 'resend' &&
                <img src={resend} alt="resend" className='mx-auto mt-4' />
            }
            {
                stage != 'avatar' &&
                <div className='mt-3 mx-4 pt-2 pb-4 flex-grow-1' style={{
                    fontFamily: 'Montserrat',
                    fontWeight: '700',
                    fontSize: '28px',
                    lineHeight: '34px',
                    color: '#49304D',
                }}>
                    {
                        (stage === 'new' || stage === 'signin') &&
                        <span>Welcome to Tarock, where personality comes first.</span>
                    }
                    {
                        stage === 'welcome' &&
                        <span>Welcome back, {userData.name}!</span>
                    }
                    {
                        stage === 'signup' &&
                        <div>
                            <div>Yayy! Your test result is generated</div>
                            <div style={{
                                fontWeight: '500',
                                fontSize: '16px',
                                lineHeight: '19.5px',
                            }}>Sign up to view your test results</div>
                        </div>
                    }
                    {
                        stage === 'forgot' &&
                        <div>
                            <div>Forgot password?</div>
                            <div className={'mt-4'} style={{
                                fontWeight: '500',
                                fontSize: '16px',
                                lineHeight: '19.5px',
                            }}>Don't worry! It happens. Please confirm your email address to reset the password.</div>
                        </div>
                    }
                    {
                        stage === 'resend' &&
                        <div>
                            <div>Email sent</div>
                            <div className={'mt-4'} style={{
                                fontWeight: '500',
                                fontSize: '16px',
                                lineHeight: '19.5px',
                            }}>We sent an email to you. Please follow the instructions to reset the password.</div>
                        </div>
                    }
                </div>
            }
            {
                stage === 'avatar' &&
                <div className='flex-grow-1'>
                    <div style={{
                        fontFamily: 'Montserrat',
                        fontWeight: '700',
                        fontSize: '18px',
                        lineHeight: '22px',
                        color: '#49304D',
                        textAlign: 'center',
                    }}>Choose your avatar</div>
                    <Row className='my-4'>
                        <Col className='d-flex justify-content-center' onClick={() => {
                            setFormData(data => {
                                return {
                                    ...data,
                                    avatarIndex: 1
                                }
                            });
                            setAvatarSelection(1);
                        }}>
                            <img className='rounded-4' src={male} alt="male" style={{
                                backgroundColor: 'white',
                                height: '110px',
                                border: avatarSelection == 1 ? '4px solid #EBBD45' : ''
                            }} />
                        </Col>
                    </Row>
                    <Row className='my-4'>
                        <Col className='d-flex justify-content-center' onClick={() => {
                            setFormData(data => {
                                return {
                                    ...data,
                                    avatarIndex: 0
                                }
                            });
                            setAvatarSelection(0);
                        }}>
                            <img className='rounded-4' src={female} alt="female" style={{
                                backgroundColor: 'white',
                                height: '110px',
                                border: avatarSelection == 0 ? '4px solid #EBBD45' : ''
                            }} />
                        </Col>
                    </Row>
                    <Row className='my-4'>
                        <Col className='d-flex justify-content-center' onClick={() => {
                            setFormData(data => {
                                return {
                                    ...data,
                                    avatarIndex: 2
                                }
                            });
                            setAvatarSelection(2);
                        }}>
                            <img className='rounded-4' src={bi} alt="bi" style={{
                                backgroundColor: 'white',
                                height: '110px',
                                border: avatarSelection == 2 ? '4px solid #EBBD45' : ''
                            }} />
                        </Col>
                    </Row>
                </div>
            }
            {
                <Form id='signinForm' validated={validation}>
                    {stage === 'new' && <Form.Group className='mx-3'>
                        <Form.Label style={{
                            fontFamily: 'Montserrat',
                            fontWeight: '700',
                            fontSize: '12px',
                            lineHeight: '12px',
                            color: '#49304D',
                        }}>Your name</Form.Label>
                        <Form.Control className='py-3' type='text' placeholder='First and Last name'
                            onChange={handleChange}
                            name='name'
                            required
                            value={formData.name} />
                        <Form.Control.Feedback type="invalid">Please enter a name</Form.Control.Feedback>
                    </Form.Group>}
                    {(stage === 'signin' || stage === 'signup' || stage === 'forgot') && <Form.Group className='mx-3'>
                        <Form.Label style={{
                            fontFamily: 'Montserrat',
                            fontWeight: '700',
                            fontSize: '12px',
                            lineHeight: '12px',
                            color: '#49304D',
                        }}>Email</Form.Label>
                        <Form.Control className='py-3' type='email' placeholder='Your email'
                            onChange={handleChange}
                            name='email'
                            pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
                            required
                            value={formData.email} />
                        <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
                    </Form.Group>}
                    {(stage === 'signin' || stage === 'signup') && <Form.Group className='mx-3'>
                        <Form.Label style={{
                            fontFamily: 'Montserrat',
                            fontWeight: '700',
                            fontSize: '12px',
                            lineHeight: '12px',
                            color: '#49304D',
                        }}>Password</Form.Label>
                        <Form.Control className='py-3' type='password' placeholder='Your password'
                            onChange={handleChange}
                            name='password'
                            pattern='.{6,20}'
                            required
                            value={formData.password} />
                        <Form.Control.Feedback type="invalid">Please enter a valid password, length within 6 to 20</Form.Control.Feedback>
                    </Form.Group>}
                    {
                        stage === 'signin' &&
                        <div className='mt-3 mx-3' onClick={() => { setStage('forgot') }} style={{
                            fontFamily: 'Montserrat',
                            fontWeight: '500',
                            color: '#49304D',
                            fontSize: '12px',
                            lineHeight: '12px',
                            textAlign: 'right'
                        }}>
                            Forgot password?
                        </div>
                    }
                </Form>
            }
            {
                <div
                    className='rounded-5 py-3 mx-3 mt-3'
                    onClick={nextStage}
                    style={{
                        fontFamily: 'Montserrat',
                        fontWeight: '700',
                        backgroundColor: '#49304D',
                        color: '#FFFFFF',
                        fontSize: '16px',
                        lineHeight: '14px',
                        border: 'none',
                        textAlign: 'center',
                    }}>
                    {getButtonText()}
                </div>
            }
            {
                (stage === 'signup' || stage === 'signin') &&
                <img src={line} alt="line" className='mx-3 mt-4' />
            }
            {
                stage === 'signup' && <GoogleButton handleGoogleSignin={handleGoogleSignin} text='Signup'/>
            }
            {
                stage === 'signin' && <GoogleButton handleGoogleSignin={handleGoogleSignin} text='Login'/>
               
            }
            {
                stage != 'signup' &&
                <div className={'my-5'} style={{
                    fontFamily: 'Montserrat',
                    fontWeight: '500',
                    color: '#49304D',
                    fontSize: '14px',
                    lineHeight: '17px',
                    textAlign: 'center',
                }}>
                    {
                        stage === 'new' &&
                        <div>
                            <span>Already have an account? </span>
                            <span onClick={() => {
                                setValidation(false);
                                setStage('signin');
                            }} style={{
                                fontWeight: '700',
                                textDecoration: 'underline',
                            }}>Login</span>
                        </div>
                    }
                    {
                        stage === 'signin' &&
                        <div>
                            <span>Don't have an account? </span>
                            <span onClick={newGuest} style={{
                                fontWeight: '700',
                                textDecoration: 'underline',
                            }}>Sign up</span>
                        </div>
                    }
                    {
                        stage === 'welcome' &&
                        <div>
                            <span>Not you? </span>
                            <span onClick={newGuest} style={{
                                fontWeight: '700',
                                textDecoration: 'underline',
                            }}>Create a new account</span>
                        </div>
                    }
                    {
                        stage === 'avatar' && userData.type != 'REAL' &&
                        <div>
                            <span>By clicking Next, I agree to </span>
                            <a href={'https://www.tarock.me/terms-of-service'} style={{
                                fontWeight: '700',
                                textDecoration: 'underline',
                                color: '#49304D',
                            }}>Terms of Service</a>
                            <span> and </span>
                            <a href={'https://www.tarock.me/privacy-policy'} style={{
                                fontWeight: '700',
                                textDecoration: 'underline',
                                color: '#49304D',
                            }}>Privacy Policy</a>
                        </div>
                    }
                </div>
            }
        </Container>
    )
}

export default SignIn;