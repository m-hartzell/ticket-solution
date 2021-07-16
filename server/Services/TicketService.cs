using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using TicketApi.Models;

namespace TicketApi.Services
{
    public interface ITicketService
    {
        public IEnumerable<Ticket> GetAll();
        public Ticket GetById(string id);
        public IEnumerable<Ticket> GetByRequesterId(string id);
        public Ticket Add(Ticket ticket);
    }

    public class TicketService : ITicketService
    {
        private readonly TicketApiContext _context;
        public TicketService(TicketApiContext context)
        {
            _context = context;
        }

        public IEnumerable<Ticket> GetAll()
        {
            var tickets = _context.Tickets.ToListAsync().Result;
            return tickets;
        }

        public Ticket GetById(string id)
        {
            var result = _context.Tickets
                            .Where(t => t.Id == new Guid(id))
                            .Include("Comments")
                            .First();

            return result;
        }

        public IEnumerable<Ticket> GetByRequesterId(string id)
        {
            var result = _context.Tickets.Where(t => t.RequesterId == id).ToList();
            return result;
        }

        public Ticket Add(Ticket ticket)
        {
            var result = _context.Tickets.Add(ticket);
            _context.SaveChanges();

            return result.Entity;
        }
    }
}