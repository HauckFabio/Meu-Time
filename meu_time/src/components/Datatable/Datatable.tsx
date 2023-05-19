import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Datatable = (props: any) => {
  const [data, setData] = useState<any[]>([]);
  const [nomecol, setNomeCol] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [links, setLinks] = useState<any[]>([]);

  const Head = () => {
    return (
      <tr>
        {props.header.map((nome: any) => (
          <th key={nome} className="sorting sorting_des" aria-controls="datatables-reponsive" aria-label="Name: activate to sort column ascending" aria-sort="descending">
            <b><h4>{nome}</h4></b>
          </th>
        ))}
      </tr>
    );
  };

  const Body = () => {
    return (
      <>
        {props.row}
      </>
    );
  };

  return (
    
      <div className='card' style={{ overflow: "auto", boxShadow: "none", background: "darkgrey" }}>
        <div className='card-body' >
        
          <table className={props.estilo}>
            <thead >
              {props.title}
              <Head />
            </thead>
            <tbody>
              <Body />
            </tbody>
          </table>
        </div>
      </div>
   
  );
};

export default Datatable;
