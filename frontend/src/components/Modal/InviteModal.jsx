import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import imgButton from '../../assets/buttons/image.svg';
import linkC from '../../assets/buttons/linkC.svg';
import linkNC from '../../assets/buttons/linkNC.svg';
import { GlobalContext } from "../../context";
import InviteCard from "../Cards/Invite/InviteCard";
import Popup from "../PopUp/PopUp";

const InviteModal = ({
	openModal,
	setOpenModal,
}) => {
	const { userData } = useContext(GlobalContext);
	const navigate = useNavigate()

	const [shareCardOption, setShareCardOption] = useState(false);
	const [linkButton, setLinkButton] = useState(linkNC);

	return (
		<>
			<Popup show={openModal} setShow={setOpenModal} isCard={true}>
        <InviteCard />
				{shareCardOption && <div className='share'></div>}
        <button
          onClick={() => setShareCardOption(true)}
          style={{
            border: 'none',
            backgroundColor: '#EC6348',
            borderRadius: '50px',
            padding: '16px 0',
            fontWeight: '700',
            width: '94%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '33px',
            color: 'white',
            fontSize: '16px',
            lineHeight: '14px',
            letterSpacing: '0em',
          }}>
          Share
        </button>
			</Popup>
			<Popup show={shareCardOption} setShow={setShareCardOption}>
				<div className='d-flex gap-5 mx-auto' style={{
					marginTop: '60vh',
				}}>
					<img src={linkButton} alt='link' style={{
						cursor: 'pointer'
					}} onClick={() => {
						setLinkButton(linkC);
						setTimeout(() => setLinkButton(linkNC), 1000);
						navigator.clipboard.writeText(`${window.location.origin}/invite`);
					}} />
					<img src={imgButton} alt='image' style={{
						cursor: 'pointer'
					}} onClick={() => {
						navigate(`/invite`)
					}} />
				</div>
			</Popup>
		</>
	);

}

export default InviteModal