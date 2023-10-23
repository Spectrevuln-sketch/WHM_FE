'use client';

import React from "react";

const CreateMsr = () => {

  const [isOpen] = React.useState('ini state')

  return(
    <div>create msr {isOpen}</div>
  );
}

export default CreateMsr