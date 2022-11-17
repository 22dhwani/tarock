import Form from "react-bootstrap/Form";
import { GlobalContext } from '../../context';
import { useContext } from 'react';
import { useState } from "react";
import { Container } from "react-bootstrap";
import buttonBack from '../../assets/buttonBack.svg';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
function EditProfile() {
    const { userData } = useContext(GlobalContext);
    const placeholders = ["First and Last Name", "mm/dd/yyyy", ""];
    const formItems = ['Name', 'DOB']
    const [formData, setFormData] = useState(
        {
            name: "",
            DOB: "",
            gender: "",
        }
    )
    console.log(formData.gender);
    async function handleSubmit() {

        let avatarIndex;
        if (formData.gender === "Male") {
            avatarIndex = 1;
        } else if (formData.gender === "Female") {
            avatarIndex = 0;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/user`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    name: formData.name,
                    avatarIndex: avatarIndex,
                    gender: formData.gender,
                    dob: formData.DOB,
                    userId: userData.id,
                    email: userData.email,
                    userType: userData.type
                    //Password: formData.password
                })
            })
            const data = await response.json();
            console.log(data);
            navigate("/user")
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
        <Container className='d-flex flex-column min-vh-100 p-5 ' style={{ backgroundColor: '#FBF2DC' }}>

            <div className="d-flex align-items-center gap-5 " style={{
                position: 'relative',
                right: '40px',
                display: 'flex',

            }}>
                {/* use conditional rendering for faster switch */}
                <Link to='/user'>
                    <img src={buttonBack} alt="back button" style={{ width: '50px', height: '50px' }} />
                </Link>
                <h5>Edit my information</h5>
            </div>

            <div style={{
                position: 'relative',
                top: '3rem',
                zIndex: '1000',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
            }}>
                <Form >
                    {formItems.map((item, index) => {
                        return (
                            <Form.Group className="mb-3" key={index}>
                                <Form.Label>{item}</Form.Label>
                                <Form.Control type="text" placeholder={placeholders[index]} name={item} onChange={handleChange} />
                            </Form.Group>
                        )
                    })}
                    {/* dropdown for gender */}
                    <Dropdown>
                        <Dropdown.Toggle style={
                            {
                                backgroundColor: '#49304D',
                                color: '#FFFFFF',
                            }}>
                            Gender
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                           {/* Gender = Male, Female */}
                            {['Male','Female','Prefer not to say'].map((item, index) => {
                                return (
                                    <Dropdown.Item key={index} onClick={() => setFormData(prevFormData => {
                                        return {
                                            ...prevFormData,
                                            gender: item
                                        }
                                    })}>{item}</Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>


                </Form>
            </div>
            <button
                onClick={handleSubmit}
                className='w-100 rounded-5 py-3 mt-auto mb-5' style={{
                    backgroundColor: '#49304D',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    lineHeight: '14px',
                    border: 'none',
                }}>Save</button>
        </Container>
    )
}
export default EditProfile;