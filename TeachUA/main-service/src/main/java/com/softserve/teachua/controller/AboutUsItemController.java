package com.softserve.teachua.controller;

import com.softserve.commons.constant.RoleData;
import com.softserve.teachua.controller.marker.Api;
import com.softserve.teachua.dto.about_us_item.AboutUsItemProfile;
import com.softserve.teachua.dto.about_us_item.AboutUsItemResponse;
import com.softserve.teachua.dto.about_us_item.NumberDto;
import com.softserve.teachua.service.AboutUsItemService;
import com.softserve.teachua.utils.annotation.AllowedRoles;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This controller is for managing the ABOUT US page.
 */
@Slf4j
@RestController
@Tag(name = "about us", description = "the About Us API")
@SecurityRequirement(name = "api")
@RequestMapping("/api/v1/about")
public class AboutUsItemController implements Api {
    private final AboutUsItemService aboutUsItemService;

    public AboutUsItemController(AboutUsItemService aboutUsItemService) {
        this.aboutUsItemService = aboutUsItemService;
    }

    /**
     * Use this endpoint to get the About us information. The controller returns {@code List<AboutUsItemResponse>}.
     *
     * @return {@code List<AboutUsItemResponse>}.
     */
    @GetMapping
    public List<AboutUsItemResponse> getAboutUsItems() {
        return aboutUsItemService.getListOfAboutUsItemResponses();
    }

    /**
     * Use this endpoint to get the specific About us item. The controller returns {@code AboutUsItemResponse}.
     *
     * @param id
     *            - put About us item id here.
     *
     * @return {@code AboutUsItemResponse}.
     */
    @GetMapping("/{id}")
    public AboutUsItemResponse getAboutUsItems(@PathVariable Long id) {
        return aboutUsItemService.getAboutUsItemResponseById(id);
    }

    /**
     * Use this endpoint to create a specific About us item. The controller returns {@code AboutUsItemResponse}.
     *
     * @param aboutUsItemProfile
     *            - put required parameters here.
     *
     * @return {@code AboutUsItemResponse}.
     */
    @AllowedRoles(RoleData.ADMIN)
    @PostMapping
    public AboutUsItemResponse addAboutUsItem(@Valid @RequestBody AboutUsItemProfile aboutUsItemProfile) {
        return aboutUsItemService.addAboutUsItem(aboutUsItemProfile);
    }

    /**
     * Use this endpoint to update the specific About us item. The controller returns {@code AboutUsItemResponse}.
     *
     * @param id
     *            - put About us item id here.
     * @param aboutUsItemProfile
     *            - put required parameters here.
     *
     * @return {@code AboutUsItemResponse}.
     */
    @AllowedRoles(RoleData.ADMIN)
    @PutMapping("/{id}")
    public AboutUsItemResponse updateAboutUsItem(@PathVariable Long id,
            @Valid @RequestBody AboutUsItemProfile aboutUsItemProfile) {
        return aboutUsItemService.updateAboutUsItem(id, aboutUsItemProfile);
    }

    /**
     * Use this endpoint to archive a specific About us item. The controller returns {@code AboutUsItemResponse}.
     *
     * @param id
     *            - put About us item id here.
     *
     * @return {@code AboutUsItemResponse}.
     */
    @AllowedRoles(RoleData.ADMIN)
    @DeleteMapping("/{id}")
    public AboutUsItemResponse deleteAboutUsItem(@PathVariable Long id) {
        return aboutUsItemService.deleteAboutUsItemById(id);
    }

    /**
     * Use this endpoint to update the order in About us. The controller returns success.
     *
     * @param id
     *            - put About us item id here.
     * @param number
     *            - put number here.
     *
     * @return {@code "success"}.
     */
    @AllowedRoles(RoleData.ADMIN)
    @PatchMapping("/{id}")
    public String changeOrder(@PathVariable Long id, @RequestBody NumberDto number) {
        aboutUsItemService.changeOrder(id, number.getNumber());
        return "success";
    }
}
