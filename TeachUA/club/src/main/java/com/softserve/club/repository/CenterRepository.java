package com.softserve.club.repository;

import com.softserve.club.model.Center;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CenterRepository extends JpaRepository<Center, Long> {
    Optional<Center> findByName(String name);

    Optional<Center> findById(Long id);

    boolean existsByName(String name);

    Page<Center> findAllByUserId(Long id, Pageable pageable);

    @Query("SELECT DISTINCT center from Center AS center " + "LEFT JOIN center.locations AS locations "
            + "LEFT JOIN locations.city AS city " + "LEFT JOIN locations.district AS district "
            + "LEFT JOIN locations.station AS station WHERE " + "(:city IS NULL OR city.name = :city) AND "
            + "(:district IS NULL OR district.name = :district) AND " + "(:station IS NULL OR station.name = :station)")
    Page<Center> findAllBylAdvancedSearch(@Param("city") String cityName, @Param("district") String districtName,
                                          @Param("station") String stationName, Pageable pageable);

    Center findCenterByCenterExternalId(Long id);

    @Modifying
    @Query(value = "UPDATE Center SET rating=:rating, clubCount = :club_count WHERE id = :center_id")
    void updateRating(@Param("center_id") Long centerId, @Param("rating") double rating,
                      @Param("club_count") Long clubCount);
}
