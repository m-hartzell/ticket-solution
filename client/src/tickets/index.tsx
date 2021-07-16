import React from "react";
import { Link, Route } from "react-router-dom";
import TicketList from "./components/TicketList";
import TicketAdd from "./Add";
import TicketDetail from "./Detail";
import PageContainer from "../shared-components/PageContainer";
import PageHeader from "../shared-components/PageHeader";
import PageBody from "../shared-components/PageBody";
import PageNav from "../shared-components/PageNav";
import { useSelector } from "react-redux";
import { Ticket } from "../ticket-api-types";
import styled from "styled-components";

function Tickets() {
  const tickets = useSelector<{ tickets: Ticket[] }, Ticket[]>(
    (state) => state.tickets
  );
  return (
    <PageContainer>
      <PageHeader>
        <h1>Tickets</h1>
        <PageNav>
          <Link to="/tickets">List</Link>
          <Link to="/tickets/add">Add</Link>
        </PageNav>
      </PageHeader>
      <PageBodyTicket>
        <nav>
          <TicketList tickets={tickets} />
        </nav>
        <main>
          <Route path="/tickets/add" component={TicketAdd}></Route>
          <Route
            path="/tickets/detail/:id"
            render={() => <TicketDetail />}
          ></Route>
        </main>
      </PageBodyTicket>
    </PageContainer>
  );
}

export default Tickets;

const PageBodyTicket = styled(PageBody)`
  display: flex;
  flex-direction: row;
`;
