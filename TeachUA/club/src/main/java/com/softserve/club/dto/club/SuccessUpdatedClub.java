package com.softserve.club.dto.club;

import com.softserve.club.dto.center.CenterForClub;
import com.softserve.club.dto.contact_data.ContactDataResponse;
import com.softserve.club.dto.location.LocationProfile;
import com.softserve.club.model.Category;
import com.softserve.club.model.GalleryPhoto;
import com.softserve.commons.dto.UserPreview;
import com.softserve.commons.util.marker.Convertible;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class SuccessUpdatedClub implements Convertible {
    private Long id;
    private Integer ageFrom;
    private Integer ageTo;
    private String name;
    private String description;
    private String urlWeb;
    private String urlLogo;
    private String urlBackground;
    private List<GalleryPhoto> urlGallery;
    private String workTime;
    private Set<Category> categories;
    private UserPreview user;
    private CenterForClub center;
    private Double rating;
    private Set<LocationProfile> locations;
    private Boolean isApproved;
    private Boolean isOnline;
    private Long feedbackCount;
    private Set<ContactDataResponse> contacts;
}
