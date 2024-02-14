import React, { useState, useEffect } from 'react'

import { DisplayOperations } from '../components';
import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [operations, setOperations] = useState([]);

  const { address, contract, getUserOperations } = useStateContext();

  const fetchOperations = async () => {
    setIsLoading(true);
    const data = await getUserOperations();
    setOperations(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchOperations();
  }, [address, contract]);

  return (
    <DisplayOperations 
      title="All Operations"
      isLoading={isLoading}
      operations={operations}
    />
  )
}

export default Profile