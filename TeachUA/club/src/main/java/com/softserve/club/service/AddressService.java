package com.softserve.club.service;

import com.softserve.club.dto.location.AddressProfile;
import java.util.List;

public interface AddressService {
    List<AddressProfile> getNotRelativeAddress();

    List<AddressProfile> replaceAllIncorrectCity(List<AddressProfile> addressProfileList);
}
