package com.softserve.teachua.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

//todo
/**
 * This controller returns frontend page when application is built as one.
 */
@Controller
public class MainController {
    /**
     * Method returns frontend page when application is built as one.
     *
     * @return index page of frontend
     */
    @GetMapping("/")
    public String index() {
        return "index.html";
    }
}
