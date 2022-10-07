import buttonBack from '../../assets/buttonBack.svg';
import buttonOk from '../../assets/buttonOk.svg';
import logo from '../../assets/tarockLogo.svg'
import male from '../../assets/avatarMale.svg'
import female from '../../assets/avatarFemale.svg'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
function AvatarCreation(props) {

    return (
        <div>
            <div className="d-flex justify-content-between ">
                <img src={buttonBack} alt="buttonBack" onClick={props.handleBack} />
                <img src={logo} alt="logo" />
                <img src={buttonOk} alt="buttonOk" onClick={props.handleOk} />
            </div>

            <div className='mx-auto pb-5' style={{ width: 'fit-content' }}>
                <img src={props.gender ? male : female} alt="maleNoBg" height={220} />
            </div>

            <Row className="p-3 rounded-4 mx-auto px-4" style={{ backgroundColor: "white", width: 'fit-content' }}>
                <Col className='d-flex justify-content-center' onClick={() => props.setGender(data => {
                    return {
                        ...data,
                        gender: 1
                    }
                })}>
                    <img className='bg-warning rounded-4' src={male} alt="male" />
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
