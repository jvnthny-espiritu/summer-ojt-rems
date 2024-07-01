import {Link} from "react-router-dom";
import React, { useState,useEffect } from 'react';
import api from '../../services/api';

export default function List_ResearchCenter() {
  const [branches, setBranches] = useState([])
    const fetchResearchCenters = async (e) => {
      try{
        const response = await api.get('api/research-centers/list');
        setBranches(response.data)
      }catch(error){
        console.error('Error:', error);
      }
    };

    useEffect(() => {
      fetchResearchCenters();
    }, []);

  const list = branches.map( (branch) => (
    <Link to={`/public/${branch.id}`} className="flex justify-center bg-[#8B0000] text-base text-white py-3 px-5">
      <li key={branch.id} className="self-center text-center">
        {branch.name}
      </li>
    </Link>
  ))

  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-3  size-full">
        { list }
      </ul>
    </>   
  );
}

