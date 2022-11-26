import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function DescriptiveView({ userInfo, cardData }) {
    const description = [
        'Superpower',
        'Strengths',
        'Weakness',
        'Blind Spot',
        'Ideal Environment'
    ]
    console.log(cardData)
    return (
        <>
            {userInfo}
            <div>
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
                                    {item}
                                    <div className='d-flex ' style={{
                                        minHeight: '1px',
                                        maxHeight: '1px',
                                        minWidth: '30%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.35)',
                                    }}></div>
                                </div>
                                <Row className='w-100 py-3 my-2 d-flex justify-content-center' style={{
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: '10px',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    color: '#49304D',
                                }} lg={3}>
                                    {
                                        cardData.description[item.toUpperCase().replaceAll(' ', '')].split(";")
                                            .map((strength, index) => {
                                                return (
                                                    <Col key={index}>
                                                        {strength.trim()}
                                                    </Col>
                                                );
                                            })
                                    }
                                </Row>
                            </div>
                        )
                    })
                }
                <span style={{
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