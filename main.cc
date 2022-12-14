#include <drogon/drogon.h>
using namespace drogon;

// Method to convert filetype
std::string convert(std::string inpFile, std::string toFileType) {
    std::cout << "working...";
    std::string delimiter = ".";
    std::string fileName = inpFile.substr(0, inpFile.find(delimiter));

    LOG_INFO << "convert "+inpFile+" "+fileName+"."+toFileType;
    
    std::string script = "convert ./uploads/"+inpFile+" ./uploads/"+fileName+"."+toFileType;
    std::string rmsh = "rm ./uploads/"+inpFile;
    
    const char *chscript = script.c_str();
    const char *rmscript = rmsh.c_str();

    // Run convert cmd
    system(chscript);

    // Remove origional file
    system(rmscript);

    // Return name of converted img
    return fileName+"."+toFileType;
}

int main()
{
    app().registerPostHandlingAdvice(
        [](const drogon::HttpRequestPtr &req, const drogon::HttpResponsePtr &resp) {
            resp->addHeader("Access-Control-Allow-Origin", "*");
        });

    // Register API handler
    app().registerHandler(
        "/upload_endpoint?filetype={filetype}",
        [](const HttpRequestPtr &req,
           std::function<void(const HttpResponsePtr &)> &&callback, const std::string &filetype) {
            MultiPartParser fileUpload;
            
            LOG_INFO << "name below";
            LOG_INFO << filetype;

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

            // Save file
            file.save();

            // Convert file and return new filename
            std::string convertedImg = convert(fileName, filetype);

            // Create response
            auto resp = HttpResponse::newHttpResponse();
            resp->setBody(convertedImg);

            LOG_INFO << "The uploaded file has been saved to the ./uploads "
                        "directory. ConvertedImg: "+convertedImg;

            // Return response
            callback(resp);
        },
        {Post});

    LOG_INFO << "Server running on 0.0.0.0:8002";
    app()
        .setClientMaxBodySize(20 * 2000 * 2000)
        .setUploadPath("./uploads")
        .addListener("0.0.0.0", 8002)
        .run();
}
