using System;

namespace TicketApi.Models
{
    public interface ITimeStamped
    {
        DateTime CreatedDate { get; set; }
        DateTime LastUpdatedDate { get; set; }
    }
}