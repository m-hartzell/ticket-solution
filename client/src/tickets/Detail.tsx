import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import api from "../api";
import { Ticket } from "../ticket-api-types";
import TicketDetail from "./components/TicketDetail";

interface DetailProps extends RouteComponentProps<{ id: string }> {}

function Detail(props: DetailProps) {
  const [ticket, setTicket] = useState<Ticket>({});
  const [comments, setComments] = useState<{}[]>([{}]);
  const id = props.match.params.id;

  useEffect(() => {
    api.tickets.getTicketById(id).then((ticket) => {
      setTicket(ticket);
      setComments(ticket.comments || []);
    });
  }, [id]);

  return (
    <div>
      <TicketDetail ticket={ticket} comments={comments} />
    </div>
  );
}

export default withRouter(Detail);
