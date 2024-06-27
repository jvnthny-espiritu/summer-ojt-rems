import {Link} from "react-router-dom";

export default function List_ResearchCenter() {
  // should be requested from backend before list is rendered
  const branches = [
    {
      id: "mrc",
      title: "Manufacturing Research Center",
    },
    {
      id: "mtcc",
      title: "Materials Testing and Calibration Center",
    },
    {
      id: "gis",
      title: "GIS Applications Development Center",
    },
    {
      id: "esrc",
      title: "Electronic Systems Research Center",
    },
    {
      id: "cti",
      title: "Center for Technopreneurship and Innovation",
    },
    {
      id: "dtc",
      title: "Digital Transformation Center",
    }
  ];

  const list = branches.map( (branch) => (
    <li key={branch.id}>
      <Link to={`/center/${branch.id}`}>{branch.title}</Link>
    </li>
  ))

  return (
    <>
      <ul className="flex flex-col gap-10 size-full place-content-center">
        {list}
      </ul>
    </>   
  );
}

