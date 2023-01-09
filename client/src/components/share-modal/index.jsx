import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import './index.scss';

export const ShareModal = ({ file, setIsShareModalOpen }) => {
  // Clicking on close button will hide the ShareModal view
  const handleHideModal = () => {
    setIsShareModalOpen(false);
  };

  const handleLinkCopy = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(file.url);
  };

  return (
    <div
      className="modal show modal-view"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog className="movel-view">
        <Modal.Header>
          <Modal.Title>Share {file.name}</Modal.Title>
          <CloseButton onClick={handleHideModal} />
        </Modal.Header>

        <Modal.Body>
          <form className="modal-form">
            <input type="text" defaultValue={file.url} />
            <Button onClick={handleLinkCopy}>Copy</Button>
          </form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};
