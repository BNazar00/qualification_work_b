package com.softserve.question.repository;

import com.softserve.question.model.Group;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Provides an interface for managing {@link Group} model.
 */

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    Optional<Group> findByEnrollmentKey(String enrollmentKey);

    @Query("SELECT gt.group FROM GroupTest gt WHERE gt.test.id = :id")
    List<Group> findByTestId(@Param("id") Long id);

    Boolean existsByEnrollmentKey(String enrollmentKey);

    Boolean existsByTitle(String title);
}
