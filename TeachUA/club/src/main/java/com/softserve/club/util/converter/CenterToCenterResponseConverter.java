package com.softserve.club.util.converter;

import com.softserve.club.dto.center.CenterResponse;
import com.softserve.club.model.Center;
import com.softserve.commons.util.converter.DtoConverter;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@Data
@EqualsAndHashCode
@Slf4j
@Component
public class CenterToCenterResponseConverter {
    private DtoConverter dtoConverter;
    private ContactsStringConverter contactsStringConverter;

    public CenterToCenterResponseConverter(ContactsStringConverter contactsStringConverter, DtoConverter dtoConverter) {
        this.dtoConverter = dtoConverter;
        this.contactsStringConverter = contactsStringConverter;
    }

    /**
     * The method returns dto {@code CenterResponse} of center and fetch data by contact_type_id from contact_types
     * table from DB to fulfill contact field with consistent data.
     *
     * @param center
     *            - put center .
     *
     * @return new {@code ClubResponse}.
     *
     * @author Vasyl Khula
     */
    public CenterResponse convertToCenterResponse(Center center) {
        CenterResponse centerResponse = dtoConverter.convertToDto(center, CenterResponse.class);
        centerResponse.setContacts(contactsStringConverter.convertStringToContactDataResponses(center.getContacts()));
        return centerResponse;
    }
}
