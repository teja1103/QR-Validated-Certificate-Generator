import React from 'react';
import CertificateGenerator from './components/CertificateGenerator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <CertificateGenerator />
    </div>
  );
};

export default App;
