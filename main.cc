#include <drogon/drogon.h>
#include <Magick++.h>
using namespace drogon;
using namespace Magick;

// Method to convert filetype
std::string convert(std::string inp) {
    std::cout << "working...";
    Image image;
    
    return inp;
}

int main()
{
    // Register API handler
    app().registerHandler(
        "/upload_endpoint",
        [](const HttpRequestPtr &req,
           std::function<void(const HttpResponsePtr &)> &&callback) {
            MultiPartParser fileUpload;

            // Check for only one file
            if (fileUpload.parse(req) != 0 || fileUpload.getFiles().size() != 1)
            {
                auto resp = HttpResponse::newHttpResponse();
                resp->setBody("Must only be one file");
                resp->setStatusCode(k403Forbidden);
                callback(resp);
                return;
            }

            auto &file = fileUpload.getFiles()[0];
            
            // Get file location for response
            std::string fileName = file.getFileName();

            // TODO: implement convertImg
            std::string convertedImg = convert(fileName);

            // Create response
            auto resp = HttpResponse::newHttpResponse();
            resp->setBody(convertedImg);

            // Save file
            file.save();
            LOG_INFO << "The uploaded file has been saved to the ./uploads "
                        "directory. ConvertedImg: "+convertedImg;

            // Return response
            callback(resp);
        },
        {Post});

    LOG_INFO << "Server running on 0.0.0.0:8001";
    app()
        .setClientMaxBodySize(20 * 2000 * 2000)
        .setUploadPath("./uploads")
        .addListener("0.0.0.0", 8002)
        .run();
}
