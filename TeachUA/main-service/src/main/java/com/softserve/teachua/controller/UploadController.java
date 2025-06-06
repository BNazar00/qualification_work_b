package com.softserve.teachua.controller;

import com.softserve.teachua.controller.marker.Api;
import com.softserve.teachua.service.impl.FileUploadServiceImpl;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

//todo
/**
 * This controller is for managing the upload process.
 */
@RestController
@Tag(name = "upload", description = "the Image Upload API")
@SecurityRequirement(name = "api")
@RequestMapping("/api/v1/main-service")
public class UploadController implements Api {
    @Value("${application.upload.path}")
    private String uploadDirectory;
    private final FileUploadServiceImpl fileUploadServiceImpl;

    public UploadController(FileUploadServiceImpl fileUploadServiceImpl) {
        this.fileUploadServiceImpl = fileUploadServiceImpl;
    }

    /**
     * Use this endpoint to create an image. The controller returns image and folder names.
     *
     * @param folder
     *            - folder name.
     * @param image
     *            - image title.
     *
     * @return new {@code uploadPhoto}.
     */
    //@PreAuthorize("isAuthenticated()")
    @PostMapping("/upload-image")
    //@CrossOrigin
    public String uploadPhoto(@RequestParam("image") MultipartFile image, @RequestParam("folder") String folder) {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(image.getOriginalFilename()));
        String uploadDir = String.format("%s/%s", uploadDirectory, folder);

        return fileUploadServiceImpl.uploadImage(uploadDir, fileName, image);
    }

    /**
     * Use this endpoint to delete an image.
     *
     * @param filePath
     *            - file path.
     *
     * @return new {@code deleteFile}.
     */
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/delete-file")
    public String deleteFile(@RequestParam("filePath") String filePath) {
        fileUploadServiceImpl.deleteFile(filePath);
        return filePath + " successfully deleted.";
    }

    @GetMapping("/check")
    public void check() {
    }
}
