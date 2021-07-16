using System;
using Microsoft.EntityFrameworkCore;

namespace TicketApi.Models
{
    public class TicketComment : ITimeStamped
    {
        public Guid Id { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastUpdatedDate { get; set; }
        public User Author { get; set; }
        public TicketCommentType TicketCommentType { get; set; }
    }

    public class TicketCommentType
    {
        public Guid TicketCommentTypeId { get; set; }
        public string Name { get; set; }
    }
}