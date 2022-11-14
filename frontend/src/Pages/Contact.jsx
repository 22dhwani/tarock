import InfoContainer from "../components/common/InfoContainer";
import {contact} from '../contentData/contact'

function Contact(){
    return(
        <div className="d-flex flex-column align-items-center">
            <InfoContainer
                title={contact.title}
                subtitle={contact.subtitle}
                mainText={contact.mainText}
            />
        </div>
    )
}

export default Contact;