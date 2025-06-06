package com.softserve.teachua.controller;

import com.softserve.commons.constant.RoleData;
import com.softserve.teachua.controller.marker.Api;
import com.softserve.teachua.dto.task.CreateTask;
import com.softserve.teachua.dto.task.SuccessCreatedTask;
import com.softserve.teachua.dto.task.SuccessUpdatedTask;
import com.softserve.teachua.dto.task.TaskPreview;
import com.softserve.teachua.dto.task.TaskProfile;
import com.softserve.teachua.dto.task.UpdateTask;
import com.softserve.teachua.service.TaskService;
import com.softserve.teachua.utils.annotation.AllowedRoles;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * This controller is for managing the tasks.
 */
@RestController
@Slf4j
@Tag(name = "task", description = "the Task API")
@SecurityRequirement(name = "api")
@RequestMapping("/api/v1/challenge/task")
public class TaskController implements Api {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    /**
     * Use this endpoint to get all tasks of challenge, including tasks that have not yet begun. This feature available
     * only for admins. The controller returns {@code List<TaskPreview>}.
     *
     * @param id
     *            - put challenge id here.
     *
     * @return {@code List<TaskPreview>}.
     */
    @AllowedRoles(RoleData.ADMIN)
    @GetMapping(params = {"challengeId"})
    public List<TaskPreview> getTasksByChallenge(@RequestParam("challengeId") Long id) {
        return taskService.getTasksByChallengeId(id);
    }

    /**
     * Use this endpoint to get all tasks despite challenge. The controller returns {@code List <TaskPreview>}.
     *
     * @return new {@code List<TaskPreview>}
     */
    @AllowedRoles(RoleData.ADMIN)
    @GetMapping
    public List<TaskPreview> getTasks() {
        return taskService.getListOfTasks();
    }

    /**
     * Use this endpoint to get full information about task. The controller returns {@code TaskProfile}.
     *
     * @param id
     *            - put task id here.
     *
     * @return {@code TaskProfile}
     */
    @GetMapping("/{id}")
    public TaskProfile getTask(@PathVariable("id") Long id) {
        return taskService.getTask(id);
    }

    /**
     * Use this endpoint to create and add new task to challenge. This feature available only for admins. The controller
     * returns {@code SuccessCreatedTask}.
     *
     * @param id
     *            - put challenge id here.
     * @param createTask
     *            - put required parameters here.
     *
     * @return {@code SuccessCreatedTask}
     */
    @AllowedRoles(RoleData.ADMIN)
    @PostMapping(params = {"challengeId"})
    public SuccessCreatedTask createTask(@RequestParam("challengeId") Long id,
                                         @Valid @RequestBody CreateTask createTask) {
        return taskService.createTask(id, createTask);
    }

    /**
     * Use this endpoint to update some values of task, including the id of the challenge to which it is linked. This
     * feature available only for admins. The controller returns {@code SuccessUpdatedTask}.
     *
     * @param id
     *            - put task id here.
     * @param updateTask
     *            - put new and old parameters here.
     *
     * @return {@code SuccessUpdatedTask} - shows result of updating task.
     */
    @AllowedRoles(RoleData.ADMIN)
    @PutMapping("/{id}")
    public SuccessUpdatedTask updateTask(@PathVariable Long id, @Valid @RequestBody UpdateTask updateTask) {
        return taskService.updateTask(id, updateTask);
    }

    /**
     * Use this endpoint to archive task. This feature available only for admins. The controller returns
     * {@code TaskProfile}.
     *
     * @param id
     *            - put task id here.
     *
     * @return {@code TaskProfile} - shows which task was removed.
     */
    @AllowedRoles(RoleData.ADMIN)
    @DeleteMapping("/{id}")
    public TaskProfile deleteTask(@PathVariable Long id) {
        return taskService.deleteTask(id);
    }
}
