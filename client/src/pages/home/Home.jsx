import {Link} from "react-router-dom";
import List_ResearchCenter from "../ResearchCenters/List_ResearchCenter";

const Home = () => {
  return (
    <>
      <div className="m-8">
        <div>
          <p>
            STEERHUB Research Equipment Monitoring
          </p>
        </div>

        {/*Should be a Component*/}
        <div>
          <div>
            <p>Humidity</p>
          </div>
          <div>
            <p>Temperature</p>
          </div>
          <div>
            <p>Rating</p>
          </div>
        </div>

        <div>
          <p className="text-right">
            <Link to="/login">Login</Link>
          </p>
        </div>

        <div>
          <List_ResearchCenter/>
        </div>
      </div>
    </>
  );
};

export default Home;