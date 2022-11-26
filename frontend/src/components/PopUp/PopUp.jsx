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
      {!props.isNotification && <Modal.Header closeButton />}
      {props.children}
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