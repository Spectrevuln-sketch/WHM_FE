'use client';

import React from "react";

const DeliveringProduct = () => {

  const [isOpen] = React.useState('ini state')

  return(
    <div>delivering product {isOpen}</div>
  );
}

export default DeliveringProduct