package com.softserve.certificate.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.softserve.certificate.dto.certificate_by_template.CertificateByTemplateSavingResponse;
import com.softserve.certificate.dto.certificate_by_template.CertificateByTemplateTransfer;
import com.softserve.certificate.dto.certificate_excel.CertificateByTemplateExcelParsingResponse;
import com.softserve.certificate.dto.certificate_excel.CertificateByTemplateExcelValidationResult;
import com.softserve.certificate.dto.certificate_template.CertificateTemplatePreview;
import com.softserve.certificate.model.CertificateTemplate;
import com.softserve.certificate.service.CertificateDataLoaderService;
import com.softserve.certificate.service.CertificateExcelService;
import com.softserve.certificate.service.CertificateGoogleFormService;
import com.softserve.certificate.service.CertificateTemplateService;
import com.softserve.certificate.utils.annotation.AllowedRoles;
import com.softserve.commons.constant.RoleData;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * This controller is responsible for managing certificates created by a template.
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/certificate-by-template")
public class CertificateByTemplateController {
    private final CertificateExcelService excelService;
    private final CertificateTemplateService certificateTemplateService;
    private final CertificateDataLoaderService loaderService;
    private final CertificateGoogleFormService certificateGoogleFormService;

    public CertificateByTemplateController(CertificateExcelService excelService,
                                           CertificateTemplateService certificateTemplateService,
                                           CertificateDataLoaderService loaderService,
                                           CertificateGoogleFormService certificateGoogleFormService) {
        this.excelService = excelService;
        this.certificateTemplateService = certificateTemplateService;
        this.loaderService = loaderService;
        this.certificateGoogleFormService = certificateGoogleFormService;
    }

    /**
     * The method processing template and returns {@code CertificateByTemplateTransfer} fields that have to be inputted.
     *
     * @param template - {@code CertificateTemplatePreview} template dto.
     * @return new {@code CertificateByTemplateTransfer}.
     */
    @AllowedRoles(RoleData.ADMIN)
    @PostMapping("/pdf")
    public CertificateByTemplateTransfer uploadPdf(@RequestBody CertificateTemplatePreview template)
            throws JsonProcessingException {
        CertificateTemplate certificateTemplate = certificateTemplateService.getTemplateByFilePath(
                template.getFilePath());
        HashMap<String, String> templateProperties =
                new ObjectMapper().readValue(certificateTemplate.getProperties(), HashMap.class);

        List<String> fieldsList = new ArrayList<>();
        List<String> fieldPropertiesList = new ArrayList<>();
        for (Map.Entry<String, String> entry : templateProperties.entrySet()) {
            // @formatter:off
            switch (entry.getValue()) {
              case "date":
                  fieldsList.add(entry.getKey());
                  fieldPropertiesList.add("date");
                  break;
              case "hours", "course_number":
                  fieldsList.add(entry.getKey());
                  fieldPropertiesList.add("int");
                  break;
              case "qrCode_white", "qrCode_black":
                  break;
              case "serial_number":
                  if (!templateProperties.containsValue("course_number")) {
                      fieldsList.add("Номер курсу");
                      fieldPropertiesList.add("int");
                  }
                  break;
              case "user_name":
                  fieldsList.add(entry.getKey());
                  fieldPropertiesList.add("user_name");
                  break;
              default:
                  fieldsList.add(entry.getKey());
                  fieldPropertiesList.add("String");
            }
            // @formatter:on
        }
        fieldsList.add("Електронна пошта");
        fieldPropertiesList.add("email");
        return CertificateByTemplateTransfer.builder()
                .templateName(template.getFilePath())
                .fieldsList(fieldsList)
                .fieldPropertiesList(fieldPropertiesList)
                .build();
    }

    /**
     * The method uploads excel file and returns {@code CertificateByTemplateExcelParsingResponse}.
     *
     * @param multipartFile - excel file.
     * @return new {@code CertificateByTemplateExcelParsingResponse}.
     */
    @AllowedRoles(RoleData.ADMIN)
    @PostMapping("/excel")
    public CertificateByTemplateExcelParsingResponse uploadExcel(
            @RequestParam("excel-file") MultipartFile multipartFile) {
        return excelService.parseFlexibleExcel(multipartFile);
    }

    /**
     * The method saves data to database.
     *
     * @param data - {@code CertificateByTemplateTransfer} read from form.
     */
    @AllowedRoles(RoleData.ADMIN)
    @PostMapping
    public void saveCertificate(@RequestBody CertificateByTemplateTransfer data) throws IOException {
        log.info("Save certificate/certificates by template " + data);
        loaderService.saveCertificate(data);
    }

    /**
     * The method validates excel file.
     *
     * @param data template dto.
     * @return new {@code CertificateByTemplateExcelValidationResult}.
     */
    @AllowedRoles(RoleData.ADMIN)
    @PostMapping("/validate")
    public CertificateByTemplateExcelValidationResult validateCertificateExcelData(
            @RequestBody CertificateByTemplateTransfer data) {
        log.info("Validate certificate/certificates by template " + data);
        return excelService.validateCertificateByTemplateExcel(data);
    }

    @AllowedRoles(RoleData.ADMIN)
    @PostMapping("/save-gf")
    public CertificateByTemplateSavingResponse saveGoogleFormCertificateData2(
            @RequestBody CertificateByTemplateTransfer data) {
        log.info("Save Google Form certificate/certificates by template " + data);
        return certificateGoogleFormService.saveGoogleFormCertificateData(data);
    }

    @AllowedRoles(RoleData.ADMIN)
    @PostMapping("/get-invalid-certificates-excel")
    public ResponseEntity<ByteArrayResource> getInvalidCertificatesExcel(@RequestBody String values) {
        log.info("Form invalid certificates excel " + values);

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=certificates.xlsx");
        ByteArrayResource resource = new ByteArrayResource(excelService.getBadCertificateValuesExcelBytes(values));

        return ResponseEntity.ok().headers(header).contentLength(resource.getByteArray().length)
                .contentType(MediaType.APPLICATION_OCTET_STREAM).body(resource);
    }
}
