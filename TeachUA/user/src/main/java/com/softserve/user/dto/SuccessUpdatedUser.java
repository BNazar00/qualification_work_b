package com.softserve.user.dto;

import com.softserve.commons.util.marker.Convertible;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class SuccessUpdatedUser implements Convertible {
    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String roleName;
    private String urlLogo;
    private String status;
}
