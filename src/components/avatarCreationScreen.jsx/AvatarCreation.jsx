import buttonBack from '../../assets/buttonBack.svg';
import buttonOk from '../../assets/buttonOk.svg';
import logo from '../../assets/tarockLogo.svg'
import male from '../../assets/avatarMale.svg'
import female from '../../assets/avatarFemale.svg'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AvatarCreation(props) {

    return (
        <div className="min-vh-100 " >
            <div className="d-flex justify-content-around ">
                <img className='px-3' src={buttonBack} alt="buttonBack" onClick={props.handleBack} />
                <img className='px-5' src={logo} alt="logo" />
                <img className='px-3' src={buttonOk} alt="buttonOk" onClick={props.handleOk} style={{cursor:'pointer'}}/>
            </div>

            <div className='mx-auto pb-5' style={{ width: 'fit-content' }}>
                <img src={props.gender ? male : female} alt="maleNoBg" height={220} />
            </div>

            <Row className="rounded-4 mx-auto py-3" style={{ backgroundColor: "white",width:'fit-content'}}>
                <Col className='d-flex justify-content-center' onClick={() => props.setGender(data => {
                    return {
                        ...data,
                        gender: 1
                    }
                })}>
                    <img className='rounded-4' src={male} alt="male" style={{ backgroundColor: '#D9D9D9' }} />
                </Col>
                <Col className='d-flex justify-content-center' onClick={() => props.setGender(data => {
                    return {
                        ...data,
                        gender: 0
                    }
                })}>
                    <img className='rounded-4' src={female} alt="female" style={{ backgroundColor: '#D9D9D9' }} />
                </Col>
            </Row>
        </div >
    )
}

export default AvatarCreation;
