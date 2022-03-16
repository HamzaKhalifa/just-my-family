namespace API.Services.PictureService
{
    public interface IPictureService
    {
        string UploadPicture(string base64, string path);
    }
}