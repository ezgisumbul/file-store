import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import { fileCreate, loadFiles } from '../../services/api';
import { useContext } from 'react';
import FileContext from '../../context/file';

export const UploadModal = ({ setShowModal, file, setFile }) => {
  const { setFileList } = useContext(FileContext);

  // Close button hides the UploadModal
  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleUploadFile = (event) => {
    event.preventDefault();
    setShowModal(false);

    fileCreate(file).then(() => {
      // Once the new file is uploaded, fileList is
      // set again for re-rendering
      loadFiles().then((files) => {
        setFileList(files.data);
      });
    });
  };

  const handleFileChange = (event) => {
    // extract base64 file data
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = () => {
      // once the file in input field changes, the file state is updated
      setFile({
        ...file,
        // uploadName is updated in the backend when the file is uploaded to the server
        uploadName: '',
        document: event.target.files[0],
        base64: reader.result,
        // url is updated in the backend when the file is uploaded to the cloud
        url: '',
        name: event.target.files[0].name,
        type: event.target.files[0].type,
        // downloadAmount is updated only when the Download button in SingleFile is clicked
        dowloadAmount: 0,
        // display the size in MB
        size: (event.target.files[0].size / 1000000).toFixed(2)
      });
    };
  };

  return (
    <div className="modal" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Upload new file</Modal.Title>
          <CloseButton onClick={handleHideModal} />
        </Modal.Header>

        <Modal.Body>
          <form
            onSubmit={handleUploadFile}
            // "multipart/form-data" allows to extract req.file in the backend
            encType="multipart/form-data"
            method="POST"
            action="/"
          >
            <input
              id="input-file"
              type="file"
              name="document"
              onChange={handleFileChange}
              accept=".pdf, .txt, .xlsx, .docx, image/*"
              // multiple
            />

            <Modal.Footer>
              <Button
                as="input"
                type="submit"
                value="Upload"
                variant="primary"
              />
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};
