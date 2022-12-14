import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

function DescriptiveView({ userInfo, cardData }) {
    const description = [
        {
            title: 'Superpower',
            bg: '#FFFFFF',
        },
        {
            title: 'Strengths',
            bg: '#EAF0F7',
        },
        {
            title: 'Weakness',
            bg: '#D5DFEE',
        },
        {
            title: 'Blind Spot',
            bg: '#BFCFE6',
        },
        {
            title: 'Ideal Environment',
            bg: '#ABC0DF',
        }
    ]
    const navigate = useNavigate();
    return (
        <>
            {userInfo}
            <div style={{
                overflow: 'auto',
                padding:'10px'
            }}>
                {
                    description.map((item, index) => {
                        return (
                            <div key={index} className='w-100 d-flex flex-column justify-content-center align-items-center'>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                }}>
                                    <div className='d-flex ' style={{
                                        minHeight: '1px',
                                        maxHeight: '1px',
                                        minWidth: '30%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.35)',
                                    }}></div>
                                    <span style={{
                                        fontSize: '12px',
                                        fontWeight: '400',
                                        letterSpacing: '0em',
                                        textAlign: 'center',
                                    }}>
                                        {item.title}
                                    </span>
                                    <div className='d-flex ' style={{
                                        minHeight: '1px',
                                        maxHeight: '1px',
                                        minWidth: '30%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.35)',
                                    }}></div>
                                </div>
                                <Row className='w-100 py-3 my-2 d-flex justify-content-center' style={{
                                    backgroundColor: item.bg,
                                    borderRadius: '10px',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    color: '#49304D',
                                }} lg={3}>
                                    {
                                        cardData.description[item.title.toUpperCase().replaceAll(' ', '')].split(";")
                                            .map((strength, index) => {
                                                return (
                                                    <Col key={index}>
                                                        <span style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        letterSpacing: '0em',
                                        textAlign: 'left',
                                    }}>
                                                        {strength.trim()}
                                                        </span>
                                                    </Col>
                                                );
                                            })
                                    }
                                </Row>
                            </div>
                        )
                    })
                }
                <span onClick={() => {navigate('/test')}} style={{
                textDecoration: 'underline',
                cursor: 'pointer',
                color: '#CAE8E2',
                fontSize: '12px',
                fontWeight: '600',
            }}>
                Not even close?
            </span>
            </div>
        </>
    )
}

export default DescriptiveView;