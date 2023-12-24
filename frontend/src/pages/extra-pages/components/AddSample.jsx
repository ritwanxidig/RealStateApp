import React from 'react';
import { Modal } from 'antd';

const AddSample = ({ onOpen, setOnOpen }) => {
  return (
    <div>
      <Modal title="Basic Modal" open={onOpen} onCancel={() => setOnOpen(false)}></Modal>
    </div>
  );
};

export default AddSample;
