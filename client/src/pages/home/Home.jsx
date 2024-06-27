import {Link} from "react-router-dom";
import ListResearchCenter from "../ResearchCenters/List_ResearchCenter";

const Home = () => {
  return (
    <>
      <div className="flex flex-col gap-3 font-base m-5">
        <div className=" bg-[#8B0000] text-center py-4">
          <p className="text-white text-lg">
            STEERHUB Research Equipment Monitoring
          </p>
        </div>

        {/*Should be a Component*/}
        <div className="flex flex-col md:flex-row gap-5 md:gap-20 place-content-center text-lg">
          <div className="text-center">
            <p>Humidity</p>
            <p>42°</p>
          </div>
          <div className="text-center">
            <p>Temperature</p>
            <p>42°</p>
          </div>
          <div className="text-center">
            <p>Rating</p>
            <p>42°</p>
          </div>
        </div>

        <div className="">
          <p className="text-right text-[#8B0000] font-bold text-lg">
            STEER Hub Staff? <Link to="/login">Login</Link>
          </p>
        </div>

        <div>
          <ListResearchCenter/>
        </div>
      </div>
    </>
  );
};

export default Home;