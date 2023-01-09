import { useState } from 'react';

import { ShareModal } from '../share-modal';
import { GrImage } from 'react-icons/gr';
import { GrDocumentPdf } from 'react-icons/gr';
import { GrDocumentTxt } from 'react-icons/gr';
import { GrDocumentWord } from 'react-icons/gr';
import { GrDocumentExcel } from 'react-icons/gr';
import Button from 'react-bootstrap/Button';
import './index.scss';
import { logDownloadCount } from '../../services/api';

export const SingleFile = ({ file }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [count, setCount] = useState(file.dowloadAmount);

  // date formating options
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  const formateDate = (date) => new Date(date).toLocaleString('en-GB', options);

  // download count is calculated through download button clicks
  const handleDownloadCount = () => {
    let newCount = count + 1;
    setCount(newCount);
    // updates the downloadAmound in the backend
    logDownloadCount(file._id, newCount);
  };

  const handleLinkShare = () => {
    setIsShareModalOpen(!isShareModalOpen);
  };

  return (
    <div className="file-card">
      <div className="file-preview">
        {/* object is used to display content of files as a preview image */}
        {file.type.includes('.document') ||
          (file.type.includes('.sheet') && <img src="/file.png" alt="" />)}
        <object data={file.base64} aria-label="Alternative Text"></object>
      </div>

      <div className="file-name-icon">
        {/* icons are rendered based on file type */}
        {file.type.includes('image') && <GrImage className="icon" />}
        {file.type.includes('pdf') && <GrDocumentPdf className="icon" />}
        {file.type.includes('plain') && <GrDocumentTxt className="icon" />}
        {file.type.includes('.sheet') && <GrDocumentExcel className="icon" />}
        {file.type.includes('.document') && <GrDocumentWord className="icon" />}
        <p>{file.name}</p>
      </div>

      <div className="file-footer">
        <div className="file-details">
          <p>Uploaded on {formateDate(file.createdAt)}</p>
          <p> Downloads: {count}</p>
        </div>

        <div className="file-buttons">
          <form>
            <Button
              href={file.base64}
              download={file.name}
              onClick={handleDownloadCount}
            >
              Download
            </Button>
          </form>
          <Button onClick={handleLinkShare}>Share</Button>
        </div>

        {isShareModalOpen && (
          <ShareModal
            file={file}
            isShareModalOpen={isShareModalOpen}
            setIsShareModalOpen={setIsShareModalOpen}
          />
        )}
      </div>
    </div>
  );
};
