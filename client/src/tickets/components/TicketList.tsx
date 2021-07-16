import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import dateService from "../../services/date-service";
import { Ticket } from "../../ticket-api-types";

const TicketListItem = styled(Link)`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  text-decoration: none;

  &:hover {
    background: #fbfbfb;
  }
`;

const ColumnStyles = styled.div`
  width: 100%;
  padding: 1rem;
`;

const TicketTitle = styled(ColumnStyles)`
  font-size: 1.125em;
`;
const CreatedDate = styled(ColumnStyles)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  text-align: right;

  span:last-child {
    font-size: 0.875em;
    color: #aaa;
  }
`;
const RequestedBy = styled(ColumnStyles)`
  width: 22%;
  text-align: right;
`;
const CommentCount = styled(ColumnStyles)`
  width: 22%;
`;

function TicketList(props: { tickets: Ticket[] }) {
  let { path } = useRouteMatch();

  return (
    <div>
      {props.tickets.map((t: Ticket) => (
        <TicketListItem key={t.id} to={`${path}/detail/${t.id}`}>
          <TicketTitle>{t.title}</TicketTitle>
          <CommentCount>{t.comments?.length}</CommentCount>
          <RequestedBy>{t.requesterId?.split(/\|/)[0]}</RequestedBy>
          <CreatedDate>
            <span>
              {t.createdDate
                ? dateService.ticketListDateDisplay(t.createdDate)
                : ""}
            </span>
            <span>
              {t.createdDate
                ? dateService.differenceInDaysDisplay(t.createdDate)
                : ""}
            </span>
          </CreatedDate>
        </TicketListItem>
      ))}
    </div>
  );
}

export default TicketList;
