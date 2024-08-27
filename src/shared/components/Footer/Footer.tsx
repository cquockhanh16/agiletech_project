import React from "react";
import "./Footer.css";
import logo from "../../Images/logo.png";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer>
      <span className='line'></span>
      <div className='container'>
        <div className='footer__contact'>
          <div className='footer__contact-infor'>
            <div>
              <img src={logo} alt='' />
              <p>
                <b>DataWarehouse</b>
              </p>
            </div>
            <p className='mt-4'>
              <b>
                Warehouse society, 234<br></br>Bahagia Ave Street PRBW 29281
              </b>
            </p>
            <p className='mt-4'>
              infor@warehouse.project<br></br>1-232-3434(Main)
            </p>
          </div>
          <div className='footer__contact-about'>
            <div>
              <b>About</b>
            </div>
            <ul className='mt-4'>
              <li>Profile</li>
              <li>Features</li>
              <li>Careers</li>
              <li>DW News</li>
            </ul>
          </div>
          <div className='footer__contact-help'>
            <div>
              <b>Help</b>
            </div>
            <ul className='mt-4'>
              <li>Support</li>
              <li>Sign up</li>
              <li>Guide</li>
              <li>Reports</li>
              <li>Q&A</li>
            </ul>
          </div>
          <div className='footer__contact-social'>
            <div>
              <b>Social Media</b>
            </div>
            <span className='mt-4'>
              <FaYoutube className='icon-social' />
            </span>
            <span>
              <FaInstagram className='icon-social' />
            </span>
            <span>
              <FaGithub className='icon-social' />
            </span>
          </div>
        </div>
        <div className='footer__copyright'>
          <p>
            © Datawarehouse™, 2020. All rights reserved. <br></br>Company
            Registration Number: 21479524.
          </p>
          <div>
            <IoChatboxEllipses className='icon-chat' />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
