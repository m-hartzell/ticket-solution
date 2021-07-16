import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Container from "../shared-components/Container";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

function AppHeader() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <Header>
      <AppHeaderTitle>Tickets Solution</AppHeaderTitle>
      <AppHeaderNav>
        <Link to="/">Home</Link>
        <Link to="/tickets">Tickets</Link>
      </AppHeaderNav>
      <AppHeaderAuth>
        <UserName>{user?.name}</UserName>
        {!isAuthenticated && <LoginButton></LoginButton>}
        {isAuthenticated && <LogoutButton></LogoutButton>}
        {isAuthenticated && (
          <Avatar>
            <img
              src={user?.picture}
              alt="User profile pic"
              width={40}
              height={40}
            />
          </Avatar>
        )}
      </AppHeaderAuth>
    </Header>
  );
}

export default AppHeader;

const Header = styled(Container)`
  display: flex;
  align-items: center;
  /* padding: 0 5vw; */

  @media (min-width: 72rem) {
    /* padding: 0 15vw; */
  }
`;

const AppHeaderTitle = styled.div`
  margin: 0 3rem 0 0;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #bbb;
`;

const AppHeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AppHeaderAuth = styled.nav`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const UserName = styled.div`
  margin-right: 1rem;
`;

const Avatar = styled.div`
  margin-left: 1rem;
`;
