package com.softserve.club.dto.database_transfer.model;

import com.softserve.commons.util.marker.Convertible;
import com.softserve.commons.util.validation.CheckRussian;
import com.softserve.commons.util.validation.Phone;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CenterExcel implements Convertible {
    private Long centerExternalId;

    @NotBlank
    @Size(min = 5, max = 100, message = "Довжина назви має бути від 5 до 100 символів")
    private String name;

    @CheckRussian
    @NotEmpty
    private String description;

    @Phone
    @NotBlank
    private String phone;

    /**
     * Site field can include social media too.
     */
    private String site;
}
