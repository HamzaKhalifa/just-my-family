namespace API.HttpHelpers
{
    public class HttpResponse<T>
    {
        public T Data { get; set; }
        public bool Success { get; set; }
        public string ResponseType { get; set; }
        public string[] Messages { get; set; }
    }
}