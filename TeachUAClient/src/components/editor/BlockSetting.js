export const getBlockStyle = (block) => {
    switch (block.getType()) {
        case 'left':
            return 'align-left';
        case 'center':
            return 'align-center';
        case 'right':
            return 'align-right';
        case 'blockquote':
            return 'editor-blockquote';

        default:
            return null;
    }
};

export const convertToHtmlOptions = {
    blockStyleFn: (entity) => {
        const entityType = entity.getType();
        switch (entityType) {
            case "center":
                return {
                    style: {
                        textAlign: 'center'
                    },
                };
            case "right":
                return {
                    style: {
                        textAlign: 'right'
                    },
                };
        }
    }
};