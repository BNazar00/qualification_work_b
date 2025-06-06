package com.softserve.certificate.service;

import com.softserve.certificate.dto.certificate_by_template.CertificateByTemplateTransfer;
import com.softserve.certificate.dto.certificate_excel.CertificateByTemplateExcelParsingResponse;
import com.softserve.certificate.dto.certificate_excel.CertificateByTemplateExcelValidationResult;
import com.softserve.certificate.dto.certificate_excel.CertificateExcel;
import com.softserve.certificate.dto.certificate_excel.ExcelParsingResponse;
import java.util.List;
import org.apache.poi.ss.usermodel.Cell;
import org.springframework.web.multipart.MultipartFile;

/**
 * This interface contains all needed methods to manage excel parser.
 */
public interface CertificateExcelService {
    /**
     * This method parses excel-file and returns {@code ExcelParsingResponse} of mistakes and created dto.
     *
     * @param multipartFile - put bode of excel-file to parse
     * @return new {@code ExcelParsingResponse}.
     */
    ExcelParsingResponse parseExcel(MultipartFile multipartFile);

    CertificateByTemplateExcelParsingResponse parseFlexibleExcel(MultipartFile multipartFile);

    List<CertificateExcel> createUserCertificates(List<List<Cell>> rows);

    CertificateByTemplateExcelValidationResult validateCertificateByTemplateExcel(CertificateByTemplateTransfer data);

    byte[] getBadCertificateValuesExcelBytes(String badCertificateValues);
}
