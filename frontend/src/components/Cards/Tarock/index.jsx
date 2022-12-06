import Container from "react-bootstrap/Container";
import { getAvatar } from "../../../utils/userUtil";
import RadarView from "./RadarView";
import Swipper from "../../Swipper/Swipper";
import DescriptiveView from "./DescriptiveView";
import TypeView from "./TypeView";

function TarockCard({ user, cardData }) {
    const userInfo = <>
        {/* Avatar */}
        <div className='d-flex justify-content-center'>
            <img className='rounded-circle mx-auto' src={getAvatar(user.avatar_index)} alt="avatar" style={{ backgroundColor: '#FFFFFF' }} />
        </div>
        {/* User Name */}
        <div
            className="py-3"
            style={{
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '28px'
            }}>
            {user.name} is
        </div>
    </>

    const cardPages = [
        <RadarView cardData={cardData} userInfo={userInfo} />,
        <DescriptiveView cardData={cardData} userInfo={userInfo} />,
        <TypeView cardData={cardData} userInfo={userInfo} />
    ]

    const styledCardPages = cardPages.map((item, index) => {
        return (
            <Container
                key={index}
                className='d-flex flex-column py-4 rounded-5' style={{
                    backgroundColor: '#2c60b0',
                    height: '80vh',
                    color: 'white',
                    overflow:'hidden',
                    textAlign: 'center',
                }}>
                {item}
            </Container>
        )
    })

    return (
        <Swipper data={styledCardPages} />
    )
}

export default TarockCard;
