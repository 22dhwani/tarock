import MyCard from "../Cards/MyCard";
import Popup from "../PopUp/PopUp"
import linkC from '../../assets/buttons/linkC.svg';
import linkNC from '../../assets/buttons/linkNC.svg';
import { useContext, useState, useEffect } from "react";
import imgButton from '../../assets/buttons/image.svg';
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
const MyCardModal = ({
	openModal,
	setOpenModal,
}) => {
	const { userData } = useContext(GlobalContext);
	const navigate = useNavigate()

	const [shareCardOption, setShareCardOption] = useState(false);
	const [linkButton, setLinkButton] = useState(linkNC);
	const [showTip, setShowTip] = useState(false);
    const [tipDetails, setTipDetails] = useState({
        title: '',
        content: ''
    });
    useEffect(() => {
        if (shareCardOption) {
            //opens when share button clicked
            setTipDetails(
                prev => ({
                    ...prev,
                    title: 'Share to Match',
                    content: 'Share your Tarock card and Match with your friends!'
                })
            )
            setShowTip(true);
            setTimeout(() => {
               setShowTip(false);
            }, 3000);
        }
    }, [shareCardOption]);
	return (
		<>
		 <Notification openModal={showTip} setOpenModal={setShowTip} title={tipDetails.title} desc={tipDetails.content} />
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
						Share & Match
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
						setTipDetails(
							prev => ({
								...prev,
								title: 'Link Copied!',
								content: 'Easily share and compare your Match Card with your friends.'
							})
						)
						setShowTip(true);
						setTimeout(() => {
							setLinkButton(linkNC);
							setShowTip(false)
						}, 1500);
						
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