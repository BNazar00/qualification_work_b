package com.softserve.commons.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.softserve.commons.util.marker.Convertible;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserPreview implements Convertible {
    private Long id;
    private String firstName;
    private String lastName;
    private String urlLogo;
}
