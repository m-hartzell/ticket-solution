import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import "tinymce/skins/ui/oxide/skin.css";
import { Auth0Provider } from "@auth0/auth0-react";

import Home from "./home";
import Tickets from "./tickets";
import AppHeader from "./layout/AppHeader";
import Container from "./shared-components/Container";

const AppContainer = styled.div``;

const AppMain = styled(Container)`
  padding: 2rem 0;
`;

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ""}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ""}
      redirectUri={window.location.origin}
    >
      <AppContainer>
        <BrowserRouter>
          <AppHeader />
          <AppMain>
            <Route path="/tickets" component={Tickets}></Route>
            <Route path="/" exact={true} component={Home}></Route>
          </AppMain>
        </BrowserRouter>
      </AppContainer>
    </Auth0Provider>
  );
}

export default App;
