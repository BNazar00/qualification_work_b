package com.softserve.certificate.controller;

import com.softserve.certificate.model.TestModel;
import com.softserve.certificate.service.TestService;
import com.softserve.certificate.utils.annotation.AllowedRoles;
import com.softserve.commons.constant.RoleData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/certificate/test")
public class TestController {
    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @PostMapping
    public void save(@RequestBody TestModel data) {
        testService.save(data);
    }

    @DeleteMapping
    public void delete(@RequestParam("id") Long id) {
        testService.delete(id);
    }

    @PostMapping("/{id}")
    public void restore(@PathVariable("id") Long id) {
        testService.restore(id);
    }

    @AllowedRoles(RoleData.ADMIN)
    @GetMapping("/admin")
    public void testAdmin() {
        log.info("admin");
    }
}
