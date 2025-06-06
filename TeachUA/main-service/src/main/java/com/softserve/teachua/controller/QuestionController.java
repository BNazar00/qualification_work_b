package com.softserve.teachua.controller;

import com.softserve.commons.constant.RoleData;
import com.softserve.teachua.controller.marker.Api;
import com.softserve.teachua.dto.question.QuestionProfile;
import com.softserve.teachua.dto.question.QuestionResponse;
import com.softserve.teachua.model.Question;
import com.softserve.teachua.service.QuestionService;
import com.softserve.teachua.utils.annotation.AllowedRoles;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This controller is for managing the questions.
 */
@RestController
@Tag(name = "question", description = "the Question API")
@SecurityRequirement(name = "api")
@RequestMapping("/api/v1/news/question")
public class QuestionController implements Api {
    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    /**
     * Use this endpoint to get Question by id. The controller returns {@code Question}.
     *
     * @param id
     *            - put Question id here.
     *
     * @return {@code Question}
     */
    @GetMapping("/{id}")
    public Question getNews(@PathVariable Long id) {
        return questionService.getQuestionById(id);
    }

    /**
     * Use this endpoint to create a new Question The controller returns {@code QuestionResponse}.
     *
     * @param questionProfile
     *            - object of DTO class
     *
     * @return new {@code QuestionResponse}.
     */
    @AllowedRoles(RoleData.ADMIN)
    @PostMapping
    public QuestionResponse addNews(@RequestBody QuestionProfile questionProfile) {
        return questionService.addQuestion(questionProfile);
    }

    /**
     * Use this endpoint to update Question by id. The controller returns {@code QuestionProfile}.
     *
     * @param id
     *            - put question id here.
     * @param questionProfile
     *            - put question information here.
     *
     * @return {@code QuestionProfile}
     */
    @AllowedRoles(RoleData.ADMIN)
    @PutMapping("/{id}")
    public QuestionProfile updateNewsById(@PathVariable Long id, @RequestBody QuestionProfile questionProfile) {
        return questionService.updateQuestionById(id, questionProfile);
    }

    /**
     * Use this endpoint to delete Question by id. The controller returns {@code QuestionProfile}.
     *
     * @param id
     *            - put question id here.
     *
     * @return {@code QuestionProfile}
     */
    @AllowedRoles(RoleData.ADMIN)
    @DeleteMapping("/{id}")
    public QuestionProfile deleteNews(@PathVariable Long id) {
        return questionService.deleteQuestionById(id);
    }

    /**
     * Use this endpoint to get all Questions. The controller returns {@code List<QuestionResponse>}.
     *
     * @return {@code List<QuestionResponse>}
     */
    @GetMapping
    public List<QuestionResponse> getAllNews() {
        return questionService.getAllQuestions();
    }
}
