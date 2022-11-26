import Modal from 'react-bootstrap/Modal';
import './PopUp.css'
function CenteredModal(props) {
  return (
    <Modal
      size="lg"
      centered
      style={{ padding: '10px' }}
      show={props.show}
      onHide={props.onHide}
    >
      {props.children && <Modal.Header closeButton />}
      {props.children && props.children}

      {
        props.isNotification &&
        <Modal.Body className='text-center' style={{ color: '#49304D' }}>
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
            We are working hard to develop this feature. Stay tuned!
          </p>
          <button
            onClick={props.onHide}
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

        </Modal.Body>
      }
      {
        !props.isNotification &&
        <button style={{
          border: 'none',
          backgroundColor: '#FFD874',
          borderRadius: '50px',
          paddingTop: '10px',
          paddingBottom: '10px',
          fontWeight: '900',
          width: '50%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '15px',
        }}>
          Share
        </button>
      }
    </Modal>
  );
}

function Popup(props) {
  return (
    <>
      <CenteredModal
        show={props.show}
        onHide={() => props.setShow(false)}
        children={props.children}
        isNotification={props.isNotification}
        isCard={props.isCard}
      />
    </>
  );
}

export default Popup;