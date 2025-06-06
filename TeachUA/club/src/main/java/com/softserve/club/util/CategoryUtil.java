package com.softserve.club.util;

import java.util.List;

public class CategoryUtil {
    private CategoryUtil() {
    }

    public static List<String> replaceSemicolonToComma(List<String> categories) {
        return categories != null ? categories.stream()
                .map(categoryName -> categoryName.replace(";", ","))
                .toList() : null;
    }
}
