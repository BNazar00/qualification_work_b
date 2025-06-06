package com.softserve.question.util.validation;

import java.util.Arrays;
import java.util.Objects;

public final class NullValidator {
    private NullValidator() {
    }

    public static void checkNull(Object id, String type) {
        if (Objects.isNull(id)) {
            throw new IllegalArgumentException(type + " can't be null");
        }
    }

    public static void checkNullIds(Object... ids) {
        boolean hasNull = Arrays.stream(ids).anyMatch(Objects::isNull);

        if (hasNull) {
            throw new IllegalArgumentException("Id can't be null");
        }
    }
}
