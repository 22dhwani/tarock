import DescriptiveView from "./DescriptiveView";
import TypeView from "./TypeView";
import RadarView from "./RadarView";


export const cardPages = [
    <RadarView cardData={cardData} userInfo={userInfo} />,
    <DescriptiveView cardData={cardData} userInfo={userInfo} />,
    <TypeView cardData={cardData} userInfo={userInfo} />
]