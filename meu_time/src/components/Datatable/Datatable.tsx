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
          <th key={nome} className="sorting sorting_des m-4" aria-controls="datatables-reponsive" aria-label="Name: activate to sort column ascending" aria-sort="descending">
            {nome === "PRIORIDADE" && props.orders}
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
    <div className="table-responsive" >
      <div className='card' style={{ overflow: "auto", background: "darkgrey" }}>
        <div className='card-body m-2' >
          <div className='mb-4 m-2 text-start'>
            {props.filter === undefined ? <small> </small> : <h3>FILTRAR POR</h3>}
            {props.filter}
          </div>
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
      {props.modal1}
      {props.modal2}
      {props.modal3}
    </div>
  );
};

export default Datatable;
