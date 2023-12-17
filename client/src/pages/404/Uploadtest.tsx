import { useEffect, useState } from 'react';
import useDrivePicker from 'react-google-drive-picker'



const Uploadtest = () => {
    const [uploadedFileUrl, setUploadedFileUrl] = useState('');
    const [openPicker, authResponse] = useDrivePicker();
    // const customViewsArray = [new google.picker.DocsView()]; // custom view
    const handleOpenPicker = () => {
        openPicker({
            clientId: "1010783738532-3s27nq10o6belplvsp6omrcvcsqfigjt.apps.googleusercontent.com",
            developerKey: "AIzaSyABKJezgqFMe3mkchPJejZuK005AbP2Cgc",
            viewId: "DOCS",
            token: "ya29.a0AfB_byB7EnGMbpE4iL4cM2LyKuQSTkeBhXMWvuOaBfQ_PAPwvXMyYfVxStIg-LcnTx1-fEuRbyhhr7CVrArEZfT780QaYliLDlt38I8qBvsUyIa16A8p9AxZP_8RKm3hQyciVwSxZmvNVPhDaZ8XbYSvxuKIH0nGACsVaCgYKAagSARMSFQHGX2MiYtvwIl3Xc6LlsHhA-aD3jg0171",
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            // customViews: customViewsArray, // custom view
            callbackFunction: (data) => {
                if (data.action === 'cancel') {
                    console.log('Người dùng đã nhấp vào nút hủy/bỏ');
                } else {
                    console.log(data);
                    const selectedFiles = data.docs; // Mảng các tệp đã chọn
                    // Lấy URL của tệp tin đầu tiên (nếu có)
                    const firstFileUrl = selectedFiles.length > 0 ? selectedFiles[0].url : '';
                    setUploadedFileUrl(firstFileUrl);
                    // Thực hiện các hành động khác nếu cần
                }
            },
        })
    }



    return (
        <div>
            <button onClick={() => handleOpenPicker()}>Open Picker</button>
            {uploadedFileUrl && (
                <p>URL của tệp tin đã tải lên: {uploadedFileUrl}</p>
            )}
        </div>
    );
}

export default Uploadtest;
function uploadToGoogleDrive(selectedFiles: import("react-google-drive-picker/dist/typeDefs").CallbackDoc[]) {
    throw new Error('Function not implemented.');
}

