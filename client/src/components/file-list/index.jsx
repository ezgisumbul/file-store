import React, { useContext } from 'react';
import FileContext from '../../context/file';
import { SingleFile } from '../single-file';
import './index.scss';

export const FileList = () => {
  const { fileList } = useContext(FileContext);

  return (
    <>
      {fileList && (
        <section className="file-list">
          <div className="file-list-header-area">
            <h1>Your files</h1>
          </div>

          <div className="file-list-grid-area">
            {fileList.map((singleFile) => {
              return (
                <SingleFile
                  key={singleFile._id}
                  file={singleFile}
                  className="file-card"
                />
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};
