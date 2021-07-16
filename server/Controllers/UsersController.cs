using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TicketApi.Models;
using TicketApi.Services;

namespace TicketApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly ITicketService _ticketService;

        public UsersController(ILogger<UsersController> logger, ITicketService ticketService)
        {
            _logger = logger;
            _ticketService = ticketService;
        }

        [HttpGet("{id}/tickets")]
        public IEnumerable<Ticket> GetTicketsByRequesterId(string id)
        {
            var tickets = _ticketService.GetByRequesterId(id);
            return tickets;
        }
    }
}