import Modal from 'react-bootstrap/Modal';
import './PopUp.css'

function CenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header closeButton />
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
      </Modal.Body>
    </Modal>
  );
}

function Popup(props) {
  return (
    <>
      <CenteredModal
        show={props.show}
        onHide={() => props.setShow(false)}
      />
    </>
  );
}

export default Popup;