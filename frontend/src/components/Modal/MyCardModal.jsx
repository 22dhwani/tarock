import MyCard from "../Cards/MyCard";
import Popup from "../PopUp/PopUp"
import linkC from '../../assets/buttons/linkC.svg';
import linkNC from '../../assets/buttons/linkNC.svg';
import { useContext, useState } from "react";
import imgButton from '../../assets/buttons/image.svg';
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";

const MyCardModal = ({
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
				<MyCard />
				{shareCardOption && <div className='share'></div>}
					<button
						onClick={() => setShareCardOption(true)}
						style={{
							border: 'none',
							backgroundColor: '#FFD874',
							borderRadius: '50px',
							paddingTop: '10px',
							paddingBottom: '10px',
							fontWeight: '700',
							width: '60%',
							marginLeft: 'auto',
							marginRight: 'auto',
							marginTop: '33px',
							color: '#49304D',
							fontSize: '16px',
							lineHeight: '14px',
							letterSpacing: '0em',
						}}>
						Share
					</button>
			</Popup>
			<Popup show={shareCardOption} setShow={setShareCardOption} isNotification={true} >
				<div className='d-flex gap-5 mx-auto' style={{
					marginTop: '60vh',
				}}>
					<img src={linkButton} alt='link' style={{
						cursor: 'pointer'
					}} onClick={() => {
						setLinkButton(linkC);
						setTimeout(() => setLinkButton(linkNC), 1000);
						navigator.clipboard.writeText(`${window.location.origin}/share/${userData.id}`);
					}} />
					<img src={imgButton} alt='image' style={{
						cursor: 'pointer'
					}} onClick={() => {
						navigate(`/share/${userData.id}`, { state: { qr: true } })
					}} />
				</div>
			</Popup>
		</>
	);

}

export default MyCardModal