import React, { useState, useEffect, useContext } from "react";
import Question from '../Question/Question';
import './Assessment.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import logo from '../../assets/tarockLogo.svg';
import btn1 from '../../assets/btn_1.svg';
import btn2 from '../../assets/btn_2.svg';
import sampleRadar from '../../assets/sampleRadar.svg';
import { GlobalContext } from '../../context';
import { useNavigate } from "react-router-dom";

const Assessment = ({ assessmentGroupId }) => {
    const [assessment, setAssessment] = useState({ index: 0, data: [] });
    const [answers, setAnswers] = useState([]);
    const { userID } = useContext(GlobalContext);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://35.184.195.100:3000/api/assessment?groupId=${assessmentGroupId}`)
            .then((response) => response.json())
            .then((data) => {
                setAssessment({ index: 0, data: data });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    function onBtnClick(index) {
        const content = assessment.data[assessment.index].content;
        const jsonObj = JSON.parse(content);
        const type = jsonObj.answers[index].type;
        answers.push(type);
        if (assessment.index == assessment.data.length - 1) {
            console.log(answers);
            fetch('http://35.184.195.100:3000/api/result', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userID,
                    assessmentGroupId: assessmentGroupId,
                    answers: answers,
                    duration: 60 // Hard code
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    //set type later on
                    fetch('http://35.184.195.100:3000/api/card/EII')
                        .then(response => response.json())
                        .then(data => {
                            navigate("/myCard", { state: { card: data.dimensional_values } });
                        });
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        setAssessment({ index: (assessment.index + 1) % assessment.data.length, data: assessment.data });
    };

    return (
        <Container className='d-flex flex-column min-vh-100' style={{
            backgroundColor: '#FBF2DC',
            height: 'fit-content',
            background: 'linear-gradient(180deg, #BCE4E5 0%, rgba(188, 228, 229, 0.6) 100%)'
        }}>

            <Row>
                <img src={logo} alt="logo" height='23.83px' width='120px' className='my-5 mx-auto' />
            </Row>
            <Row className='mx-auto'>
                <img src={sampleRadar} atl="radar" />
            </Row>
            <div className="card-container w-75 mx-auto overflow-auto">
                <div className="card">
                    {
                        assessment.index < assessment.data.length && <Question data={assessment.data[assessment.index].content} />
                    }
                </div>
            </div>
            <Row className="w-75 mx-auto">
                <Col className="col-6 d-flex justify-content-center">
                    <img src={btn1} alt="btn1" onClick={(e) => { onBtnClick(0) }} />
                </Col>
                <Col className="col-6 d-flex justify-content-center">
                    <img src={btn2} alt="btn2" onClick={(e) => { onBtnClick(1) }} />
                </Col>
            </Row>
        </Container>
    );
};

export default Assessment;
{/* <div className="assessment-container">
            <div className="assessment-pattern"></div>
            <div className="header"></div>
            <div className="radar"></div>
            <div className="card-container">
                <div className="card">
                    {
                        assessment.index < assessment.data.length && <Question data={assessment.data[assessment.index].content}/>
                    }
                </div>
            </div>
            <div className="button-container" onClick={onBtnClick}>
                <Answer onClick={onBtnClick} count={3}/>
            </div>
        </div> */}