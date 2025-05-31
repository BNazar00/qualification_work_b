import { getUnusedFiles, readFileWithPath, deleteFileWithPath, downloadFileByPath } from '../../../service/FileService';
import { FileList } from "./FileList";

import './css/FileList.css';

export const UnusedFileList = () => {

    const removeLeadingSlash = (filePath) => {
        return filePath.substring(1);
    }

    const readFile = (filePath) => {
        return readFileWithPath(removeLeadingSlash(filePath));
    }

    const deleteFile = (filePath) => {
        return deleteFileWithPath(removeLeadingSlash(filePath));
    }

    const downloadFile = (filePath) => {
        const path = filePath.substring(0, filePath.lastIndexOf('/'));
        const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
        downloadFileByPath(path.substring(1), fileName);
    }


    return (
        <FileList 
            getFiles={getUnusedFiles} 
            onFileRead={readFile} 
            onDelete={deleteFile} 
            onDownload={downloadFile} 
            usePath={false} />
    )
}
