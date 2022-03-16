namespace API.Services.EmailService
{
    public interface IEmailService
    {
        bool SendEmail(string[] to, string subject, string body);
    }
}