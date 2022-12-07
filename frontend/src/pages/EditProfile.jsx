import Form from "react-bootstrap/Form";
import { GlobalContext } from '../context';
import { useContext } from 'react';
import { useState } from "react";
import Container from "react-bootstrap/Container";
import buttonBack from '../assets/buttonBack.svg';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import './styles.css';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

function EditProfile() {
    const { userData, setUserData } = useContext(GlobalContext);
    const placeholders = ["First and Last Name", "mm/dd/yyyy"];
    const formItems = [
        { label: 'Name', name: 'name' },
        { label: 'Date of birth', name: 'dob' }
    ];
    const [formData, setFormData] = useState(
        {
            name: userData.name,
            dob: userData.dob,
            gender: "",
        }
    )
    const [validation, setValidation] = useState(false);
    const navigate = useNavigate();


    function getValidation() {
        const forms = document.getElementById('infoForm');
        if (forms.length > 0) {
            return forms[0].checkValidity();
        }
        return false;
    }

    async function handleSubmit() {
        setValidation(true);
        const validation = getValidation();
        if (!validation) {
            return;
        }

        const bodyData = {
            name: formData.name,
            dob: formData.dob,
            userId: userData.id,
            userType: 'REAL'
        };
        if (formData.gender) {
            bodyData.gender = formData.gender;
        }

        try {

            await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/user`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(bodyData)
            }).then(response => response.json())
                .then(data => {
                    setUserData((prevUserData) => ({
                        ...prevUserData,
                        name: formData.name,
                        gender: formData.gender ? formData.gender : prevUserData.gender,
                        dob: formData.dob
                    }));
                    navigate('/user');
                })
        } catch (error) {
            console.log(error);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    return (
        <Container className='d-flex flex-column min-vh-100 pt-4' style={{ backgroundColor: '#FBF2DC' }}>
            <Row>
                <Col className='col-2 d-flex justify-content-center align-self-center'>
                    <img src={buttonBack} alt="back" onClick={() => {navigate('/user')}}/>
                </Col>
                <Col className='col-8 d-flex justify-content-center align-self-center'>
                    <div style={{
                        fontFamily: 'Montserrat',
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: '#49304D',
                    }}>Account settings</div>
                </Col>
                <Col className='col-2'></Col>
            </Row>

            <div className={'px-3'} style={{
                position: 'relative',
                top: '3rem',
                zIndex: '1000',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
            }}>
                <Form id='infoForm' validated={validation}>
                    {formItems.map((item, index) => {
                        return (
                            <Form.Group className="mb-3" key={index}>
                                <Form.Label style={{
                                    fontFamily: 'Montserrat',
                                    fontWeight: '700',
                                    fontSize: '12px',
                                    lineHeight: '12px',
                                    color: '#49304D',
                                }}>{item.label}</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder={placeholders[index]}
                                    name={item.name}
                                    onChange={handleChange}
                                    value={formData[item.name]}
                                    pattern={item.name === 'dob' ? '(?:(?:0[1-9]|1[0-2])[\/\\-. ]?(?:0[1-9]|[12][0-9])|(?:(?:0[13-9]|1[0-2])[\/\\-. ]?30)|(?:(?:0[13578]|1[02])[\/\\-. ]?31))[\/\\-. ]?(?:19|20)[0-9]{2}' : undefined}
                                />
                                <Form.Control.Feedback type="invalid">Please enter a valid {item.label.toLowerCase()}</Form.Control.Feedback>
                            </Form.Group>
                        )
                    })}
                    {/* dropdown for gender */}
                    <Form.Label style={{
                            fontFamily: 'Montserrat',
                            fontWeight: '700',
                            fontSize: '12px',
                            lineHeight: '12px',
                            color: '#49304D',
                        }}>Gender</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle style={
                            {
                                width: '100%',
                                backgroundColor: 'white',
                                color: '#999999'
                            }}>
                            {formData.gender === "" ? "Choose your gender" : formData.gender}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{width: '100%'}} >
                            {['Male', 'Female', 'Other'].map((item, index) => {
                                return (
                                    <Dropdown.Item style={{color: '#49304D'}} key={index} onClick={() => setFormData(prevFormData => {
                                        return {
                                            ...prevFormData,
                                            gender: item
                                        }
                                    })}>
                                        {item}
                                    </Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </div>
            <button
                onClick={handleSubmit}
                className='w-100 rounded-5 py-3 mt-auto mb-5' style={{
                    fontFamily: 'Montserrat',
                    backgroundColor: '#49304D',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    lineHeight: '14px',
                    border: 'none',
                }}>
                Save
            </button>
        </Container>
    )
}
export default EditProfile;