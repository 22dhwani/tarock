import Popup from '../../components/PopUp/PopUp';

const AppleURL = "https://apps.apple.com/us/app/tarock-science-of-you/id1659790989";
const AndroidURL = "https://play.google.com/store/apps/details?id=com.tarock.app";

const ComingSoonModal = ({
  openModal,
  setOpenModal,
}) => {
  return (
    <Popup show={openModal} setShow={setOpenModal}>
      <div className='text-center rounded-3 py-5' style={{ backgroundColor: 'white' }}>
        <h1 style={{
          fontWeight: '700',
          fontSize: '22px',
        }}>
          Make the most of our<br />app for an unbeatable<br />experience!
        </h1>
        <img src="/assets/app/app_preview.png" alt="" width="90%" />
        <a href={AppleURL} className='d-block mt-3' target="_blank">
          <img src="/assets/app/badge_apple.png" alt="" height="60px" />
        </a>
        <a href={AndroidURL} className='d-block mt-3' target="_blank">
          <img src="/assets/app/badge_android.png" alt="" height="60px" />
        </a>
      </div>
    </Popup>
  )
}

export default ComingSoonModal