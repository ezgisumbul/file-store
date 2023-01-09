import { useState } from 'react';
import { UploadSection } from '../../components/upload-section';
import { FileList } from '../../components/file-list';

const HomePage = () => {
  const [file, setFile] = useState({
    uploadName: '',
    document: '',
    base64: '',
    url: '',
    name: '',
    type: '',
    dowloadAmount: 0,
    size: 0
  });

  return (
    <div>
      {/* Renders Upload button and UploadModal */}
      <UploadSection file={file} setFile={setFile} />

      <FileList file={file} setFile={setFile} />
    </div>
  );
};

export default HomePage;
