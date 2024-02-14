import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0xBA326DcF78c8177A95Ef5484a04D913E70a262c0');
  const { mutateAsync: addOperation } = useContractWrite(contract, 'addOperation');

  const address = useAddress();
  const connect = useMetamask();

  const publishOperation = async (form) => {
    try {
      const data = await addOperation({
				args: [
					address, // owner
					form.title, // title
					form.description, // description
					form.target,
					form.image,
				],
			});

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getAllOperations = async () => {
    const Operations = await contract.call('getAllOperations');
    console.log(Operations)

    const parsedOperations = Operations.map((operation, i) => ({
      owner: operation.owner,
      title: operation.title,
      description: operation.description,
      target: ethers.utils.formatEther(operation.target.toString()),
      amountCollected: ethers.utils.formatEther(operation.amountCollected.toString()),
      image: operation.image,
      complete: operation.complete,
      pId: i
    }));

    return parsedOperations;
  }

  const getUserOperations = async () => {
    const allOperations = await getAllOperations();

    const filteredOperations = allOperations.filter((operation) => operation.owner === address);

    return filteredOperations;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToOperation', [pId], { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        addOperation: publishOperation,
        getAllOperations,
        getUserOperations,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);