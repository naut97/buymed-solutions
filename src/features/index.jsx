import React, {useMemo} from 'react';
import ProductQRGenerator from './product-qr-generator/index.jsx';

const Features = props => {
  const {appId} = props;
  return useMemo(() => {
    switch (appId) {
      case 'deeplink':
        return <ProductQRGenerator />;
      case 'product-qr':
        return <ProductQRGenerator />;
      case 'sideloader':
        return <ProductQRGenerator />;
    }
  }, [appId]);
};

export default Features;
