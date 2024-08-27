import React from "react";
import "./Features.css";
import feature1 from "../../../shared/Images/feature1.png";
import featurebg1 from "../../../shared/Images/feature1_bg.png";
import feature2 from "../../../shared/Images/feature2.png";
import featurebg2 from "../../../shared/Images/feature2_bg.png";
import feature3 from "../../../shared/Images/feature3.png";
import featurebg3 from "../../../shared/Images/feature3_bg.png";
import feature4 from "../../../shared/Images/feature4.png";
import featurebg4 from "../../../shared/Images/feature4_bg.png";

const Features: React.FC = () => {
  return (
    <div className='features'>
      <h1>Features</h1>
      <p>
        Some of the features and advantages that we provide for those of you who
        store data in this Data Warehouse.
      </p>
      <div className='features__list'>
        <div className='features__item'>
          <div className='features__item-img'>
            <img src={feature1} alt='' />
          </div>
          <div className='features__item-content'>
            <h3>Search Data</h3>
            <p>
              Don’t worry if your data is very large, the Data Warehouse
              provides a search engine, which is useful for making it easier to
              find data effectively saving time.
            </p>
            <button className='features__item-link'>Learn more</button>
          </div>
          <div className='features__item-bg'>
            <img src={featurebg1} alt='' />
          </div>
        </div>
        <div className='features__item'>
          <div className='features__item-img'>
            <img src={feature2} alt='' />
          </div>
          <div className='features__item-content'>
            <h3>24 Hours Access</h3>
            <p>
              Access is given 24 hours a full morning to night and meet again in
              the morning, giving you comfort when you need data when urgent..
            </p>
            <button className='features__item-link'>Learn more</button>
          </div>
          <div className='features__item-bg'>
            <img src={featurebg2} alt='' />
          </div>
        </div>
        <div className='features__item'>
          <div className='features__item-img'>
            <img src={feature3} alt='' />
          </div>
          <div className='features__item-content'>
            <h3>Print Out</h3>
            <p>
              Print out service gives you convenience if someday you need print
              data, just edit it all and just print it.
            </p>
            <button className='features__item-link'>Learn more</button>
          </div>
          <div className='features__item-bg'>
            <img src={featurebg3} alt='' />
          </div>
        </div>
        <div className='features__item'>
          <div className='features__item-img'>
            <img src={feature4} alt='' />
          </div>
          <div className='features__item-content'>
            <h3>Security Code</h3>
            <p>
              Data Security is one of our best facilities. Allows for your files
              to be safer. The file can be secured with a code or password than
              you created, so only you can open the file.
            </p>
            <button className='features__item-link'>Learn more</button>
          </div>
          <div className='features__item-bg'>
            <img src={featurebg4} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
