using System;
using TicketApi.Models;

namespace TicketApi.DTOs
{
    public class TicketDto
    {
        public Guid TicketId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastUpdatedDate { get; set; }
        public string RequesterId { get; set; }

        public static TicketDto FromTicket(Ticket ticket)
        {
            return new TicketDto
            {
                TicketId = ticket.Id,
                Title = ticket.Title,
                Body = ticket.Body,
                CreatedDate = ticket.CreatedDate,
                LastUpdatedDate = ticket.LastUpdatedDate,
                RequesterId = ticket.Requester.Id
            };
        }
    }
}