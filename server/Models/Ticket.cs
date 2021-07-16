using System;
using System.Collections.Generic;

namespace TicketApi.Models
{

    public class Ticket : ITimeStamped
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastUpdatedDate { get; set; }
        public string RequesterId { get; set; }

        public User Requester { get; set; }
        public ICollection<TicketComment> Comments { get; set; }
    }
}