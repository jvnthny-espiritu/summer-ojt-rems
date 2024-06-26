import { Link } from "react-router-dom";

export default function List_ResearchCenter() {
  // should be requested from backend before list is rendered
  const branches = [
    "MRC", 
    "MTCC", 
    "GIS",
    "ESRC", 
    "CTI", 
    "DTC"
  ];

  return (
    <>
      <ul className="flex size-full place-content-center">
        {branches.map( (branch, index) => (
          <li key={index} >
            <Link to={`center/${branch}`}>
              <button className="m-10">{branch}</button>
            </Link>
          </li>
        ))}
      </ul> 

      {/* <Outlet context={{ hello: "world" }} /> */}
    </>   
  );
}

