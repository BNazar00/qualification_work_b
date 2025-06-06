package com.softserve.club.repository;

import com.softserve.club.model.Center;
import com.softserve.club.model.Club;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    Optional<Club> findById(Long id);

    Optional<Club> findByName(String name);

    List<Club> findAllByOrderByIdAsc();

    List<Club> findClubsByCenterId(long centerId);

    boolean existsByName(String name);

    boolean existsById(Long id);

    List<Club> findAllByUserId(@Param("id") Long id);

    Page<Club> findAllByUserId(Long id, Pageable pageable);

    Page<Club> findAllByCenterId(Long id, Pageable pageable);

    @SuppressWarnings("squid:S107") //Suppressed because of project's business logic.
    @Query("SELECT DISTINCT club from Club AS club " + "JOIN club.categories AS category "
            + "LEFT JOIN club.locations AS locations " + "LEFT JOIN locations.city AS city "
            + "LEFT JOIN locations.district AS district " + "LEFT JOIN locations.station AS station WHERE "
            + "((:city NOT LIKE 'online' AND (:isOnline IS NULL OR club.isOnline = :isOnline) AND city.name = :city) OR"
            + " (:city LIKE 'online' AND club.isOnline = true) OR " + "(:city IS NULL OR city.name = :city)) AND "
            + "(:isOnline is null or club.isOnline=:isOnline) AND "
            + "(:age IS NULL or club.ageFrom <= :age AND club.ageTo >= :age) AND "
            + "(category.name IN (:categories)) AND "
            + "(:district IS NULL OR district.name = :district) AND " + "(:name IS NULL OR "
            + "LOWER(club.name) LIKE LOWER(CONCAT('%', :name , '%')) OR "
            + "LOWER(club.description) LIKE LOWER(CONCAT('%', :name , '%'))) AND "
            + "(:station IS NULL OR station.name = :station)")
    Page<Club> findAllBylAdvancedSearch(@Param("name") String name, @Param("age") Integer age,
                                        @Param("city") String cityName, @Param("district") String districtName,
                                        @Param("station") String stationName,
                                        @Param("categories") List<String> categoriesName,
                                        @Param("isOnline") Boolean isOnline, Pageable pageable);

    @Query(value = "SELECT DISTINCT club from Club AS club " + "LEFT JOIN club.locations AS locations "
            + "LEFT JOIN locations.city AS city " + "LEFT JOIN club.categories AS category WHERE " // Join
            + "(:name IS NULL OR " + "LOWER(club.name) LIKE LOWER(CONCAT('%', :name , '%')) OR "
            + "LOWER(club.description) LIKE LOWER(CONCAT('%', :name , '%'))) AND "
            + "(((:isOnline = false OR :isOnline IS NULL) AND city.name = :city ) OR "
            + "(:isOnline = true AND club.isOnline = true AND city IS NULL) OR "
            + "(:isOnline IS NULL AND :city IS NULL)) AND "
            + "(:category IS NULL OR LOWER(category.name) LIKE LOWER(CONCAT('%', :category ,'%')))")
    Page<Club> findAllByParameters(@Param("name") String name, @Param("city") String cityName,
                                   @Param("category") String categoryName, @Param("isOnline") Boolean isOnline,
                                   Pageable pageable);

    @Query(value = "SELECT DISTINCT club from Club AS club " + "JOIN club.locations AS locations "
            + "JOIN club.categories AS category WHERE "
            + "LOWER(category.name) LIKE LOWER(CONCAT('%', :category ,'%')) AND " + "locations.city.name = :city")
    Page<Club> findAllByCategoryNameAndCity(@Param("category") String categoryName, @Param("city") String cityName,
                                            Pageable pageable);

    @Query("SELECT DISTINCT club from Club AS club " + "JOIN club.locations AS locations "
            + "JOIN club.categories AS category WHERE " + "locations.city.name LIKE CONCAT('%', :city , '%') AND "
            + "LOWER(category.name) LIKE LOWER(CONCAT('%', :category ,'%'))")
    List<Club> findAllClubsByParameters(@Param("city") String cityName, @Param("category") String categoryName);

    @Query("SELECT c FROM Club AS c " + "JOIN c.locations AS locations "
            + "WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :text ,'%')) AND " + "locations.city.name = :city")
    Page<Club> findTop3ByName(@Param("text") String text, @Param("city") String cityName, Pageable pageable);

    @Query("select center.clubs from Center as center " + "join center.locations AS locations "
            + " where (lower (center.name)) LIKE lower (concat('%', :centerName , '%')) or "
            + " lower (center.description) LIKE lower (concat('%', :centerName , '%'))  and "
            + " locations.city.name = :cityName")
    Page<Club> findClubsByCenterName(@Param("centerName") String centerName, @Param("cityName") String cityName,
                                     Pageable pageable);

    @Query("SELECT DISTINCT club from Club AS club " + "JOIN club.locations AS locations "
            + "JOIN club.categories AS category WHERE " + "category.name IN (:categoriesName) AND "
            + "locations.city.name = :cityName " + "AND club.id <> :id")
    Page<Club> findByCategoriesNames(@Param("id") Long id, @Param("categoriesName") List<String> categoriesName,
                                     @Param("cityName") String cityName, Pageable pageable);

    @Modifying
    @Query(value = "UPDATE Club SET rating=:rating, feedbackCount = :feedbackCount WHERE id = :clubId")
    void updateRating(@Param("clubId") Long clubId, @Param("rating") double rating,
                      @Param("feedbackCount") Long feedbackCount);

    List<Club> findClubByClubExternalId(Long id);

    List<Club> findClubsByCenter(Center center);

    @Query("SELECT case  when (AVG(club.rating)) is null then 0.0 else AVG(club.rating)  end FROM Club AS club"
            + " WHERE club.center.id = :centerId and club.feedbackCount > 0")
    Double findAvgRating(@Param("centerId") Long centerId);

    @Query(value = """
            SELECT c.* from club.clubs as c left join club.locations as l on l.club_id = c.id
            left join club.cities as ct on ct.id = l.city_id
            where ct.name = :city order by c.rating desc limit :amount
            """, nativeQuery = true)
    List<Club> findTopClubsByCity(@Param("city") String cityName, @Param("amount") int amount);

    @Query(value = "SELECT club from Club as club LEFT JOIN club.categories as categories WHERE categories.id is NULL")
    Page<Club> findAllWithoutCategories(Pageable pageable);
}
