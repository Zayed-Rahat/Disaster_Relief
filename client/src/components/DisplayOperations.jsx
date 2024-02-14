import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import { loader } from '../assets';

const DisplayOperations = ({ title, isLoading, operations }) => {
  const navigate = useNavigate();

  const handleNavigate = (operation) => {
    navigate(`/operation-details/${operation.title}`, { state: operation })
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({operations.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && operations.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any operations yet
          </p>
        )}

        {!isLoading && operations.length > 0 && operations.map((operation) => <FundCard 
          key={uuidv4()}
          {...operation}
          handleClick={() => handleNavigate(operation)}
        />)}
      </div>
    </div>
  )
}

export default DisplayOperations