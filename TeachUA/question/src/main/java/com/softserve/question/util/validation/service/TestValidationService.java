package com.softserve.question.util.validation.service;

import com.softserve.question.dto.question.QuestionProfile;
import com.softserve.question.dto.test.CreateTest;
import com.softserve.question.util.validation.Violation;
import com.softserve.question.util.validation.container.QuestionValidationContainer;
import com.softserve.question.util.validation.container.TestValidationContainer;
import com.softserve.question.exception.TestValidationException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import java.util.List;
import java.util.Set;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class TestValidationService {
    private final Validator validator;

    public TestValidationService(Validator validator) {
        this.validator = validator;
    }

    private static <T> List<Violation> buildListViolation(Set<ConstraintViolation<T>> violations) {
        return violations.stream()
                .map(violation -> new Violation(
                        violation.getPropertyPath().toString(),
                        violation.getMessage()))
                .toList();
    }

    public void validateTest(CreateTest test) throws TestValidationException {
        TestValidationContainer testValidationContainer = new TestValidationContainer();
        Set<ConstraintViolation<CreateTest>> testConstraintViolations = validator.validate(test);
        List<Violation> testViolations = buildListViolation(testConstraintViolations);
        testValidationContainer.setTestViolations(testViolations);
        boolean isValid = testConstraintViolations.isEmpty();

        for (QuestionProfile question : test.getQuestions()) {
            QuestionValidationContainer container = new QuestionValidationContainer();
            Set<ConstraintViolation<QuestionProfile>> questionConstraintViolations = validateQuestion(question);
            List<Violation> questionViolations = buildListViolation(questionConstraintViolations);
            container.setQuestionViolations(questionViolations);
            testValidationContainer.addQuestionValidationContainer(container);
            isValid = questionConstraintViolations.isEmpty();
        }

        if (!isValid) {
            throw new TestValidationException(HttpStatus.BAD_REQUEST, testValidationContainer);
        }
    }

    private Set<ConstraintViolation<QuestionProfile>> validateQuestion(QuestionProfile question) {
        return validator.validate(question);
    }
}
