import Container from 'react-bootstrap/Container';
import Header from '../common/Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GenCard from '../TarockCards/GenCard';
import Footer from '../common/Footer';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context';
import add from '../../assets/add.svg';
import './card.css';

const CardsScreen = () => {
    const { userData } = useContext(GlobalContext);
    const navigate = useNavigate();
    function onMyCardClick(){
        navigate('/myCard');
    }
    function onMatchCardClick(){
        navigate('/matchCard');
    }

    return (
        <Container className='d-flex flex-column vh-100' style={{ backgroundColor: '#FAE8E7' }}>
            <Header />
            <div className='mx-auto' style={{
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: '24px',
                lineHeight: '28px',
                color: '#49304D'
            }}>
                Tarock Cards
            </div>
            <Container className='flex-grow-1 overflow-auto '>
                {/* map over data when API updates */}
                <Row lg={2} className='my-3'>
                    <Col  style={{ cursor: 'pointer' }} onClick={onMyCardClick} className='justify-content-center d-flex'>
                        <GenCard 
                        //quadra={userData.personality_socionic_quadra}
                        quadra='Alpha'
                        avatar_index={userData.avatarIndex} />
                    </Col>
                    <Col style={{ cursor: 'pointer' }} onClick={onMatchCardClick} className='justify-content-center d-flex'>
                        <GenCard cardType='match' />
                    </Col>
                </Row>
                {/* add card button */}
                <Row lg={2} className='my-3 '>
                    <Col className='justify-content-center d-flex flex-column align-items-center'>
                    <div className='button1' style={{
                        borderRadius: '10px',
                        width: '9rem',
                        height: '14.375rem',
                        border: '1px dashed  #49304D',
                        display: 'flex',
                    }}>
                        <img src={add} alt='add' className='m-auto'/>
                    </div>
                        <div className='col-12 d-flex justify-content-center mt-2' style={{
                            fontFamily: 'Montserrat',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            fontSize: '14px',
                            lineHeight: '14px',
                            color: '#49304D',
                        }}>
                            Add a new card
                        </div>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                
            </Container>
            <Footer isCardsActive={true} />
        </Container>
    );
}

export default CardsScreen;