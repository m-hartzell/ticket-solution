import api from "./api";
import { Ticket } from "./ticket-api-types";

enum Actions {
  "ADD_TICKET" = "ADD_TICKET",
  "FETCH_TICKETS" = "FETCH_TICKETS",
  "REMOVE_TICKET" = "REMOVE_TICKET",
}

// State
interface State {
  tickets: Ticket[];
}
const initialState: State = {
  tickets: [],
};

// Reducer
function reducer(state: State = initialState, action: any) {
  console.log("State from reducer", state, action);
  switch (action.type) {
    case Actions.ADD_TICKET: {
      const array = [...state.tickets];
      array.push(action.ticket);
      return { ...state, tickets: array };
    }
    default:
      return state;
  }
}

// Actions
function addTicketAction(ticket: Ticket) {
  return { type: Actions.ADD_TICKET, ticket };
}

async function fetchTickets(dispatch: any) {
  const tickets = await api.tickets.getAllTickets();
  tickets.forEach((ticket) => dispatch(addTicketAction(ticket)));
}

export default reducer;
export { addTicketAction, fetchTickets };
