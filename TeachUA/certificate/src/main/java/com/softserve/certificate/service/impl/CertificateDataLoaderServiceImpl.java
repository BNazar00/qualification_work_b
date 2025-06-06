package com.softserve.certificate.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.softserve.certificate.dto.certificate.CertificateDataRequest;
import com.softserve.certificate.dto.certificate.CertificateDatabaseResponse;
import com.softserve.certificate.dto.certificate_by_template.CertificateByTemplateTransfer;
import com.softserve.certificate.dto.certificate_excel.CertificateExcel;
import com.softserve.certificate.model.Certificate;
import com.softserve.certificate.model.CertificateDates;
import com.softserve.certificate.model.CertificateTemplate;
import com.softserve.certificate.model.CertificateType;
import com.softserve.certificate.repository.CertificateRepository;
import com.softserve.certificate.repository.CertificateTemplateRepository;
import com.softserve.certificate.repository.CertificateTypeRepository;
import com.softserve.certificate.service.CertificateDataLoaderService;
import static com.softserve.certificate.service.CertificateDataLoaderService.getCertificateByTemplateValue;
import com.softserve.certificate.service.CertificateDatesService;
import com.softserve.certificate.service.CertificateService;
import com.softserve.certificate.service.CertificateTemplateService;
import com.softserve.certificate.service.CertificateTypeService;
import com.softserve.certificate.utils.CertificateContentDecorator;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CertificateDataLoaderServiceImpl implements CertificateDataLoaderService {
    private static final String UPDATED_EMAIL = "Оновлено електронну адресу учасника %s";
    private static final String ALREADY_EXISTS = "Сертифікат для учасника %s вже згенеровано %s";
    private static final String DATE_FORMAT = "dd.MM.yyyy";
    private static final String PROJECT_DESCRIPTION =
            "Курс створений та реалізований у рамках проєкту “Єдині” ініціативи “Навчай українською”, до якої належить "
                    + "“Українська гуманітарна платформа”.";
    private static final String COURSE_DESCRIPTION =
            "Всеукраїнський курс “Єдині. 28 днів підтримки в переході на українську мову”";
    @SuppressWarnings("squid:S1075") //Suppressed because of project's business logic.
    private static final String PICTURE_PATH = "/static/images/certificate/validation/jedyni_banner.png";
    private final CertificateService certificateService;
    private final CertificateDatesService certificateDatesService;
    private final CertificateTypeService certificateTypeService;
    private final CertificateTemplateService templateService;
    private final CertificateRepository certificateRepository;
    private final CertificateTemplateRepository templateRepository;
    private final CertificateTypeRepository certificateTypeRepository;
    private final CertificateContentDecorator decorator;
    private final ObjectMapper objectMapper;

    public CertificateDataLoaderServiceImpl(CertificateService certificateService,
                                            CertificateDatesService certificateDatesService,
                                            CertificateTypeService certificateTypeService,
                                            CertificateTemplateService templateService,
                                            CertificateRepository certificateRepository,
                                            CertificateTemplateRepository templateRepository,
                                            CertificateTypeRepository certificateTypeRepository,
                                            CertificateContentDecorator decorator, ObjectMapper objectMapper) {
        this.certificateService = certificateService;
        this.certificateDatesService = certificateDatesService;
        this.certificateTypeService = certificateTypeService;
        this.templateService = templateService;
        this.certificateRepository = certificateRepository;
        this.templateRepository = templateRepository;
        this.certificateTypeRepository = certificateTypeRepository;
        this.decorator = decorator;
        this.objectMapper = objectMapper;
    }

    @Override
    public List<CertificateDatabaseResponse> saveToDatabase(CertificateDataRequest data) {
        List<CertificateDatabaseResponse> response = new ArrayList<>();
        int index = 0;
        for (CertificateExcel certificateExcel : data.getExcelList()) {
            CertificateDates dates = saveDates(data, index);
            CertificateTemplate template = saveTemplate(data.getType());
            Certificate certificate =
                    Certificate.builder().userName(certificateExcel.getName()).sendToEmail(certificateExcel.getEmail())
                            .template(template).dates(dates).build();
            if (!certificateRepository.existsByUserNameAndDates(certificate.getUserName(), certificate.getDates())) {
                certificateService.addCertificate(certificate);
            } else {
                Certificate certificateFound =
                        certificateService.getByUserNameAndDates(certificate.getUserName(), certificate.getDates());
                if (!certificate.getSendToEmail().equals(certificateFound.getSendToEmail())) {
                    certificate.setSendStatus(null);
                    certificateService.updateCertificateEmail(certificateFound.getId(), certificate);
                    response.add(new CertificateDatabaseResponse(
                            String.format(UPDATED_EMAIL, certificateFound.getUserName())));
                } else if (!certificate.getDates().equals(certificateFound.getDates())) {
                    certificateService.addCertificate(certificate);
                } else {
                    response.add(new CertificateDatabaseResponse(
                            String.format(ALREADY_EXISTS, certificateFound.getUserName(),
                                    certificateFound.getDates().getDate())));
                }
            }
            index++;
        }
        return response;
    }

    private CertificateDates saveDates(CertificateDataRequest data, Integer index) {
        CertificateDates dates = CertificateDates.builder()
                .date(data.getExcelList().get(index).getDateIssued().format(DateTimeFormatter.ofPattern(DATE_FORMAT)))
                .hours(data.getHours()).courseNumber(data.getCourseNumber()).build();
        if (data.getType() == 3) {
            dates.setDuration(decorator.formDates(data.getStartDate(), data.getEndDate()));
        } else {
            dates.setStudyForm(data.getStudyType());
        }
        return certificateDatesService.getOrCreateCertificateDates(dates);
    }

    private CertificateTemplate saveTemplate(Integer type) {
        checkDataBaseContent();
        return templateService.getTemplateByType(type);
    }

    private void checkDataBaseContent() {
        if (!certificateTypeRepository.existsById(1)) {
            certificateTypeService.addCertificateType(
                    CertificateType.builder().codeNumber(1).name("Тренер").build());
        }
        if (!certificateTypeRepository.existsById(2)) {
            certificateTypeService.addCertificateType(
                    CertificateType.builder().codeNumber(2).name("Модератор").build());
        }
        if (!certificateTypeRepository.existsById(3)) {
            certificateTypeService.addCertificateType(
                    CertificateType.builder().codeNumber(3).name("Учасник").build());
        }
        if (!certificateTypeRepository.existsById(4)) {
            certificateTypeService.addCertificateType(
                    CertificateType.builder().codeNumber(4).name("Учасник").build());
        }
        CertificateType certificateType = certificateTypeService.getCertificateTypeById(3);
        if (!templateRepository.existsCertificateTemplateByCertificateType(certificateType)) {
            templateService.addTemplate(CertificateTemplate.builder().name("Єдині учасник")
                    .certificateType(certificateType)
                    .filePath("/certificates/templates/jedyni_participant_template.jrxml")
                    .courseDescription(COURSE_DESCRIPTION)
                    .projectDescription(PROJECT_DESCRIPTION)
                    .picturePath(PICTURE_PATH).build());
        }
        certificateType = certificateTypeService.getCertificateTypeById(1);
        if (!templateRepository.existsCertificateTemplateByCertificateType(certificateType)) { // Trainer
            templateService.addTemplate(CertificateTemplate.builder().name("Єдині тренер")
                    .certificateType(certificateType)
                    .filePath("/certificates/templates/trainer_certificate.jrxml")
                    .courseDescription(COURSE_DESCRIPTION)
                    .projectDescription(PROJECT_DESCRIPTION)
                    .picturePath(PICTURE_PATH).build());
        }
        certificateType = certificateTypeService.getCertificateTypeById(2);
        if (!templateRepository.existsCertificateTemplateByCertificateType(certificateType)) { // Moderator
            templateService.addTemplate(CertificateTemplate.builder().name("Єдині модератор")
                    .certificateType(certificateType)
                    .filePath("/certificates/templates/moderator_certificate.jrxml")
                    .courseDescription(COURSE_DESCRIPTION)
                    .projectDescription(PROJECT_DESCRIPTION)
                    .picturePath(PICTURE_PATH).build());
        }
        certificateType = certificateTypeService.getCertificateTypeById(4);
        if (!templateRepository.existsCertificateTemplateByCertificateType(certificateType)) {
            templateService.addTemplate(CertificateTemplate.builder().name("Учасник базового рівня")
                    .certificateType(certificateType)
                    .filePath("/certificates/templates/jedyni_basic_participant_template.jrxml")
                    .courseDescription("Вивчення української мови базового рівня.")
                    .projectDescription(PROJECT_DESCRIPTION)
                    .picturePath(PICTURE_PATH).build());
        }
    }

    @Override
    public void saveCertificate(CertificateByTemplateTransfer data) throws JsonProcessingException {
        CertificateTemplate certificateTemplate = templateService.getTemplateByFilePath(data.getTemplateName());

        HashMap<String, String> templateProperties =
                objectMapper.readValue(certificateTemplate.getProperties(), HashMap.class);
        HashMap<String, String> mainValues = objectMapper.readValue(data.getValues(), HashMap.class);

        int i = 1;
        if (!data.getExcelContent().isEmpty()) {
            i = data.getExcelContent().size();
        }
        for (int j = 0; j < i; j++) {
            HashMap<String, String> values = new HashMap<>(mainValues);
            CertificateDates certificateDates = new CertificateDates();
            Certificate certificate = new Certificate();

            for (Map.Entry<String, String> entry : templateProperties.entrySet()) {
                // @formatter:off
                switch (entry.getValue()) {
                  case "serial_number":
                      if (!templateProperties.containsValue("course_number")) {
                          certificateDates.setCourseNumber(getCertificateByTemplateValue(values, data, j,
                                  "", "Номер курсу"));
                      }
                      break;
                  case "course_number":
                      certificateDates.setCourseNumber(
                              getCertificateByTemplateValue(values, data, j, entry.getValue(), entry.getKey()));
                      break;
                  case "user_name":
                      certificate.setUserName(
                              getCertificateByTemplateValue(values, data, j, entry.getValue(), entry.getKey()));
                      break;
                  case "date":
                      certificateDates.setDate(
                              getCertificateByTemplateValue(values, data, j, entry.getValue(), entry.getKey()));
                      break;
                  case "duration":
                      certificateDates.setDuration(
                              getCertificateByTemplateValue(values, data, j, entry.getValue(), entry.getKey()));
                      break;
                  case "hours":
                      certificateDates.setHours(Integer.valueOf(
                              getCertificateByTemplateValue(values, data, j, entry.getValue(), entry.getKey())));
                      break;
                  case "study_form":
                      certificateDates.setStudyForm(
                              getCertificateByTemplateValue(values, data, j, entry.getValue(), entry.getKey()));
                      break;
                  default:
                      break;
                }
                // @formatter:on
            }
            certificateDates = certificateDatesService.getOrCreateCertificateDates(certificateDates);

            certificate.setValues(objectMapper.writeValueAsString(values));
            certificate.setSendToEmail(
                    CertificateDataLoaderService.getCertificateByTemplateValue(values, data, j, "email",
                            "Електронна пошта"));
            certificate.setTemplate(certificateTemplate);
            certificate.setDates(certificateDates);

            certificateService.addCertificate(certificate);
        }
    }
}
