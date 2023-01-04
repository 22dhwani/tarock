import Popup from '../../components/PopUp/PopUp';

const Notification = ({
  openModal,
  setOpenModal,
    title,
    desc,
}) => {
  return (
    <Popup show={openModal} setShow={setOpenModal} isNotification={true}>
      <div className='text-center rounded-3 py-3 mx-4 px-5' style={{ backgroundColor: 'white', color: '#49304D' }}>
        <h1 style={{
          fontWeight: '700',
          fontSize: '22px',
          lineHeight: '36px',
        }}>
          {title}
        </h1>
        <p style={{
          fontWeight: '500',
          fontSize: '16px',
          lineHeight: '19.5px',
        }}>
          {desc}
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

export default Notification