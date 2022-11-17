import Container from 'react-bootstrap/Container';
import avatar from '../assets/avatar.svg'
import ButtonGroup from '../components/profileScreen/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import { GlobalContext } from '../context';
import { useContext } from 'react';
import {profileOptions} from '../contentData/profileOptions';

function UserProfile() {
    const { userData, setUserData } = useContext(GlobalContext);
    return (
        <Container className='d-flex flex-column min-vh-100 ' style={{ backgroundColor: '#FBF2DC'}}>
            <Header/>
            <Row>
                <img src={avatar} alt="avatar" height='120px' width='120px' style={{
                    margin: '0 auto',
                }} />
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
            <Footer isMeActive={true}/>
        </Container>
    );
}

export default UserProfile;