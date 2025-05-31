import { getFilesWithPath, readFileWithPath, deleteFileWithPath, downloadFileByPath } from '../../../service/FileService';
import { FileList } from "./FileList";

import './css/FileList.css';

export const AllFileList = () => {

    const allowedDeleteRoot = 'upload';

    const downloadFile = (filePath) => {
        const path = filePath.substring(0, filePath.lastIndexOf('/'));
        const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
        downloadFileByPath(path, fileName);
    }

    return (
        <FileList 
            getFiles={getFilesWithPath} 
            onFileRead={readFileWithPath} 
            onDelete={deleteFileWithPath} 
            onDownload={downloadFile} 
            usePath={true} 
            allowedDeleteRoot={allowedDeleteRoot} />
    )
}
