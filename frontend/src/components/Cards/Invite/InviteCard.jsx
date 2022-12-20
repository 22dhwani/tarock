import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import QRCode from "react-qr-code";
import logo from '../../../assets/logoSplash.svg';

const InviteCard = () => {
  return (
    <div
      className="rounded-5 card-noise-invite"
      style={{
        backgroundColor: "#EC6348",
        color: "white",
        height: '80vh',
        overflow: 'hidden',
        textAlign: 'center',
        overflowY: 'auto',
      }}
    >
      <div
        className="d-flex flex-column justify-content-between text-start h-100"
      >
        <h1
          className="text-left"
          style={{
            fontWeight: '700',
            textAlign: 'left',
            padding: '5rem 0 0 3rem'
          }}
        >
          Personality<br />
          <span style={{ color: '#FFC0B3' }}>In a Card.</span><br />
          Unwrap yours!
        </h1>
        <Row className='m-sm-5 m-3 my-4 mt-0'>
          <Col className='col-4 d-flex justify-content-center align-self-center'>
            <div className="bg-white p-1 rounded-2">
              <QRCode value={window.location.href} size={64} />
            </div>
          </Col>
          <Col className='col-8' style={{
            wordBreak: 'break-all',
            fontFamily: 'Montserrat',
            color: '#FFFFFF',
          }}>
            <img
              src={logo}
              alt="logo"
              height='24px'
              className="mb-1"
            />
            <p className="m-0" style={{ fontWeight: '600'}}>
              Scan QR code to start, <br />Or visit: tarockapp.com
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default InviteCard;