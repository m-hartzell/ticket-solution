using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TicketApi.Models;
using TicketApi.Services;

namespace TicketApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TicketsController : ControllerBase
    {

        private readonly ILogger<TicketsController> _logger;
        private readonly ITicketService _ticketService;

        public TicketsController(ILogger<TicketsController> logger, ITicketService ticketService)
        {
            _logger = logger;
            _ticketService = ticketService;
        }

        [HttpGet]
        public IEnumerable<Ticket> GetAll()
        {
            var result = _ticketService.GetAll();
            return result;
        }

        [HttpGet("{id}")]
        public Ticket GetById(string id)
        {
            var ticket = _ticketService.GetById(id);
            return ticket;
        }

        [HttpPost]
        public ActionResult<Ticket> Create(Ticket ticket)
        {
            _ticketService.Add(ticket);
            return CreatedAtAction(nameof(GetById), new { id = ticket.Id.ToString() }, ticket);
        }
    }
}
