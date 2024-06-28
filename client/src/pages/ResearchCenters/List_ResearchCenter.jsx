import {Link} from "react-router-dom";

export default function List_ResearchCenter() {
  // should be requested from backend before list is rendered
  // Endpoint: /api/research-centers/list
  // sample response
  // [
  //     {
  //         "id": "91abbbd0-277d-45e0-8f05-c86bce7f76ff",
  //         "name": "Manufacturing Research Center"
  //     },
  //     {
  //         "id": "c67e5900-e36e-41b7-a15f-59ca9bd3e261",
  //         "name": "Center for Technopreneurship and Innovation"
  //     }
  // ]
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
    <Link to={`/center/${branch.id}`} className="flex justify-center bg-[#8B0000] text-base text-white py-3 px-5">
      <li key={branch.id} className="self-center text-center">
        {branch.title}
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

