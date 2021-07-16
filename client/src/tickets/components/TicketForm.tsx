import { SubmitBtn, UnderlineInput } from "../../shared-components/Form";
import TinyMceEditor from "../../shared-components/TinyMceEditor";

function TicketForm(props: TicketFormProps) {
  const { title, body, onTitleChange, onBodyChange, onSubmit } = props;

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <UnderlineInput
          type="text"
          name="title"
          value={title}
          placeholder="Enter Ticket Subject"
          onChange={(event: any) => onTitleChange(event.target.value)}
        />
      </div>
      <div>
        <TinyMceEditor
          content={body}
          onBodyChange={(body: string) => onBodyChange(body)}
        />
      </div>
      <div>
        <SubmitBtn type="submit" onClick={onSubmit}>
          Create
        </SubmitBtn>
      </div>
    </div>
  );
}

export default TicketForm;

interface TicketFormProps {
  title: string;
  body: string;
  onTitleChange: (str: string) => void;
  onBodyChange: (str: string) => void;
  onSubmit: () => void;
}
