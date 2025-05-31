import {applyEntity} from "draft-js/lib/DraftModifier";
import {CompositeDecorator, EditorState} from "draft-js";
import React from "react";

export const addLink = (editorState) => {
    const selectionState = editorState.getSelection();
    const link = window.prompt('Paste your link: ');

    if (!link) {
        return false;
    }

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
        url: link,
    });

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const contentStateWithLink = applyEntity(contentStateWithEntity, selectionState, entityKey);
    const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithLink,
        decorator: new CompositeDecorator([
            {
                strategy: findLinkEntities,
                component: Link,
            },
        ])
    });

    return {
        newEditorState: newEditorState,
        entityKey: entityKey
    }
};

const findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
};

const Link = (props) => {
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url} target="_blank">
            {props.children}
        </a>
    );
};