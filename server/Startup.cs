using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Moq;
using TicketApi.Models;
using TicketApi.Services;

namespace TicketApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ITicketService, TicketService>();
            services.AddDbContext<TicketApiContext>(options => options.UseNpgsql(Configuration["TicketsDbConnectionString"]));
            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Ticket Api", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // app.UseHttpsRedirection();

            SeedDatabase(app.ApplicationServices);

            app.UseRouting();

            app.UseCors(c =>
            {
                c.AllowAnyOrigin();
                c.AllowAnyHeader();
            });

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("v1/swagger.json", "Ticket Api v1");
            });
        }

        public void SeedDatabase(IServiceProvider serviceProvider)
        {
            using (var serviceScope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var db = serviceScope.ServiceProvider.GetService<TicketApiContext>();

                db.Database.EnsureDeleted();
                db.Database.EnsureCreated();

                var user = new User
                {
                    Id = "auth0|60b1b890e49eaf0069f6d2e3",
                    UserName = "hartzell242"
                };

                var tickets = new List<Ticket> {
                    new Ticket {
                        Title = "Need help",
                        Body = @"
                            <p>Proident do aliqua fugiat Lorem pariatur. Magna reprehenderit sunt sunt in eu ex. Irure proident.</p>
                            <p>Voluptate enim commodo dolor consequat aliquip. Consequat qui deserunt commodo sit quis cillum eu cupidatat. Nulla excepteur in dolor est esse excepteur amet incididunt amet fugiat deserunt.</p>
                        ",
                        CreatedDate = DateTime.Now,
                        LastUpdatedDate = DateTime.Now,
                        RequesterId = user.Id,
                        Comments = new List<TicketComment> {
                            new TicketComment {
                                Comment = @"<p>Test comment</p>",
                                CreatedDate = DateTime.Now,
                                LastUpdatedDate = DateTime.Now,
                                Author = user
                            }
                        }
                    },
                    new Ticket {
                        Title = "Initiative #2 - SupaMega",
                        Body = @"
                            <p>Consectetur esse aute velit pariatur aliqua velit do qui. Proident ullamco ad.</p>
                            <p>Proident sunt dolor enim deserunt et tempor ut amet deserunt Lorem nulla elit ullamco deserunt. Labore commodo est cupidatat consectetur cillum laborum aliquip occaecat. Excepteur elit ad fugiat laborum nisi enim velit et Lorem.</p>
                        ",
                        CreatedDate = DateTime.Now,
                        LastUpdatedDate = DateTime.Now,
                        RequesterId = user.Id
                    }
                };

                db.Add(user);
                db.AddRange(tickets);
                db.SaveChanges();
            }
        }
    }
}
