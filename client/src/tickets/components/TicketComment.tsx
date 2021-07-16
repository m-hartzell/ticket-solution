import styled from "styled-components";
import dateService from "../../services/date-service";

enum TicketCommentTypes {
  Comment,
  Info,
  Warning,
}

interface TicketCommentProps {
  comment: string;
  author?: string;
  dateCreated?: string;
  type?: TicketCommentTypes;
}

function TicketComment({
  comment,
  author,
  dateCreated,
  type = TicketCommentTypes.Comment,
}: TicketCommentProps) {
  console.log(dateCreated);
  return (
    <StyledTicketComment type={type}>
      <article dangerouslySetInnerHTML={{ __html: comment }} />
      <Footer>
        <div>{author ?? ""}</div>
        <div>
          {dateCreated ? dateService.ticketCommentDateDisplay(dateCreated) : ""}
        </div>
      </Footer>
    </StyledTicketComment>
  );
}

const StyledTicketComment = styled.div<{ type: TicketCommentTypes }>`
  border-left: 2px solid #d5d5d5;
  border-bottom: 1px solid #e5e5e5;
  padding: 3rem;
  border-color: ${({ type }) => {
    let color = "#d5d5d5";
    switch (type) {
      case TicketCommentTypes.Info:
        color = "#ccc";
        break;
    }
    return color;
  }};

  footer {
    color: #888;
    margin-top: 0.5rem;
    font-size: 12px;
  }
`;

const Footer = styled.footer`
  display: flex;
`;

export default TicketComment;
