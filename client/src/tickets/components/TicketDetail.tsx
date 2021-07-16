import styled from "styled-components";
import { Ticket, TicketComment } from "../../ticket-api-types";
import { Card, CardBody } from "../../shared-components/Card";
import TicketCommentDetail from "./../components/TicketComment";
import dateService from "../../services/date-service";

interface TicketDetailProps {
  ticket: Ticket;
  comments?: TicketComment[];
}

function TicketDetail({ ticket, comments }: TicketDetailProps) {
  return (
    <StyledTicketDetail>
      <TicketDetailHeader>
        <TicketTitle>{ticket.title ?? ""}</TicketTitle>
        <TicketMeta>
          <TicketRequester>
            <label>Requested by:</label>{" "}
            <input type="text" readOnly value={ticket.requesterId ?? ""} />
          </TicketRequester>
          <TicketDate input={ticket.createdDate ?? ""}></TicketDate>
        </TicketMeta>
      </TicketDetailHeader>
      <TicketDetailBody>
        <Card borderTop={true}>
          <CardBody padding="2rem 3rem">
            <span
              dangerouslySetInnerHTML={{ __html: ticket.body ?? "" }}
            ></span>
          </CardBody>
        </Card>
        {comments &&
          comments.map((c) => (
            <TicketCommentDetail
              key={c.id}
              comment={c.comment || ""}
              dateCreated={c.createdDate}
            />
          ))}
      </TicketDetailBody>
    </StyledTicketDetail>
  );
}

interface TicketDateProps {
  input: string;
}
const TicketDate = (props: TicketDateProps) => {
  let dateDisplay = null;
  let timeDisplay = null;
  let daysOldDisplay = null;

  if (props.input) {
    dateDisplay = dateService.ticketDateDisplay(props.input);
    timeDisplay = dateService.ticketTimeDisplay(props.input);
    daysOldDisplay = dateService.differenceInDaysDisplay(props.input);
  }

  return (
    <StyledTicketDate>
      <div>{dateDisplay ?? ""}</div>
      <div style={{ fontSize: 12 }}>{timeDisplay ?? ""}</div>
      <span>{daysOldDisplay}</span>
    </StyledTicketDate>
  );
};

const TicketDetailHeader = styled.header`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const TicketDetailBody = styled.div`
  margin: 2rem 0;

  ${CardBody} {
    font-size: 1.125em;
    line-height: 1.4;
  }
`;

const StyledTicketDetail = styled.section``;

const TicketTitle = styled.section`
  display: flex;
  justify-content: space-between;
  font-size: 1.65rem;
  font-weight: 500;
`;

const TicketMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledTicketDate = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
`;

const TicketRequester = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  gap: 0.5rem;

  input {
    padding: 0.25rem;
    background: #eee;
    border: 0;
  }
`;

export default TicketDetail;
