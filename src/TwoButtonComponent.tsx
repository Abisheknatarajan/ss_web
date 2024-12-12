import React from 'react';
import RemoteSystemRegister from './RemoteSystemRegister/RemoteSystemRegister';

const TestEditScreen = () => {
  const initialData = {
    remoteUserName: 'Selva',
    remoteId: 'NH7499',
    id:1
  };

  return (
    <RemoteSystemRegister 
      initialData={initialData}
      mode="edit"
    />
  );
};

export default TestEditScreen;
