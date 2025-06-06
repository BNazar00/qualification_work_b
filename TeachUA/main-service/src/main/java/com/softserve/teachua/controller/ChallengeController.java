package com.softserve.teachua.controller;

import com.softserve.commons.constant.RoleData;
import com.softserve.teachua.controller.marker.Api;
import com.softserve.teachua.dto.challenge.ChallengeDeleteResponse;
import com.softserve.teachua.dto.challenge.ChallengePreview;
import com.softserve.teachua.dto.challenge.ChallengeProfile;
import com.softserve.teachua.dto.challenge.CreateChallenge;
import com.softserve.teachua.dto.challenge.SuccessCreatedChallenge;
import com.softserve.teachua.dto.challenge.SuccessUpdateChallengePreview;
import com.softserve.teachua.dto.challenge.SuccessUpdatedChallenge;
import com.softserve.teachua.dto.challenge.UpdateChallenge;
import com.softserve.teachua.dto.challenge.UpdateChallengeDate;
import com.softserve.teachua.dto.task.SuccessUpdatedTask;
import com.softserve.teachua.service.ChallengeService;
import com.softserve.teachua.utils.annotation.AllowedRoles;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * This controller is for managing the challenges.
 */

@RestController
@Tag(name = "challenge", description = "the Challenge API")
@SecurityRequirement(name = "api")
@RequestMapping("/api/v1/challenge")
public class ChallengeController implements Api {
    private final ChallengeService challengeService;

    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    /**
     * Use this endpoint to get all challenges, either active or non-active challenges. The controller returns
     * {@code List<ChallengePreview>}.
     *
     * @param active - Ignore this param to get all challenges, or put true/false to get active or not challenges.
     * @return {@code List<ChallengePreview>}.
     */
    @GetMapping
    public List<ChallengePreview> getAllChallenges(@RequestParam(required = false) Boolean active) {
        return challengeService.getAllChallenges(active);
    }

    /**
     * Use this endpoint to get full information about challenge by its id with tasks that have already begun. Only the
     * admin can get the challenge if it is not active. The controller returns {@code ChallengeProfile}.
     *
     * @param id - put challenge id here.
     * @return {@code ChallengeProfile}.
     */
    @GetMapping("/{id}")
    public ChallengeProfile getChallenge(@PathVariable Long id) {
        return challengeService.getChallenge(id);
    }

    /**
     * Use this endpoint to create new challenge. The controller returns {@code SuccessCreatedChallenge}. This feature
     * available only for admins.
     *
     * @param createChallenge - put required parameters here.
     * @return {@code SuccessCreatedChallenge}.
     */
    @AllowedRoles(RoleData.ADMIN)
    @PostMapping
    public SuccessCreatedChallenge createChallenge(@Valid @RequestBody CreateChallenge createChallenge) {
        return challengeService.createChallenge(createChallenge);
    }

    /**
     * Use this endpoint to update some values of challenge. The controller returns {@code SuccessUpdatedChallenge}.
     * This feature available only for admins.
     *
     * @param id              - put challenge id here.
     * @param updateChallenge - put new and old parameters here.
     * @return {@code SuccessUpdatedChallenge} - shows result of updating challenge.
     */
    @AllowedRoles(RoleData.ADMIN)
    @PutMapping("/{id}")
    public SuccessUpdatedChallenge updateChallenge(@PathVariable Long id,
                                                   @Valid @RequestBody UpdateChallenge updateChallenge) {
        return challengeService.updateChallenge(id, updateChallenge);
    }

    /**
     * Use this endpoint to archive challenge and its tasks. The controller returns {@code ChallengeDeleteResponse}.
     * This feature available only for admins.
     *
     * @param id - put challenge id here.
     * @return {@code ChallengeDeleteResponse} - shows which challenge and tasks was removed.
     */
    @AllowedRoles(RoleData.ADMIN)
    @DeleteMapping("/{id}")
    public ChallengeDeleteResponse deleteChallenge(@PathVariable Long id) {
        return challengeService.deleteChallenge(id);
    }

    /**
     * Use this endpoint to update some values of challenge. The controller returns
     * {@code SuccessUpdateChallengePreview}. This feature available only for admins.
     *
     * @param id                     - put challenge id here.
     * @param updateChallengePreview - put new and old parameters here.
     * @return {@code SuccessUpdateChallengePreview} - shows result of updating challenge.
     */
    @AllowedRoles(RoleData.ADMIN)
    @PatchMapping("/{id}")
    public SuccessUpdateChallengePreview updateChallengePreview(@PathVariable Long id,
                                                                @Valid @RequestBody
                                                                SuccessUpdateChallengePreview updateChallengePreview) {
        return challengeService.updateChallengePreview(id, updateChallengePreview);
    }

    /**
     * Use this endpoint to set new start date of challenge. The controller returns {@code List<SuccessUpdatedTask>}.
     * This feature available only for admins.
     *
     * @param id        - put challenge id here.
     * @param startDate - put new start date here.
     * @return {@code List<SuccessUpdatedTask>} - shows result of updating tasks.
     */
    @AllowedRoles(RoleData.ADMIN)
    @PutMapping("/{id}/clone")
    public List<SuccessUpdatedTask> cloneChallenge(@PathVariable Long id,
                                                   @Valid @RequestBody UpdateChallengeDate startDate) {
        return challengeService.cloneChallenge(id, startDate);
    }
}
