import RadarChart from "../../Charts/RadarChart";

function RadarView({ cardData, userInfo }) {
    return (
        <>
            {userInfo}
            {/* Description */}
            <div className='px-2'
                style={{
                    fontWeight: '700',
                    fontSize: '18px',
                    lineHeight: '22px',
                }}>
                {cardData.description.STRENGTHS.replaceAll(';', ',')}.
            </div>
            {/* Radar Chart */}
            <div className="my-5" style={{
                height: '270px'
            }}>
                <RadarChart userData={cardData.dimensional_values} enableLabels={true} />
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
        </>
    )
}

export default RadarView;
