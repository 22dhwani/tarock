import Container from 'react-bootstrap/Container';
import logo from '../../assets/tarockLogo.svg'
import pattern from '../../assets/pattern.svg'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import AvatarCreation from '../avatarCreationScreen.jsx/AvatarCreation';
import { GlobalContext } from '../../context';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

function SignInScreen(props) {
    const [user, setUser] = useState('');
    const [avatar, setAvatar] = useState(false);
    const [avatarPage, setAvatarPage] = useState(true);
    const { userId } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            name: "",
            gender: 0,
            password: "",
           
        }
    )

    async function handleSubmit() {
        //hide api
        try {
            const response = await fetch('http://35.184.195.100:3000/api/user', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    avatarIndex: formData.gender,
                    gender: formData.gender ? 'Male' : 'Female',
                    userId: userId,
                    //Email: formData.email,
                    //Password: formData.password
                })
            })
            const data = await response.json();
            console.log(data);
            navigate("/test")
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

    async function handleSignIn(event) {
        event.preventDefault();
        try {
            const response = await fetch(`http://35.184.195.100:3000/api/user/${userId}`);
            let obj = await response.json();
            console.log(obj)
            //check for email password in future
        } catch (error) {
            console.log(error);
        }
        
    }

    function createAvatar() {
        setAvatarPage(!avatarPage);
    }

    function handleUser(event) {
        event.preventDefault();
        setUser('User');
        setAvatar(true);
    }

    function handleBack() {
        setAvatar(false);
    }

    function handelGuest(event) {
        setUser('Guest');
        setAvatar(true);
    }
    return (
        <Container className='d-flex flex-column vh-100' style={{ backgroundColor: '#FBF2DC'}}>
            {avatarPage ? <>
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
                    <span>Welcome to Tarock, where personality is harnessed</span>

                </div>

                <div style={{
                   position: 'relative',
                   top: '15rem',
                    zIndex: '1000',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}>
                    <Form onSubmit={handleUser}>
                        <Form.Group className="mb-3">
                            <Form.Control className='py-3' type="text" placeholder="First and Last name"
                                onChange={handleChange}
                                name='name'
                                required
                                value={formData.name} />
                        </Form.Group>

                        {/* {!avatar && <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Control className='py-3' type="password" placeholder="Password"
                                onChange={handleChange}
                                name='password'
                                value={formData.password} />
                        </Form.Group>}

                        {!avatar && <button
                            onClick={handleSignIn}
                            className='w-100 rounded-5 py-3' style={{
                                backgroundColor: '#49304D',
                                color: '#999999',
                                fontSize: '16px',
                                lineHeight: '14px',
                                border: 'none',

                            }}>Sign In</button>} */}
                    </Form>

                 
                    {/* {!avatar && <button
                        onClick={handleUser}
                        className='w-100 rounded-5 py-3' style={{
                            backgroundColor: 'transparent',
                            color: 'black',
                            fontSize: '16px',
                            lineHeight: '14px',
                            fontWeight: '700',

                        }}>Sign Up</button>
                    } */}

                    {/* {!avatar && <button
                        onClick={handelGuest}
                        className='w-100 rounded-5 py-3' style={{
                            backgroundColor: 'transparent',
                            color: 'black',
                            fontSize: '16px',
                            lineHeight: '14px',
                            fontWeight: '700',

                        }}>Continue as guest</button>
                    } */}

                    {!avatar && <button
                        onClick={createAvatar}
                        className='w-100 rounded-5 py-3' style={{
                            backgroundColor: '#49304D',
                            color: '#999999',
                            fontSize: '16px',
                            lineHeight: '14px',
                            border: 'none',

                        }}>Create Avatar</button>}

                    {/* {avatar && <button
                        onClick={handleBack}
                        className='w-100 rounded-5 py-3' style={{
                            backgroundColor: 'transparent',
                            color: 'black',
                            fontSize: '16px',
                            lineHeight: '14px',
                            fontWeight: '700',

                        }}> {'<-- Go back'} </button>} */}
                </div>

                <img src={pattern} alt="pattern" 
                    className=' w-100 mt-auto' style={{ zIndex: '100' }} />
            </> : <AvatarCreation
                gender={formData.gender}
                setGender={setFormData}
                handleBack={createAvatar}
                handleOk={handleSubmit}
            />}
        </Container>
    )
}

export default SignInScreen;