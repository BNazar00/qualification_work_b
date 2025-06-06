package com.softserve.commons.util.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CertificateUserNameValidator implements ConstraintValidator<CertificateUserName, String> {
    private static final String EMPTY_EXCEPTION = "Ім'я учасника не може бути порожнім";
    public static final String INCORRECT_NAME_FORMAT_ERROR = "Неможливо розпізнати ім'я та прізвище";
    @SuppressWarnings("squid:S5843") //Suppressed because of project's business logic.
    public static final String NAME_PATTERN = "(([А-ЯІЇЄ][а-яіїє']+[-–—]?){1,2}\\s?){2}(\\(?([А-ЯІЇЄ][а-яіїє']+)\\)?)?";

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        if (s == null || s.trim().isEmpty()) {
            constraintValidatorContext.buildConstraintViolationWithTemplate(EMPTY_EXCEPTION);
            return false;
        }
        if (!s.trim().matches(NAME_PATTERN)) {
            constraintValidatorContext.buildConstraintViolationWithTemplate(INCORRECT_NAME_FORMAT_ERROR);
            return false;
        }
        return true;
    }
}
