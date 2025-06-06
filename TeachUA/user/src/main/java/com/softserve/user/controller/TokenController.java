package com.softserve.user.controller;

import com.softserve.commons.exception.UserPermissionException;
import com.softserve.user.dto.security.RefreshTokenRequest;
import com.softserve.user.dto.security.RefreshTokenResponse;
import com.softserve.user.security.HttpSessionBean;
import com.softserve.user.service.RefreshTokenService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/v1/jwt")
public class TokenController {
    private final RefreshTokenService refreshTokenService;
    private final HttpSessionBean httpSessionBean;

    public TokenController(RefreshTokenService refreshTokenService, HttpSessionBean httpSessionBean) {
        this.refreshTokenService = refreshTokenService;
        this.httpSessionBean = httpSessionBean;
    }

    @GetMapping
    public void saveJwt(@RequestHeader("jwt") String jwt) {
        if (StringUtils.isEmpty(jwt)) {
            throw new IllegalArgumentException();
        }
        httpSessionBean.setJwt(jwt);
        System.out.println("set header jwt " + jwt);
    }

    @GetMapping("/admin")
    public void authorizeAdmin() {
        //todo
        System.out.println("get jwt " + httpSessionBean.getJwt());
        if (StringUtils.isEmpty(httpSessionBean.getJwt())) {
            throw new UserPermissionException();
        }
    }

    /**
     * The endpoint returns dto {@code RefreshTokenResponse} with access and refresh token.
     * Refresh token from request will be revoked.
     *
     * @param request {@code RefreshTokenRequest}.
     * @return new {@code SuccessLogin}.
     */
    @PreAuthorize("!isAuthenticated()")
    @PostMapping("/refresh")
    public RefreshTokenResponse refreshAccessToken(@Valid @RequestBody RefreshTokenRequest request) {
        log.info("Refresh token request");
        return refreshTokenService.refreshAccessToken(request.getRefreshToken());
    }

    /**
     * The endpoint revokes requested refresh token.
     *
     * @param request {@code RefreshTokenRequest}.
     */
    @PreAuthorize("!isAuthenticated()")
    @PostMapping("/revoke")
    public void revokeRefreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        refreshTokenService.revokeRefreshToken(request.getRefreshToken());
    }
}
