import { v4 } from "uuid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import TicketForm from "./components/TicketForm";
import { addTicketAction } from "../store";
import api from "../api";

function Add() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const onTitleChange = (title: string) => {
    setTitle(title);
  };

  const onBodyChange = (body: string) => {
    setBody(body);
  };

  const onSubmit = () => {
    api.tickets
      .create({
        id: v4(),
        title: title,
        body: body,
        createdDate: new Date().toISOString(),
        lastUpdatedDate: new Date().toISOString(),
      })
      .then((ticket) => {
        console.log(ticket);
        dispatch(addTicketAction(ticket));
      });

    setTitle("");
    setBody("");
  };

  return (
    <div>
      <TicketForm
        title={title}
        body={body}
        onTitleChange={onTitleChange}
        onBodyChange={onBodyChange}
        onSubmit={onSubmit}
      ></TicketForm>
    </div>
  );
}

export default Add;
