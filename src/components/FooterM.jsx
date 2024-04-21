import { Footer } from "flowbite-react";
import {
  BsLinkedin,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const FooterM = () => {
  return (
    <Footer container className="mt-2.5">
     
   
        <div className="w-full mb-2.5	 mb- sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="QrCode-V2" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="https://www.facebook.com/razu.sharmaa" icon={BsFacebook} />
            <Footer.Icon href="https://www.instagram.com/razu.sharmaa/" icon={BsInstagram} />
            <Footer.Icon href="https://twitter.com/razu_sharmaa" icon={BsTwitter} />
            <Footer.Icon href="https://github.com/razusharmaa" icon={BsGithub} />
            <Footer.Icon href="https://www.linkedin.com/in/razusharmaa/" icon={BsLinkedin} />
          </div>
        </div>
      
    </Footer>
  );
};

export default FooterM;
