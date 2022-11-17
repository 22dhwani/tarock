import Container from 'react-bootstrap/Container';
import logo from '../../assets/tarockLogo.svg'
import avatar from '../../assets/avatar.svg'
import editInfo from '../../assets/editInfo.svg'
import modifyAvatar from '../../assets/modifyAvatar.svg'
import articles from '../../assets/articles.svg'
import community from '../../assets/community.svg'
import privacy from '../../assets/privacy.svg'
import about from '../../assets/about.svg'
import contact from '../../assets/contact.svg'
import ButtonGroup from './ButtonGroup';
import Row from 'react-bootstrap/Row';
import Footer from '../common/Footer';
import Header from '../common/Header';
import { GlobalContext } from '../../context';
import { useContext } from 'react';
function UserProfile() {
    const { userData, setUserData } = useContext(GlobalContext);
    const buttonItems = [
        // [editInfo, modifyAvatar],
        // [articles,contact],
        // [articles, community],
        // [privacy, about, contact]
        [{
            button: editInfo,
            link: '/editProfile'
        },
        {
            button: modifyAvatar,
            link: '/modifyAvatar'
        }],
        [
        // {
        //     button: articles,
        //     link: '/articles'
        // },
        {
            button: about,
            link: 'https://tarock.webflow.io/about-us'
        },
        {
            button: contact,
            link: 'https://tarock.webflow.io/contact-us'
        }],
    ]

    
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

            {buttonItems.map((buttonItem, index) => {
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