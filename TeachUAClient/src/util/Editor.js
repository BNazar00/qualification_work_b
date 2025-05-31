import React from "react";
import ReactQuill from 'react-quill';
import {BASE_URL} from "../service/config/ApiConfig";
import {uploadImage} from "../service/UploadService";


class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    imageHandler = () => {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const folder = 'challenges';
            console.log('User trying to uplaod this:', file);

            const id = await uploadImage(file, folder);
            const range = this.quill.getEditor().getSelection();
            const link = `${id}`;
            this.quill.getEditor().insertEmbed(range.index, 'image', `${BASE_URL}` + link);
        }
    }

    handleOnChange(html) {
        const { onChange } = this.props;
        onChange(html);
    }

    handleOnBlur(range, source, quill) {
        const { onBlur } = this.props;

        if (source === 'user') {
            onBlur(quill.getHTML());
        }
    }

    render() {
        const { value } = this.props;
        const modules = {
            toolbar: {
                container: [
                    [{header: [1, 2, 3, 4, 5, 6, 'normal']}],
                    [{size: []}],
                    [{align: []}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [
                        {list: 'ordered'},
                        {list: 'bullet'},
                        {indent: '-1'},
                        {indent: '+1'},
                    ],
                    ['link', 'video', 'image', 'clean'],
                ],
                handlers: {
                    image: this.imageHandler
                },
            },
        };

        return (
            <div>
            <ReactQuill
                value={value || ''}
                onChange={this.handleOnChange}
                modules={modules}
                ref={(el) => this.quill = el}
                theme="snow">
            </ReactQuill>
            </div>
        );
    }
}

export default Editor;