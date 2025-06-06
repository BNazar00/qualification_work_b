package com.softserve.user.service;

import com.softserve.commons.exception.AlreadyExistException;
import com.softserve.commons.exception.DatabaseRepositoryException;
import com.softserve.commons.exception.NotExistException;
import com.softserve.commons.util.marker.Archiver;
import com.softserve.user.dto.role.RoleProfile;
import com.softserve.user.dto.role.RoleResponse;
import com.softserve.user.model.Role;
import java.util.List;

/**
 * This interface contains all needed methods to manage roles.
 */

public interface RoleService extends Archiver<Integer> {
    /**
     * The method returns list of existing roles {@code List<RoleResponse>}.
     *
     * @return new {@code List<RoleResponse>}
     */
    List<RoleResponse> getListOfRoles();

    /**
     * The method returns role dto {@code RoleResponse}.
     *
     * @return new {@code List<RoleResponse>}
     */
    RoleResponse getRoleProfileById(Integer id);

    /**
     * The method returns {@link Role} by role id.
     *
     * @param id
     *            - put role id.
     *
     * @return new {@code  Role}.
     *
     * @throws NotExistException
     *             if the role doesn't exist.
     */
    Role getRoleById(Integer id);

    /**
     * The method updates existing role by role id.
     *
     * @param id
     *            - put role id.
     * @param roleProfile
     *            - put RoleProfile to updating role
     *
     * @return RoleProfile {@link RoleProfile}.
     *
     * @throws NotExistException
     *             {@link NotExistException} if the role doesn't exist.
     */
    RoleProfile updateRole(Integer id, RoleProfile roleProfile);

    /**
     * The method returns {@link Role} by role name.
     *
     * @param name
     *            - put role name.
     *
     * @return RoleResponse {@link RoleResponse}.
     *
     * @throws NotExistException
     *             {@link NotExistException} if the role doesn't exist.
     */
    Role findByName(String name);

    /**
     * The method adds new role {@link Role}.
     *
     * @param roleProfile
     *            - put RoleProfile to adding new role
     *
     * @return RoleProfile {@link RoleProfile}.
     *
     * @throws AlreadyExistException
     *             {@link AlreadyExistException} if the same role already exists.
     */
    RoleProfile addNewRole(RoleProfile roleProfile);

    /**
     * The method deletes role {@link Role}.
     *
     * @param id
     *            - id of role to delete
     *
     * @return RoleRespone {@link RoleResponse}.
     *
     * @throws NotExistException
     *             {@link NotExistException} if the role doesn't exist.
     * @throws DatabaseRepositoryException
     *             {@link DatabaseRepositoryException} if role has re.
     */
    RoleResponse deleteRoleById(Integer id);
}
