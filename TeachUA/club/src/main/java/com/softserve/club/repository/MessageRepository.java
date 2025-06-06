package com.softserve.club.repository;

import com.softserve.club.model.Message;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Provides an interface to manage {@link Message} model.
 */
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    Optional<List<Message>> findAllBySenderIdOrderByDateDesc(Long id);

    Optional<List<Message>> findAllByRecipientIdOrderByDateDesc(Long id);
}
