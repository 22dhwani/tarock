import React, { useState, useEffect, useContext } from "react";
import Question from '../Question/Question';
import './Assessment.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Header from '../common/Header';
import btn1 from '../../assets/btn_1.svg';
import btn2 from '../../assets/btn_2.svg';
import RadarChart from "../Charts/RadarChart";
import { GlobalContext } from '../../context';
import { useNavigate } from "react-router-dom";
import buttonBack from '../../assets/buttonBack.svg';

const randomRadarData = () => {
    return {
        LOGIC: Math.random(),
        EMOTION: Math.random(),
        STRUCTURE: Math.random(),
        OPENNESS: Math.random(),
        EXTRAVERSION: Math.random(),
        INTROVERSION: Math.random(),
        EXECUTION: Math.random(),
        STRATEGY: Math.random()
    };
}

const Assessment = ({ assessmentGroupId }) => {
    const [assessment, setAssessment] = useState({ index: 0, data: [] });
    const [answers, setAnswers] = useState([]);
    const { userId, userData } = useContext(GlobalContext);
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
            fetch('http://35.184.195.100:3000/api/result', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    assessmentGroupId: assessmentGroupId,
                    answers: answers,
                    duration: 60 // TODO(Zane): calculate duration
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (userData.type != 'REAL') {
                        navigate("/signin");
                    } else {
                        navigate("/myCard");
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        setAssessment({ index: (assessment.index + 1) % assessment.data.length, data: assessment.data });
    };

    const goBack = () => {
        if (assessment.index == 0) {
            navigate('/home');
        } else {
            setAssessment({
                index: assessment.index - 1,
                data: assessment.data
            });
        }
    }

    return (
        <Container className='d-flex flex-column min-vh-100' style={{
            backgroundColor: '#FBF2DC',
            height: 'fit-content',
            background: 'linear-gradient(180deg, #BCE4E5 0%, rgba(188, 228, 229, 0.6) 100%)'
        }}>

            <Header goBackFunc={goBack}/>
            <Row className='mx-auto'>
                <div style={{ height: '200px', width: '200px' }}>
                    <RadarChart apiResponse={randomRadarData()} enableLabels={false}/>
                </div>
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