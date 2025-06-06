package com.softserve.teachua;

import com.softserve.teachua.utils.CertificateContentDecorator;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import org.springframework.mock.web.MockMultipartFile;

public final class TestConstants {
    public static final Long USER_ID = 100L;
    public static final String FIRST_NAME = "Тарас";
    public static final String LAST_NAME = "Шевченко";
    public static final String USER_ROLE = "USER_ROLE";
    public static final String PASSWORD = "password";
    public static final String PHONE = "+380960000000";
    public static final String OLD_REFRESH_TOKEN = "oldRefreshToken";
    public static final String NEW_REFRESH_TOKEN = "newRefreshToken";
    public static final String ENCODED_REFRESH_TOKEN = "encodedRefreshToken";
    public static final String NEW_ENCODED_REFRESH_TOKEN = "newEncodedRefreshToken";
    public static final String ACCESS_TOKEN = "accessToken";
    public static final String EMPTY_STRING = "";
    public static final String NOT_EMPTY_STRING = "Value";
    public static final Long LONG_ID = 1L;
    public static final Integer INTEGER_ID = 2;
    public static final String USER_EMAIL = "admin@gmail.com";
    public static final Long SERIAL_NUMBER = 3010000001L;
    public static final String USER_NAME = "Власник Сертифікату";
    public static final LocalDate UPDATE_DATE = LocalDate.now();
    public static final String STRING_DATE = LocalDate.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy"));
    public static final String STUDY_FORM = "дистанційна";
    public static final String COURSE_NUMBER = "10";
    public static final int HOURS = 40;
    public static final String CERTIFICATE_TEMPLATE_NAME = "Єдині учасник";
    public static final String FILE_PATH = "/certificates/templates/jedyni_participant_template.jrxml";
    public static final String FILE_PATH_PDF = "1673724092154.pdf";
    public static final String COURSE_DESCRIPTION = "Всеукраїнський курс підтримки в переході на українську мову";
    public static final String PROJECT_DESCRIPTION = "Курс створений та реалізований у рамках проєкту Єдині";
    public static final String PICTURE_PATH = "/static/images/certificate/validation/jedyni_banner.png";
    public static final String CERTIFICATE_TEMPLATE_PROPERTIES =
            "{\"id\":\"serial_number\",\"fullName\":\"user_name\",\"issueDate\":\"date\",\"countOfHours\":\"hours\","
                    + "\"learningForm\":\"study_form\",\"image\":\"qrCode_white\",\"duration\":\"duration\"}";
    public static final String INVALID_CERTIFICATE_TEMPLATE_PROPERTIES =
            "{\"id\":\"serial_number\",\"fullName\":\"user_name\",\"issueDate\":\"date\",\"countOfHours\":\"hours\","
                    + "\"learningForm\":\"study_form\",\"image\":\"qrCode_white\",\"duration\":\"duration\","
                    + "\"course_number\":\"course_number\"}";
    public static final Integer CERTIFICATE_TYPE_ID = 3;
    public static final Integer CERTIFICATE_TYPE_CODE_NUMBER = 3;
    public static final String CERTIFICATE_TYPE_NAME = "Учасник";
    public static final LocalDate CERTIFICATE_DATES_START_DATE = LocalDate.of(2023, 1, 1);
    public static final LocalDate CERTIFICATE_DATES_END_DATE = LocalDate.of(2023, 1, 31);
    public static final String CERTIFICATE_DATES_DURATION =
            new CertificateContentDecorator().formDates(CERTIFICATE_DATES_START_DATE, CERTIFICATE_DATES_END_DATE);
    public static final LocalDate CERTIFICATE_ISSUE_DATE = LocalDate.now();
    public static final String QUESTION_TITLE = "Укажіть дієприкметник";
    public static final String QUESTION_DESCRIPTION = "Вкажіть правильний варіант";
    public static final String QUESTION_CATEGORY = "Нова Категорія";
    public static final String QUESTION_TYPE = "Radio";
    public static final String VARIANT = "Вигравши";
    public static final String CORRECT = "TRUE";
    public static final MockMultipartFile MOCK_MULTIPART_FILE = new MockMultipartFile("file", new byte[0]);
    public static final String INVALID_CERTIFICATES_VALUES =
            "[{\"Номер курсу\":\"\",\"fullName\":\"Григор Григорій Григорович\",\"learningForm\":\"\","
                    + "\"Електронна пошта\":\"test@test.com\",\"countOfHours\":\"\","
                    + "\"issueDate\":\"\"},{\"Номер курсу\":\"\",\"fullName\":\"Коваль Микола Миколайович\","
                    + "\"learningForm\":\"\",\"Електронна пошта\":\"test@test.com\",\"countOfHours\":\"\","
                    + "\"issueDate\":\"\"},{\"Номер курсу\":\"\",\"fullName\":\"Федорович Федір\","
                    + "\"learningForm\":\"\",\"Електронна пошта\":\"test@test.com\",\"countOfHours\":\"\","
                    + "\"issueDate\":\"\"},{\"Номер курсу\":\"\",\"fullName\":\"Коваль Сергій Сергійович\","
                    + "\"learningForm\":\"\",\"Електронна пошта\":\"test@test.com\",\"countOfHours\":\"\","
                    + "\"issueDate\":\"\"}]\n";
}
