#pragma once

#include <drogon/HttpSimpleController.h>

using namespace drogon;

class ImgConvertCtrl : public drogon::HttpSimpleController<ImgConvertCtrl>
{
  public:
    void asyncHandleHttpRequest(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback) override;
    PATH_LIST_BEGIN
    // list path definitions here;
    PATH_ADD("/imgconvertapi", Get, Post);
    PATH_LIST_END
};
