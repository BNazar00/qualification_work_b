package com.softserve.commons.client;

import java.util.Map;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
        name = "archive",
        url = "http://${APIGW_HOST}:${APIGW_ARCHIVE_PORT}",
        path = "/api/v1/archive")
public interface ArchiveClient {
    @GetMapping(params = {"className", "id"})
    Map<String, String> restoreModel(@RequestParam("className") String className,
                                            @RequestParam("id") Number id);
}
