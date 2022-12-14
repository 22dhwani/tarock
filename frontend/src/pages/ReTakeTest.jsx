import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";

const ReTakeTestPage = () => {
	const navigate = useNavigate();
	function goBack() {
		navigate(-1);
	}
	return (
		<div
			className='min-vh-100 d-flex flex-column'
			style={{
				background: 'linear-gradient(180deg, #BCE4E5 0%, rgba(188, 228, 229, 0.6) 100%)',
				overflow: 'hidden',
				overflowY: 'auto'
			}}
		>
			<Header goBackFunc={goBack} />
			<div className='px-5 d-flex flex-column align-items-stretch justify-content-between' style={{ flexGrow: '1' }}>
				<div className="pt-5">
					<h1
						className="mb-4"
						style={{
							fontWeight: '700',
							fontSize: '26px',
							lineHeight: '30px',
						}}
					>
						No problem, let's see how we can improve it
					</h1>
					<p
						style={{
							fontWeight: '500',
							fontSize: '16px',
							lineHeight: '19.5px'
						}}
					>
						If you’ve made it to this page, there’s a good chance your peers have determined your personality type isn't exactly right. No worries, let’s give this another go!
					</p>
				</div>
				<div className="pb-5 mb-5">
					<button
						className='py-3 rounded-5 border-0 w-100'
						onClick={() => navigate('/test')}
						style={{
							fontWeight: '700',
							fontSize: '16px',
							backgroundColor: '#49304D',
							color: '#FFFFFF',
						}}
					>
						Test Again
					</button>
					<button
						className='py-3 mt-4 rounded-5 border-0 w-100'
						// onClick={() => {}}
						style={{
							fontWeight: '700',
							fontSize: '16px',
							backgroundColor: '#49304D',
							color: '#FFFFFF',
						}}
					>
						Contact Us
					</button>
				</div>
			</div>
		</div>
	)
}

export default ReTakeTestPage