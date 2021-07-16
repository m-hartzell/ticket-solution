import axios, { AxiosRequestConfig } from "axios";
import { Ticket } from "../ticket-api-types";

// Init
const baseApiConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_URL,
};
const axiosApi = axios.create(baseApiConfig);

// Base API Request
function apiRequest<T>(requestData: AxiosRequestConfig) {
  return axiosApi.request<T>(requestData);
}

// Tickets API
const tickets = {
  getAllTickets: () => {
    return apiRequest<Ticket[]>({ url: "/tickets", method: "GET" }).then(
      (response) => response.data
    );
  },

  getTicketsByRequesterId: (requesterId: string) => {
    return apiRequest<Ticket[]>({
      url: `users/${requesterId}/tickets`,
      method: "GET",
    }).then((response) => response.data);
  },

  getTicketById: (ticketId: string) => {
    return apiRequest<Ticket>({
      url: `tickets/${ticketId}`,
      method: "GET",
    }).then((response) => response.data);
  },

  create: (ticket: Ticket) => {
    return apiRequest<Ticket>({
      url: `tickets`,
      method: "POST",
      data: ticket,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.data);
  },
};

// Composed API
const api = {
  tickets,
};

export default api;
