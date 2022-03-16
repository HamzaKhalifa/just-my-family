using System;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace API.Services.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public bool SendEmail(string[] to, string subject, string body)
        {
            MimeMessage message = new MimeMessage();

            MailboxAddress from = new MailboxAddress("Admin", _configuration.GetSection("AppSettings:FromEmail").Value);
            message.From.Add(from);

            foreach(string email in to) {
                MailboxAddress toMailBoxAddress = new MailboxAddress("User", email);
                message.To.Add(toMailBoxAddress);
            }

            message.Subject = subject;

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = body;

            message.Body = bodyBuilder.ToMessageBody();

            try {
                SmtpClient client = new SmtpClient();
                client.Connect(
                    _configuration.GetSection("AppSettings:SMTP:Address").Value, 
                    int.Parse(_configuration.GetSection("AppSettings:SMTP:Port").Value),
                    true
                );
                client.Authenticate(
                    _configuration.GetSection("AppSettings:SMTP:Username").Value,
                    _configuration.GetSection("AppSettings:SMTP:Password").Value
                );

                client.Send(message);
                client.Disconnect(true);
                client.Dispose();

                return true;
            } catch(Exception e) {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}