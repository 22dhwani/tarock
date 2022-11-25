function TypeView({ cardData, userInfo }) {
    return (
        <>
            {userInfo}

            <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
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
                    Personality Type
                    <div className='d-flex ' style={{
                        minHeight: '1px',
                        maxHeight: '1px',
                        minWidth: '30%',
                        backgroundColor: 'rgba(255, 255, 255, 0.35)',
                    }}></div>
                </div>
                <div
                    className="py-2 my-2"
                    style={{
                        background: 'rgba(66, 145, 202, 0.37)',
                        width: '90%',
                    }}>
                    <h1 style={{
                        fontWeight: '800',
                        fontSize: '37px',
                        lineHeight: '42px',
                    }}>
                        {cardData.personality_code}
                    </h1>
                    <h2 style={{
                        fontWeight: '600',
                        fontSize: '18px',
                        lineHeight: '20px',
                    }}>
                        {cardData.personality_category}
                    </h2>
                    {/* description here */}
                </div>
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

export default TypeView
