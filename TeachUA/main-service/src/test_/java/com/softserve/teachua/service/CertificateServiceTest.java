package com.softserve.teachua.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.softserve.teachua.TestUtils;
import com.softserve.teachua.converter.DtoConverter;
import com.softserve.teachua.dto.certificate.CertificatePreview;
import com.softserve.teachua.dto.certificate.CertificateTransfer;
import com.softserve.teachua.dto.certificate.CertificateUserResponse;
import com.softserve.teachua.dto.certificate.CertificateVerificationResponse;
import com.softserve.teachua.exception.CertificateGenerationException;
import com.softserve.teachua.exception.NotExistException;
import com.softserve.teachua.exception.UserPermissionException;
import com.softserve.teachua.model.Certificate;
import com.softserve.teachua.model.CertificateDates;
import com.softserve.teachua.model.CertificateType;
import com.softserve.teachua.model.archivable.CertificateArch;
import com.softserve.teachua.repository.CertificateRepository;
import com.softserve.teachua.service.impl.CertificateServiceImpl;
import com.softserve.teachua.utils.CertificateContentDecorator;
import com.softserve.teachua.utils.QRCodeService;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Stream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.server.ResponseStatusException;
import static com.softserve.teachua.TestConstants.LONG_ID;
import static com.softserve.teachua.TestConstants.SERIAL_NUMBER;
import static com.softserve.teachua.TestConstants.UPDATE_DATE;
import static com.softserve.teachua.TestConstants.USER_EMAIL;
import static com.softserve.teachua.TestConstants.USER_NAME;
import static com.softserve.teachua.TestUtils.getCertificateDates;
import static com.softserve.teachua.TestUtils.getCertificateTemplate;
import static com.softserve.teachua.TestUtils.getCertificateVerificationResponse;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CertificateServiceTest {
    public static final String BASE_URL_FIELD = "baseUrl";
    public static final String BASE_URL = "http://localhost:8080/dev";
    private static final String UPDATED_EMAIL = "updated@gmail.com";
    private static final String UPDATED_NAME = "Новий Власник";
    private final ModelMapper mapper = new ModelMapper();
    @Mock
    private CertificateRepository certificateRepository;
    @Mock
    private DtoConverter dtoConverter;
    @Mock
    private ArchiveService archiveService;
    @Mock
    private ObjectMapper objectMapper;
    @Mock
    private CertificateTemplateService certificateTemplateService;
    @Mock
    private CertificateDatesService certificateDatesService;
    @Mock
    private CertificateContentDecorator certificateContentDecorator;
    @Mock
    private QRCodeService qrCodeService;
    @Spy
    @InjectMocks
    private CertificateServiceImpl certificateService;
    private Certificate certificate;
    private CertificateUserResponse certificateUserResponse;
    private CertificatePreview certificatePreview;
    private CertificateTransfer certificateTransfer;
    private CertificateArch certificateArch;

    private static Stream<Arguments> serialNumberSource() {
        return Stream.of(
                Arguments.of(3, "01", "0000000", "3010000001"),
                Arguments.of(11, "22", "0000000", "11220000001"),
                Arguments.of(1, "99", "7777779", "1997777780"),
                Arguments.of(2, "23", "7999999", "2238000000"),
                Arguments.of(1, "33", null, "1330000017"),
                Arguments.of(2, "33", null, "2330000061"),
                Arguments.of(4, "33", null, "4330000001")
        );
    }

    private static Stream<Arguments> provideCertificateForDownload() {
        Certificate certificate = Certificate.builder()
                .id(LONG_ID)
                .sendToEmail(USER_EMAIL)
                .serialNumber(SERIAL_NUMBER)
                .updateStatus(UPDATE_DATE)
                .sendStatus(true)
                .build();
        return Stream.of(
                Arguments.of(certificate),
                Arguments.of(certificate.withSendStatus(null).withUpdateStatus(null)),
                Arguments.of(certificate.withSendStatus(null).withUpdateStatus(LocalDate.now())),
                Arguments.of(certificate.withSendStatus(false).withUpdateStatus(null)),
                Arguments.of(certificate.withSendStatus(false).withUpdateStatus(LocalDate.now()))
        );
    }

    @BeforeEach
    void setUp() {
        certificate = TestUtils.getCertificate();

        certificateUserResponse = TestUtils.getCertificateUserResponse();
        certificatePreview = mapper.map(certificate, CertificatePreview.class);
        certificateTransfer = mapper.map(certificate, CertificateTransfer.class);
        certificateArch = mapper.map(certificate, CertificateArch.class);
    }

    @Test
    @DisplayName("getListOfCertificates should return List of CertificateTransfer")
    void getListOfCertificates() {
        when(certificateRepository.findAll())
                .thenReturn(Collections.singletonList(certificate));
        when(dtoConverter.convertToDto(certificate, CertificateTransfer.class))
                .thenReturn(certificateTransfer);

        assertThat(certificateService.getListOfCertificates())
                .isNotEmpty()
                .isEqualTo(Collections.singletonList(certificateTransfer));
    }

    @Test
    @DisplayName("getListOfCertificatesPreview should return List of CertificatePreview")
    void getListOfCertificatesPreview() {
        when(certificateRepository.findAllByOrderByIdAsc())
                .thenReturn(Collections.singletonList(certificate));
        when(dtoConverter.convertToDto(certificate, CertificatePreview.class))
                .thenReturn(certificatePreview);

        assertThat(certificateService.getListOfCertificatesPreview())
                .isNotEmpty()
                .isEqualTo(Collections.singletonList(certificatePreview));
    }

    @Test
    @DisplayName("getListOfCertificatesByEmail should return List of CertificateUserResponse")
    void getListOfCertificatesByEmail() {
        when(certificateRepository.findAllForDownload(USER_EMAIL))
                .thenReturn(Collections.singletonList(certificate));

        assertThat(certificateService.getListOfCertificatesByEmail(USER_EMAIL))
                .isNotEmpty()
                .isEqualTo(Collections.singletonList(certificateUserResponse));
    }

    @Test
    @DisplayName("getSimilarCertificatesByUserName should return List of CertificatePreview with similar usernames")
    void getSimilarCertificatesByUserName() {
        when(certificateRepository.findSimilarByUserName(USER_NAME))
                .thenReturn(Collections.singletonList(certificate));
        when(dtoConverter.convertToDto(certificate, CertificatePreview.class))
                .thenReturn(certificatePreview);

        assertThat(certificateService.getSimilarCertificatesByUserName(USER_NAME))
                .isNotEmpty()
                .isEqualTo(Collections.singletonList(certificatePreview));
    }

    @Test
    @DisplayName("getSentCertificatesByEmailAndUpdateStatus should return List of Certificate")
    void getSentCertificatesByEmailAndUpdateStatus() {
        when(certificateRepository.findAllBySendToEmailAndUpdateStatusAndSendStatusTrue(
                certificate.getSendToEmail(),
                certificate.getUpdateStatus()
        )).thenReturn(Collections.singletonList(certificate));

        assertThat(certificateService.getSentCertificatesByEmailAndUpdateStatus(
                certificate.getSendToEmail(),
                certificate.getUpdateStatus()
        ))
                .isNotEmpty()
                .isEqualTo(Collections.singletonList(certificate));
    }

    @Test
    @DisplayName("getListOfUnsentCertificates should return List of CertificateTransfer")
    void getListOfUnsentCertificates() {
        when(certificateRepository.findUnsentCertificates())
                .thenReturn(Collections.singletonList(certificate));
        when(dtoConverter.convertToDto(certificate, CertificateTransfer.class))
                .thenReturn(certificateTransfer);

        assertThat(certificateService.getListOfUnsentCertificates())
                .isNotEmpty()
                .isEqualTo(Collections.singletonList(certificateTransfer));
    }

    @Test
    @DisplayName("Should return CertificateTransfer if unsent certificate exists")
    void getOneUnsentCertificateIfExists() {
        when(certificateRepository.findTopBySendStatusNullOrderByIdAsc())
                .thenReturn(certificate);
        when(dtoConverter.convertToDto(certificate, CertificateTransfer.class))
                .thenReturn(certificateTransfer);

        assertThat(certificateService.getOneUnsentCertificate())
                .isEqualTo(certificateTransfer);
    }

    @Test
    @DisplayName("Should return null if unsent certificate does not exist")
    void getOneUnsentCertificateIfDoesNotExist() {
        when(certificateRepository.findTopBySendStatusNullOrderByIdAsc())
                .thenReturn(null);

        assertThat(certificateService.getOneUnsentCertificate()).isNull();
    }

    @Test
    @DisplayName("Should return Certificate by id if exists")
    void getCertificateByIdIfExists() {
        when(certificateRepository.findById(certificate.getId()))
                .thenReturn(Optional.of(certificate));

        assertThat(certificateService.getCertificateById(certificate.getId()))
                .isNotNull()
                .isEqualTo(certificate);
    }

    @Test
    @DisplayName("Should throw NotExistException if Certificate with id does not exist")
    void getCertificateByIdIfDoesNotExist() {
        when(certificateRepository.findById(anyLong()))
                .thenReturn(Optional.empty());

        long id = anyLong();
        assertThatThrownBy(() -> certificateService.getCertificateById(id))
                .isInstanceOf(NotExistException.class);
    }

    @Test
    @DisplayName("Should return Certificate by serial number if exists")
    void getCertificateBySerialNumberIfExists() {
        when(certificateRepository.findBySerialNumber(certificate.getSerialNumber()))
                .thenReturn(Optional.of(certificate));

        assertThat(certificateService.getCertificateBySerialNumber(certificate.getSerialNumber()))
                .isNotNull()
                .isEqualTo(certificate);
    }

    @Test
    @DisplayName("Should throw NotExistException if Certificate with serial number does not exist")
    void getCertificateBySerialNumberIfDoesNotExist() {
        when(certificateRepository.findBySerialNumber(anyLong()))
                .thenReturn(Optional.empty());

        Long serialNumber = anyLong();

        assertThatThrownBy(() -> certificateService.getCertificateBySerialNumber(serialNumber))
                .isInstanceOf(NotExistException.class);
    }

    @Test
    @DisplayName("Should return List of Certificate by username")
    void getCertificatesByUserName() {
        when(certificateRepository.findByUserName(certificate.getUserName()))
                .thenReturn(Collections.singletonList(certificate));

        assertThat(certificateService.getCertificatesByUserName(certificate.getUserName()))
                .isNotEmpty()
                .isEqualTo(Collections.singletonList(certificate));
    }

    @Test
    @DisplayName("Should return Certificate by username and dates if exists")
    void getByUserNameAndDatesIfExists() {
        when(certificateRepository.findByUserNameAndDates(
                certificate.getUserName(),
                certificate.getDates()
        )).thenReturn(Optional.of(certificate));

        assertThat(certificateService.getByUserNameAndDates(
                certificate.getUserName(), certificate.getDates()
        )).isNotNull().isEqualTo(certificate);
    }

    @Test
    @DisplayName("Should throw NotExistException if Certificate with username and dates does not exist")
    void getByUserNameAndDatesIfDoesNotExist() {
        when(certificateRepository.findByUserNameAndDates(
                anyString(), any()
        )).thenReturn(Optional.empty());

        String userName = anyString();
        CertificateDates dates = any();

        assertThatThrownBy(() -> certificateService.getByUserNameAndDates(
                userName, dates
        )).isInstanceOf(NotExistException.class);
    }

    @Test
    @DisplayName("Should return CertificateVerificationResponse by serial number")
    void validateCertificate() {
        CertificateVerificationResponse expected = getCertificateVerificationResponse();

        when(certificateRepository.findBySerialNumber(certificate.getSerialNumber()))
                .thenReturn(Optional.of(certificate));

        CertificateVerificationResponse actual =
                certificateService.validateCertificate(certificate.getSerialNumber());

        assertNotNull(actual);
        assertEquals(expected.getSerialNumber(), actual.getSerialNumber());
    }

    @Test
    @DisplayName("Should save Certificate in database")
    void addCertificate() {
        certificateService.addCertificate(certificate);

        verify(certificateRepository).save(certificate);
    }

    @Test
    @DisplayName("Should throw ResponseStatusException with 500 code for invalid CertificateTransfer")
    void generateSerialNumberForInvalidCertificateTransfer() {
        CertificateTransfer invalidCertificateTransfer = certificateTransfer
                .withTemplate(certificateTransfer.getTemplate().withCertificateType(null))
                .withDates(certificateTransfer.getDates().withCourseNumber(null));

        ResponseStatusException thrown = assertThrows(ResponseStatusException.class, () ->
                certificateService.generateSerialNumber(invalidCertificateTransfer));

        assertThat(thrown.getStatusCode()).isEqualTo(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ParameterizedTest
    @MethodSource("serialNumberSource")
    @DisplayName("Should generate expected serial number for certificate, if it is null")
    void generateSerialNumber(Integer certificateType, String courseNumber, Long maxSerialNumber,
                              Long expectedSerialNumber) {
        certificateTransfer.setSerialNumber(null);
        certificateTransfer.getDates().setCourseNumber(courseNumber);
        certificateTransfer.getTemplate()
                .setCertificateType(CertificateType.builder().codeNumber(certificateType).build());

        when(certificateRepository.findMaxSerialNumber(
                certificateTransfer.getTemplate().getCertificateType().getCodeNumber().toString())).thenReturn(
                maxSerialNumber);

        CertificateTransfer actual = certificateService.generateSerialNumber(certificateTransfer);
        assertEquals(expectedSerialNumber, actual.getSerialNumber());
    }

    @Test
    @DisplayName("Should not generate serial number, if it's not null and return same CertificateTransfer")
    void updateCertificateWithSerialNumberIfItIsNotNull() {
        when(certificateRepository.findById(certificate.getId()))
                .thenReturn(Optional.of(certificate));

        CertificateTransfer actual =
                certificateService.updateCertificateWithSerialNumber(certificate.getId(), certificateTransfer);

        assertEquals(certificateTransfer, actual);
        verify(certificateRepository, never()).save(any(Certificate.class));
    }

    @Test
    @DisplayName("Should update Certificate with serial number, if it is null")
    void updateCertificateWithSerialNumber() {
        certificate.setSerialNumber(null);
        certificateTransfer.setSerialNumber(null);

        when(certificateRepository.findById(certificate.getId()))
                .thenReturn(Optional.of(certificate));
        when(dtoConverter.convertToEntity(certificateTransfer, certificate))
                .thenReturn(certificate);

        certificateService.updateCertificateWithSerialNumber(certificate.getId(), certificateTransfer);

        ArgumentCaptor<Certificate> savedCertificateCaptor = ArgumentCaptor.forClass(Certificate.class);
        verify(certificateRepository, times(1)).save(savedCertificateCaptor.capture());
        verify(dtoConverter).convertToDto(any(), eq(CertificateTransfer.class));
        assertNotNull(savedCertificateCaptor.getValue().getSerialNumber());
    }

    @Test
    @DisplayName("Should return byte array corresponding to expected pdf")
    void getPdfOutput() throws IOException {
        ReflectionTestUtils.setField(qrCodeService, BASE_URL_FIELD, BASE_URL);

        when(certificateContentDecorator.formHours(certificateTransfer.getDates().getHours()))
                .thenReturn(String.valueOf(certificateTransfer.getDates().getHours()));
        when(qrCodeService.getCertificateQrCodeAsStream(certificateTransfer.getSerialNumber()))
                .thenCallRealMethod();
        when(certificateContentDecorator.getRealFilePath(certificateTransfer.getTemplate().getFilePath()))
                .thenCallRealMethod();

        byte[] actual = certificateService.getPdfOutput(certificateTransfer);

        assertThat(actual).isNotEmpty();
    }

    @Test
    @DisplayName("Should throw CertificateGenerationException if cannot generate pdf")
    void getPdfOutputOnException() throws IOException {
        when(certificateContentDecorator.getRealFilePath(certificate.getTemplate().getFilePath()))
                .thenThrow(IOException.class);

        assertThatThrownBy(() -> certificateService.getPdfOutput(certificateTransfer))
                .isInstanceOf(CertificateGenerationException.class);
    }

    @Test
    @DisplayName("Should update sendToEmail and sendStatus of Certificate")
    void updateCertificateEmail() {
        Certificate expected = certificate
                .withSendToEmail(UPDATED_EMAIL)
                .withSendStatus(null);

        when(certificateRepository.findById(certificate.getId()))
                .thenReturn(Optional.of(certificate));
        when(certificateRepository.save(certificate))
                .thenReturn(certificate);

        Certificate actual = certificateService.updateCertificateEmail(certificate.getId(), expected);

        assertEquals(UPDATED_EMAIL, actual.getSendToEmail());
        assertNull(actual.getSendStatus());
    }

    @Test
    @DisplayName("Should update sendStatus of Certificate and set updateStatus LocalDate.now")
    void updateDateAndSendStatus() {
        certificate.setSendStatus(false);
        certificate.setUpdateStatus(LocalDate.now().minusDays(1));

        when(certificateRepository.findById(certificate.getId()))
                .thenReturn(Optional.of(certificate));
        when(certificateRepository.save(certificate))
                .thenReturn(certificate);

        certificateService.updateDateAndSendStatus(certificate.getId(), true);

        assertTrue(certificate.getSendStatus());
        assertEquals(certificate.getUpdateStatus(), LocalDate.now());
    }

    @Test
    @DisplayName("Should save Certificate with updated sendToEmail, userName and set sendStatus nul")
    void updateCertificatePreview() {
        certificatePreview.setSendToEmail(UPDATED_EMAIL);
        certificatePreview.setUserName(UPDATED_NAME);

        when(certificateRepository.findById(certificate.getId()))
                .thenReturn(Optional.of(certificate));

        certificateService.updateCertificatePreview(certificate.getId(), certificatePreview);

        ArgumentCaptor<Certificate> savedCertificateCaptor = ArgumentCaptor.forClass(Certificate.class);
        verify(certificateRepository, times(1)).save(savedCertificateCaptor.capture());

        Certificate savedCertificate = savedCertificateCaptor.getValue();
        assertNull(savedCertificate.getSendStatus());
        assertEquals(UPDATED_EMAIL, savedCertificate.getSendToEmail());
        assertEquals(UPDATED_NAME, savedCertificate.getUserName());
    }

    @Test
    @DisplayName("Should not update sendStatus, if sendToEmail doesn't changed")
    void updateCertificatePreviewIfEmailDoesNotChanged() {
        Boolean expectedSendStatus = true;
        certificate.setSendStatus(expectedSendStatus);
        certificatePreview.setSendToEmail(certificate.getSendToEmail());

        when(certificateRepository.findById(certificate.getId()))
                .thenReturn(Optional.of(certificate));

        certificateService.updateCertificatePreview(certificate.getId(), certificatePreview);

        ArgumentCaptor<Certificate> savedCertificateCaptor = ArgumentCaptor.forClass(Certificate.class);
        verify(certificateRepository, times(1)).save(savedCertificateCaptor.capture());

        Certificate savedCertificate = savedCertificateCaptor.getValue();
        assertTrue(savedCertificate.getSendStatus());
        assertEquals(USER_EMAIL, savedCertificate.getSendToEmail());
    }

    @Test
    @DisplayName("Should throw AccessDeniedException on trying download not own certificate")
    void getPdfOutputForDownloadNotOwnCertificate() {
        when(certificateRepository.findById(certificate.getId()))
                .thenReturn(Optional.of(certificate));

        String email = "foreign@gmail.com";
        Long id = certificate.getId();

        assertThrows(UserPermissionException.class, () ->
                certificateService.getPdfOutputForDownload(email, id));
    }

    @Test
    @DisplayName("Should throw ResponseStatusException with 406 code on download certificate with serial number null")
    void getPdfOutputForDownloadWithSerialNumberNull() {
        certificate.setSerialNumber(null);
        when(certificateRepository.findById(certificate.getId()))
                .thenReturn(Optional.of(certificate));

        String sendToEmail = certificate.getSendToEmail();
        Long id = certificate.getId();

        ResponseStatusException thrown = assertThrows(ResponseStatusException.class, () ->
                certificateService.getPdfOutputForDownload(sendToEmail, id));
        assertThat(thrown.getStatusCode()).isEqualTo(HttpStatus.NOT_ACCEPTABLE);
    }

    @ParameterizedTest
    @MethodSource("provideCertificateForDownload")
    void getPdfOutputForDownloadShouldUpdateSendStatusAndUpdateStatus(Certificate certificate) {
        when(certificateRepository.findById(certificate.getId())).thenReturn(Optional.of(certificate));
        when(dtoConverter.convertToDto(certificate, CertificateTransfer.class))
                .thenReturn(certificateTransfer);
        when(dtoConverter.convertToDto(certificate, CertificateTransfer.class))
                .thenReturn(certificateTransfer);
        doReturn(new byte[] {}).when(certificateService).getPdfOutput(certificateTransfer);

        certificateService.getPdfOutputForDownload(certificate.getSendToEmail(), certificate.getId());

        assertThat(certificate.getSendStatus()).isTrue();
        assertThat(certificate.getUpdateStatus()).isNotNull();
    }

    @Test
    @DisplayName("Should save CertificateArch in database")
    void archiveCertificateModel() {
        when(dtoConverter.convertToDto(certificate, CertificateArch.class))
                .thenReturn(certificateArch);

        certificateService.archiveModel(certificate);
        verify(archiveService).saveModel(certificateArch);
    }

    @Test
    @DisplayName("Should read CertificateArch from JSON string, convert it to Certificate and save in database")
    void restoreCertificateModel() throws JsonProcessingException {
        when(objectMapper.readValue(anyString(), eq(CertificateArch.class)))
                .thenReturn(certificateArch);
        when(dtoConverter.convertToEntity(eq(certificateArch), any(Certificate.class)))
                .thenReturn(certificate);
        when(certificateTemplateService.getTemplateById(certificateArch.getTemplateId()))
                .thenReturn(getCertificateTemplate());
        when(certificateDatesService.getCertificateDatesById(certificateArch.getDatesId()))
                .thenReturn(getCertificateDates());

        certificateService.restoreModel(anyString());
        verify(certificateRepository).save(any(Certificate.class));
    }

    @Test
    @DisplayName("Should throw JsonProcessingException, if JSON string invalid")
    void restoreCertificateModelOnException() throws JsonProcessingException {
        when(objectMapper.readValue(anyString(), eq(CertificateArch.class)))
                .thenThrow(JsonProcessingException.class);

        assertThatThrownBy(() -> certificateService.restoreModel(anyString()))
                .isInstanceOf(JsonProcessingException.class);
        verify(certificateRepository, never()).save(certificate);
    }
}
