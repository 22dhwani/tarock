import Container from "react-bootstrap/Container";
import { getAvatar } from "../../../utils/userUtil";
import RadarView from "./RadarView";
import Swipper from "../../Swipper/Swipper";
import DescriptiveView from "./DescriptiveView";
import TypeView from "./TypeView";

const cardColors = {
    blue: {bg: "#3069B3", textColor: "white"},
    yellow: {bg: "#EBBD45", textColor: "#49304D"},
    teal: {bg: "#5FC2B9", textColor: "#49304D"},
    purple: {bg: "#BB6BD9", textColor: "white"},
}

function TarockCard({ user, cardData }) {
    const userInfo = <>
        {/* Avatar */}
        <div className='d-flex justify-content-center'>
            <img className='rounded-circle mx-auto' src={getAvatar(user.avatar_index)} alt="avatar" style={{ backgroundColor: '#FFFFFF' }} width='60px' height='60px' />
        </div>
        {/* User Name */}
        <div
            className="pt-3 pb-1"
            style={{
                fontWeight: '400',
                fontSize: '18px',
            }}>
            {user.name}
        </div>
    </>

    const cardPages = [
        <RadarView cardData={cardData} userInfo={userInfo} />,
        <DescriptiveView cardData={cardData} userInfo={userInfo} />,
        <TypeView cardData={cardData} userInfo={userInfo} />
    ]

    const styledCardPages = cardPages.map((item, index) => {
        const color = cardColors[cardData.color]
        return (
            <Container
                key={index}
                className='d-flex flex-column py-4 rounded-5' style={{
                    backgroundColor: color.bg,
                    color: color.textColor,
                    height: '80vh',
                    overflow:'hidden',
                    textAlign: 'center',
                    overflowY: 'auto',
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
