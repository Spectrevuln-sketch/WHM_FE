'use client';

import React from "react";

const ProductDelivered = () => {

  const [isOpen] = React.useState('ini state')

  return(
    <div>product delivered {isOpen}</div>
  );
}

export default ProductDelivered