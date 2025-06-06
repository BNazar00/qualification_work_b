package com.softserve.club.service;

import com.softserve.club.dto.club.ClubProfile;
import com.softserve.club.dto.club.ClubResponse;
import com.softserve.club.dto.club.SuccessUpdatedClub;
import com.softserve.club.dto.feedback.FeedbackResponse;
import com.softserve.club.dto.search.AdvancedSearchClubProfile;
import com.softserve.club.dto.search.SearchClubProfile;
import com.softserve.club.dto.search.SearchPossibleResponse;
import com.softserve.club.dto.search.SimilarClubProfile;
import com.softserve.club.dto.search.TopClubProfile;
import com.softserve.club.model.Club;
import com.softserve.commons.exception.AlreadyExistException;
import com.softserve.commons.exception.DatabaseRepositoryException;
import com.softserve.commons.exception.IncorrectInputException;
import com.softserve.commons.exception.NotExistException;
import com.softserve.commons.util.marker.Archiver;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * This interface contains all needed methods to manage clubs.
 */

public interface ClubService extends Archiver<Long> {
    /**
     * The method returns dto {@code ClubResponse} of club by id.
     *
     * @param id - put club id.
     * @return new {@code ClubResponse}.
     */
    ClubResponse getClubProfileById(Long id);

    /**
     * The method returns entity {@code Club} of club by id.
     *
     * @param id - put club id.
     * @return new {@code Club}.
     * @throws NotExistException if club not exists.
     */
    Club getClubById(Long id);

    /**
     * The method gets the clubs information for developers from uploaded excel table.
     */
    Club addClubsFromExcel(ClubProfile clubProfile);

    /**
     * The method returns entity {@code Club} of club by id.
     *
     * @param clubExternalId - put club id.
     * @return new {@code Club}.
     * @throws NotExistException if club not exists.
     */
    List<Club> getClubByClubExternalId(Long clubExternalId);

    /**
     * The method returns entity {@code Club} of club by name.
     *
     * @param name - put club name.
     * @return new {@code Club}.
     * @throws NotExistException if club not exists.
     */
    Club getClubByName(String name);

    /**
     * The method returns dto {@code SuccessUpdatedCLub} of updated club.
     *
     * @param clubProfile - place body of dto {@code ClubProfile}.
     * @return new {@code SuccessUpdatedCLub}.
     * @throws NotExistException if club not exists by id.
     */
    SuccessUpdatedClub updateClub(Long id, ClubResponse clubProfile);

    /**
     * The method returns dto {@code ClubResponse} of club by name.
     *
     * @param name - put club name.
     * @return new {@code ClubResponse}.
     */
    ClubResponse getClubProfileByName(String name);

    /**
     * The method returns dto {@code ClubResponse} of deleted club by id.
     *
     * @param id - put club id.
     * @return new {@code ClubResponse}.
     * @throws DatabaseRepositoryException if club contain foreign keys.
     */
    ClubResponse deleteClubById(Long id);

    /**
     * The method creates a club.
     *
     * @param clubProfile - place dto with all params.
     * @throws AlreadyExistException   if club already exists.
     * @throws IncorrectInputException if mandatory fields are empty.
     */
    void addClub(ClubProfile clubProfile);

    /**
     * The method returns list of dto {@code List<ClubResponse>} of all clubs.
     *
     * @return new {@code List<ClubResponse>}.
     */
    List<ClubResponse> getListOfClubs();

    /**
     * The method returns list of dto {@code List<ClubResponse>} of all clubs that belong to given Center ( center id).
     *
     * @return new {@code List<ClubResponse>}.
     */
    List<ClubResponse> getListOfClubsByCenterId(long centerId);

    /**
     * The method returns list of dto {@code List<ClubResponse>} of clubs by user id.
     *
     * @param id - put user id.
     * @return new {@code List<ClubResponse>}.
     */
    List<ClubResponse> getListClubsByUserId(Long id);

    /**
     * The method returns list of dto {@code Page<ClubResponse>} of all clubs by user-owner.
     *
     * @param id - put user id.
     * @return new {@code Page<ClubResponse>}.
     */
    Page<ClubResponse> getClubsByUserId(Long id, Pageable pageable);

    /**
     * The method returns list of dto {@code List<ClubResponse>} of similar clubs by name.
     *
     * @param similarClubProfile - place dto of {@code SimilarClubProfile}
     * @return new {@code List<ClubResponse>}.
     */
    List<ClubResponse> getSimilarClubsByCategoryName(SimilarClubProfile similarClubProfile);

    /**
     * The method which return possible results of search by entered text.
     *
     * @param searchClubProfile - put text of search (based on clubName, cityName & categoryName)
     * @return {@code Page<ClubResponse>}
     */
    Page<ClubResponse> getClubsBySearchParameters(SearchClubProfile searchClubProfile, Pageable pageable);

    /**
     * The method which return possible results of search by entered text.
     *
     * @param advancedSearchClubProfile - put text of advanced search
     * @return {@code Page<ClubResponse>}
     */
    Page<ClubResponse> getAdvancedSearchClubs(AdvancedSearchClubProfile advancedSearchClubProfile, Pageable pageable);

    /**
     * The method which returns clubs that doesn't have categories.
     *
     * @return {@code Page<ClubResponse>}
     */
    Page<ClubResponse> getClubsWithoutCategories(Pageable pageable);

    /**
     * The method which return possible results of search by entered text.
     *
     * @param text - put text of search (based on clubName & cityName)
     * @return {@code List<SearchPossibleResponse>}
     */
    List<SearchPossibleResponse> getPossibleClubByName(String text, String cityName);

    /**
     * The method which return possible results of search by category and city.
     *
     * @param searchClubProfile - put text of search (based on cityName & categoryName)
     * @return {@code Page<ClubResponse>}
     */
    List<ClubResponse> getClubByCategoryAndCity(SearchClubProfile searchClubProfile);

    /**
     * The method updates contacts of club.
     */
    void updateContacts();

    /**
     * The method changes clubs owner and returns dto {@code ClubResponse} of updated club.
     *
     * @param clubId      - put club id.
     * @param clubOwnerId - place owner id.
     * @return new {@code ClubResponse}.
     */
    ClubResponse changeClubOwner(Long clubId, Long clubOwnerId);

    /**
     * The method updates rating of club and returns dto {@code SuccessUpdatedClub} of updated club.
     *
     * @param feedbackResponse - id of Club to update.
     * @return new {@code SuccessUpdatedClub}.
     */
    SuccessUpdatedClub updateRatingNewFeedback(FeedbackResponse feedbackResponse);

    /**
     * The method updates rating of club and returns dto {@code SuccessUpdatedClub} of updated club.
     *
     * @param previousFeedback - id of Club to update.
     * @param updatedFeedback  - updated feedback.
     * @return new {@code SuccessUpdatedClub}.
     */
    SuccessUpdatedClub updateRatingEditFeedback(FeedbackResponse previousFeedback, FeedbackResponse updatedFeedback);

    /**
     * The method updates rating of club and returns dto {@code SuccessUpdatedClub} of updated club.
     *
     * @return new {@code SuccessUpdatedClub}.
     */
    SuccessUpdatedClub updateRatingDeleteFeedback(FeedbackResponse feedbackResponse);

    /**
     * The method updates rating of all clubs and returns list of dto {@code List<ClubResponse>}.
     *
     * @return new {@code List<CenterResponse>}.
     */
    List<ClubResponse> updateRatingForAllClubs();

    List<ClubResponse> getTopClubsByCity(TopClubProfile topClubProfile);
}
