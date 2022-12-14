
function TabSwitch(props) {
    return (
        <div className='d-flex justify-content-center gap-3'>
            <button
                onClick={() => props.setTab(true)}
                className='rounded-5 mx-3 my-2 px-3 py-2' style={{
                    backgroundColor: props.tab ? '#49304D' : 'transparent',
                    color: props.tab ? 'white' : '#49304D',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '0.875rem',
                    lineHeight: '0.875rem',
                }}>
                My Cards
            </button>

            <button
                onClick={() => props.setTab(false)}
                className='rounded-5 mx-3 my-2 px-3 py-2' style={{
                    backgroundColor: !props.tab ? '#49304D' : 'transparent',
                    color: !props.tab ? 'white' : '#49304D',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '0.875rem',
                    lineHeight: '0.875rem',
                }}>
                Match Cards
            </button>
        </div>
    )
}

export default TabSwitch;