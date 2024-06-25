import Nav from "../../components/NavBar";

const Home = () => {
  // should be requested from backend before list is rendered
  const branches = [
    "MRC", 
    "MTCC", 
    "GIS",
    "ESRC ", 
    "CTI", 
    "DTC"
  ];

  return (
    <>
      <ul className="flex size-full place-content-center">
        {branches.map( branch => (
          <button className="m-10">{branch}</button>
        ))}
      </ul>
    </>   
  );
};

export default Home;