import Container from "react-bootstrap/Container";
import InviteCard from "../components/Cards/Invite/InviteCard"

const InvitePage = () => {
  return (
    <Container>
      <div className="min-vh-100 d-flex flex-column justify-content-center">
        <InviteCard />
      </div>
    </Container>
  )
}

export default InvitePage