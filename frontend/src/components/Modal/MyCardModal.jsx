import MyCard from "../Cards/MyCard";
import Popup from "../PopUp/PopUp"


const MyCardModal = ({
  openModal,
  setOpenModal,
}) => {
  return (
    <Popup show={openModal} setShow={setOpenModal} isCard={true}>
      <MyCard />
    </Popup>
  );

}

export default MyCardModal