import InfoContainer from "../components/common/InfoContainer";
import {about} from '../contentData/about'

function About(){
    return(
        <div className="d-flex flex-column align-items-center">
            <InfoContainer
                title={about.title}
                subtitle={about.subtitle}
                mainText={about.mainText}
            />
        </div>
    )
}

export default About;