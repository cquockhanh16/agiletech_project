import React from "react";
import "./Introduction.css";
import main1 from "../../../shared/Images/main1.png";

const Introduction: React.FC = () => {
  return (
    <div>
      <div className='introduction'>
        <div>
          <img src={main1} alt='main1' />
        </div>
        <div>
          <h1>We are a high-level data storage bank</h1>
          <p>
            The place to store various data that you can access at any time
            through the internet and where you can carry it. This very flexible
            storage area has a high level of security. To enter into your own
            data you must enter the password that you created when you
            registered in this Data Warehouse.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
