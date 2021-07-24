/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import marked from 'marked';
import { ipcRenderer } from 'electron';

const Md2Html = () => {
  const [md, setMd] = useState('# Hello\n> This is a quote');
  const [preview, setPreview] = useState(false);
  const [opening, setOpening] = useState(false);

  const handleChange = (evt: { target: { value: string } }) =>
    setMd(evt.target.value);

  const handleOpen = async () => {
    setOpening(true);
    const filters = [
      { name: 'Markdown Files', extensions: ['md', 'markdown', 'txt'] },
    ];
    const content = await ipcRenderer.invoke('open-file', filters);
    setMd(content);
    setOpening(false);
  };

  return (
    <div className="min-h-full flex flex-col">
      <div className="flex justify-between mb-1">
        <button
          type="button"
          className="btn"
          onClick={handleOpen}
          disabled={opening}
        >
          Open...
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => setPreview(!preview)}
        >
          {preview ? 'Raw HTML' : 'Preview'}
        </button>
      </div>
      <div className="flex min-h-full flex-1">
        <textarea
          onChange={handleChange}
          className="flex-1 min-h-full bg-white p-4 rounded-md"
          value={md}
          disabled={opening}
        />
        <div className="mx-1" />
        {preview ? (
          <section
            className="flex-1 min-h-full bg-blue-50 p-4 prose rounded-md"
            dangerouslySetInnerHTML={{ __html: marked(md) }}
          />
        ) : (
          <textarea
            className="flex-1 min-h-full bg-blue-100 p-4 rounded-md"
            value={marked(md)}
            disabled
          />
        )}
      </div>
    </div>
  );
};

export default Md2Html;
