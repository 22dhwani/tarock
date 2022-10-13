import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';

const Share = () => {
    const { id } = useParams();
    return (
        <Row>
            <Col className='col-4'>
                <QRCode value={ window.location.href } size='64'/>
            </Col>
            <Col className='col-8'>
                Scan QR code to start: { id }
            </Col>
        </Row>
    );
}

export default Share;