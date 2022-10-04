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
import testTick from '../../assets/testTick.svg'
import meActive from '../../assets/meActive.svg'
import cards from '../../assets/cards.svg'

function UserProfile() {
    const buttonItems = [
        [editInfo, modifyAvatar],
        [articles, community],
        [privacy, about, contact]
    ]
    const bottomNavItems = [testTick, cards, meActive]
    return (
        <Container fluid style={{ backgroundColor: '#FBF2DC', height: 'fit-content' }}>
            <Row>
                <img src={logo} alt="logo" height='23.83px' width='120px' className='my-5' style={{
                    margin: '0 auto',
                }} />

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
                User Name
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
                                <ButtonGroup key={index} buttons={[button]} />
                            )
                        })}
                    </div>
                )
            }
            )}

            <div className='d-flex py-4' style={{
                width: 'fit-content',
                margin: '0 auto',
            }}>
                {bottomNavItems.map((bottomNavItem, index) => {
                    return (
                        <div key={index} className='px-5'>
                            <img src={bottomNavItem} alt='button' />
                        </div>
                    )
                })}
            </div>

        </Container>
    );
}

export default UserProfile;