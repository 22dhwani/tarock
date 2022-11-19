import Container from 'react-bootstrap/Container';
import maleAvatar from '../assets/avatarMale.svg'
import femaleAvatar from '../assets/avatarFemale.svg'
import ButtonGroup from '../components/Buttons/ButtonGroup/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { GlobalContext } from '../context';
import { useContext } from 'react';
import { profileOptions } from '../contentData/profileOptions';

function UserProfile() {
    const { userData } = useContext(GlobalContext);
    return (
        <Container className='d-flex flex-column min-vh-100 ' style={{ backgroundColor: '#FBF2DC' }}>
            <Header />
            <Row className='m-auto'>
                <div style={{
                    width: 'fit-content'
                }}>
                    <img src={userData.avatarIndex ? maleAvatar : femaleAvatar} alt="avatar" height='120px' width='120px' style={{
                        margin: '0 auto',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '50%',
                        padding: '10px'

                    }} />
                </div>
            </Row>

            <div style={{
                fontWeight: '700',
                fontSize: '20px',
                lineHeight: '24px',
                textAlign: 'center',
                color: '#49304D',
                paddingBottom: '25px',
                paddingTop: '10px'
            }}>
                {userData.name}
            </div>

            {profileOptions.map((buttonItem, index) => {
                return (
                    <div key={index} className='my-2 rounded-4 p-1' style={{
                        width: 'fit-content',
                        backgroundColor: '#FFFFFF',
                        margin: '0 auto',
                    }}>
                        {buttonItem.map((button, index) => {
                            return (
                                <ButtonGroup
                                    key={index}
                                    buttons={[button]}
                                />
                            )
                        })}
                    </div>
                )
            }
            )}
            <Footer isMeActive={true} />
        </Container>
    );
}

export default UserProfile;