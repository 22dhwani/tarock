import Form from "react-bootstrap/Form";
import { GlobalContext } from '../../context';
import { useContext } from 'react';
import { useState } from "react";
import { Container } from "react-bootstrap";
import buttonBack from '../../assets/buttonBack.svg';
import { Link } from 'react-router-dom';
function EditProfile() {
    const { userData } = useContext(GlobalContext);
    const placeholders = ["First and Last Name", "mm/dd/yyyy", ""];
    const formItems = ['Name', 'DOB', 'Gender']
    const [formData, setFormData] = useState(
        {
            Name: "",
            DOB: "",
            Gender: "",
        }
    )
    async function handleSubmit() {

        let avatarIndex;
        if (formData.Gender === "Male") {
            avatarIndex = 1;
        } else if (formData.Gender === "Female") {
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
                    name: formData.Name,
                    avatarIndex: avatarIndex,
                    gender: formData.Gender,
                    dob: formData.DOB,
                    userId: userData.id,
                    //Email: formData.email,
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
        <Container className='d-flex flex-column min-vh-100 px-5 rounded-5 my-1' style={{ backgroundColor: '#FBF2DC' }}>

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
                            <Form.Group className="mb-3" >
                                <Form.Label>{item}</Form.Label>
                                <Form.Control type="text" placeholder={placeholders[index]} name={item} onChange={handleChange} />
                            </Form.Group>
                        )
                    })}

                </Form>
            </div>
            <button
                onClick={handleSubmit}
                className='w-100 rounded-5 py-3 mt-auto mb-5' style={{
                    backgroundColor: '#49304D',
                    color: '#999999',
                    fontSize: '16px',
                    lineHeight: '14px',
                    border: 'none',

                }}>Save</button>
        </Container>
    )
}
export default EditProfile;