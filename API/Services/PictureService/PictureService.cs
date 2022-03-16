using System;
using Microsoft.AspNetCore.Hosting;

namespace API.Services.PictureService
{
    public class PictureService : IPictureService
    {
        [Obsolete]
         private readonly IHostingEnvironment _hostingEnvironment;

        [Obsolete]
        public PictureService(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [Obsolete]
        public string UploadPicture(string base64, string path)
        {
            int index = base64.IndexOf("base64,") + 7;
            int length = base64.Length - (base64.IndexOf("base64,") + 7);
            try {
                string myBase64 = base64.Substring(index, length);
                
                var fileString = Convert.FromBase64String(myBase64);

                string pictureName = Utils.RandomString(10) + ".png";
                                                                
                var filePath = _hostingEnvironment.ContentRootPath + path + pictureName;
                
                System.IO.File.WriteAllBytes(filePath, fileString);

                return pictureName;
            } catch(Exception e) {
                Console.WriteLine(e.ToString());
                throw;
            }
        }
    }
}