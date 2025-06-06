package com.softserve.club.controller;

import com.softserve.club.controller.marker.Api;
import com.softserve.club.dto.message.MessageProfile;
import com.softserve.club.dto.message.MessageResponseDto;
import com.softserve.club.dto.message.MessageUpdateIsActive;
import com.softserve.club.dto.message.MessageUpdateText;
import com.softserve.club.service.MessageService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/club/participant/message")
public class MessageController implements Api {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    /**
     * Use this endpoint to create a new Message. The controller returns {@link MessageResponseDto}.
     *
     * @param messageProfile put {@code MessageProfile} dto here.
     * @return {@code MessageResponseDto}.
     */
    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public MessageResponseDto addMessage(@Valid @RequestBody MessageProfile messageProfile) {
        return messageService.addMessage(messageProfile);
    }

    /**
     * Use this endpoint to get Message by id. The controller returns {@link MessageResponseDto}.
     *
     * @param id put {@code Message} id here.
     * @return {@code MessageResponseDto}.
     */
    @PreAuthorize("isAuthenticated() and "
            + "authentication.principal.id == @messageServiceImpl.getMessageById(#id).sender.id or "
            + "authentication.principal.id == @messageServiceImpl.getMessageById(#id).recipient.id")
    @GetMapping("/{id}")
    public MessageResponseDto getMessageById(@PathVariable Long id) {
        return messageService.getMessageResponseById(id);
    }

    /**
     * Use this endpoint to get MessageResponses by sender id. The controller returns {@code List<MessageResponseDto>}.
     *
     * @param id put {@code User} sender id here.
     * @return {@code List<MessageResponseDto>}.
     */
    @PreAuthorize("isAuthenticated() and authentication.principal.id = #id")
    @GetMapping("/sender/{id}")
    public List<MessageResponseDto> getMessagesBySenderId(@PathVariable Long id) {
        return messageService.getMessageResponsesByUserId(id, true);
    }

    /**
     * Use this endpoint to get MessageResponses by recipient id. The controller returns
     * {@code List<MessageResponseDto>}.
     *
     * @param id put {@code User} recipient id here.
     * @return {@code List<MessageResponseDto>}.
     */
    @PreAuthorize("isAuthenticated() and authentication.principal.id == #id")
    @GetMapping(params = {"recipientId"})
    public List<MessageResponseDto> getMessagesByRecipientId(@RequestParam("recipientId") Long id) {
        return messageService.getMessageResponsesByUserId(id, false);
    }

    /**
     * Use this endpoint to update Message text by id. The controller returns {@code MessageResponseDto}.
     *
     * @param id         put {@code Message} id here.
     * @param updateText put {@code MessageUpdateText} dto here.
     * @return {@code MessageResponseDto}.
     */
    @PreAuthorize("isAuthenticated() and "
            + "authentication.principal.id == @messageServiceImpl.getMessageById(#id).sender.id")
    @PutMapping("/text/{id}")
    public MessageResponseDto updateMessageTextById(@PathVariable Long id,
                                                    @Valid @RequestBody MessageUpdateText updateText) {
        return messageService.updateMessageTextById(id, updateText);
    }

    /**
     * Use this endpoint to update Message isActive by id. The controller returns {@code MessageResponseDto}.
     *
     * @param id             put {@code Message} id here.
     * @param updateIsActive put {@code MessageUpdateIsActive} dto here.
     * @return {@code MessageResponseDto}.
     */
    @PreAuthorize("isAuthenticated() and "
            + "authentication.principal.id == @messageServiceImpl.getMessageById(#id).recipient.id")
    @PutMapping("/active/{id}")
    public MessageResponseDto updateMessageIsActiveById(@PathVariable Long id,
                                                        @Valid @RequestBody MessageUpdateIsActive updateIsActive) {
        return messageService.updateMessageIsActiveById(id, updateIsActive);
    }

    /**
     * Use this endpoint to delete Message by id. The controller returns {@code MessageResponseDto}.
     *
     * @param id - put {@code Message} id here.
     * @return {@code MessageResponseDto}.
     */
    @PreAuthorize("isAuthenticated() and "
            + "authentication.principal.id == @messageServiceImpl.getMessageById(#id).sender.id or "
            + "hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public MessageResponseDto deleteMessageById(@PathVariable Long id) {
        return messageService.deleteMessageById(id);
    }
}
