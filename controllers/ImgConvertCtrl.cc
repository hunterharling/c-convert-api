#include "ImgConvertCtrl.h"

void ImgConvertCtrl::asyncHandleHttpRequest(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback)
{
    // API Logic

    // Create response object
    Json::Value ret;
    float nums[5] = {10.0, 5.0, 2.5, 1.25, 0.75};
    ret["data"] =  nums;
    auto resp=HttpResponse::newHttpJsonResponse(ret);

    // Send response
    resp->setStatusCode(k200OK);
    resp->setContentTypeCode(CT_TEXT_PLAIN);
    callback(resp);
}
