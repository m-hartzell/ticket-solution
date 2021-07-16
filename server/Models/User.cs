using System;
using System.Collections.Generic;

namespace TicketApi.Models
{
    public class User
    {
        public string Id { get; set; }
        public string UserName { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<TicketComment> Comments { get; set; }
    }
}
