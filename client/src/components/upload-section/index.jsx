import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { MdCreateNewFolder } from 'react-icons/md';
import { UploadModal } from '../upload-modal/index';
import './index.scss';

export const UploadSection = ({ file, setFile }) => {
  const [showModal, setShowModal] = useState(false);

  //  UploadModal is shown when the Button is clicked
  const handleModalOpening = () => {
    setShowModal(true);
  };

  return (
    <div className="upload-area">
      <Button
        variant="primary"
        size="lg"
        onClick={handleModalOpening}
        className="upload-btn"
      >
        <div className="upload-btn-txt">
          <MdCreateNewFolder />
          <p>Upload New File</p>
        </div>
      </Button>

      {showModal && (
        <UploadModal
          showModal={showModal}
          setShowModal={setShowModal}
          file={file}
          setFile={setFile}
        />
      )}
    </div>
  );
};
