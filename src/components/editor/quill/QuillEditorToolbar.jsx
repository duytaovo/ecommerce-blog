import React from 'react';
import formats from './format';
import { Icon } from '@iconify/react';
import roundUndo from '@iconify/icons-ic/round-undo';
import roundRedo from '@iconify/icons-ic/round-redo';
export const undoChange = () => {
  this.quill.history.undo();
};

export const redoChange = () => {
  this.quill.history.redo();
};

const renderOptions = (formatData) => {
  const { className, options } = formatData;
  return (
    <select className={className}>
      <option selected="selected"></option>
      {options.map((value) => {
        return <option value={value}></option>;
      })}
    </select>
  );
};
const renderSingle = (formatData) => {
  const { className, value } = formatData;
  return <button className={className} value={value}></button>;
};
const EditorToolbar = () => (
  <div id="toolbar">
    {formats.map((classes) => {
      return (
        <span className="ql-formats">
          {classes.map((formatData) => {
            return formatData.options
              ? renderOptions(formatData)
              : renderSingle(formatData);
          })}
        </span>
      );
    })}
    <div className="ql-formats">
      <button type="button" className="ql-undo">
        <Icon icon={roundUndo} width={18} height={18} />
      </button>
      <button type="button" className="ql-redo">
        <Icon icon={roundRedo} width={18} height={18} />
      </button>
    </div>
  </div>
);
export default EditorToolbar;
