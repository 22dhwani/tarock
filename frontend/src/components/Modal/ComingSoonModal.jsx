import Popup from '../../components/PopUp/PopUp';

const ComingSoonModal = ({
  openModal,
  setOpenModal,
}) => {
  return (
    <Popup show={openModal} setShow={setOpenModal} isNotification={true}>
      <div className='text-center rounded-3 py-3' style={{ backgroundColor: 'white', color: '#49304D' }}>
        <h1 style={{
          fontWeight: '700',
          fontSize: '22px',
          lineHeight: '36px',
        }}>
          Coming Soon
        </h1>
        <p style={{
          fontWeight: '500',
          fontSize: '16px',
          lineHeight: '19.5px',
        }}>
          We are working hard to develop this feature. <br></br><b>Stay tuned!</b>
        </p>
        <button
          onClick={() => setOpenModal(false)}
          style={{
            border: 'none',
            backgroundColor: '#49304D',
            color: '#FFFFFF',
            borderRadius: '50px',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            fontWeight: '700',
          }}>
          Got it
        </button>
      </div>
    </Popup>
  )
}

export default ComingSoonModal