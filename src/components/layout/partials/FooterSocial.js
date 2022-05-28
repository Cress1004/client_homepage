import React from "react";
import classNames from "classnames";
import Image from "../../elements/Image";

const FooterSocial = ({ className, ...props }) => {
  const classes = classNames("footer-social", className);

  return (
    <div {...props} className={classes}>
      <ul className="list-reset">
        <li>
          <a href="https://www.facebook.com/therainbowclass">
            <Image
              src={require("./../../../assets/images/icons8-facebook-64.png")}
              style={{ backgroundColor: "blue", width: "20px", height: "20px", borderRadius: "10px"}}
              alt="Open"
              className="mr-4"
            />
            Lớp học Cầu Vồng - The Rainbow Class
          </a>
        </li>
        <li>
          <a href="/">
          <Image
              src={require("./../../../assets/images/icons8-gmail-logo-48.png")}
              style={{width: "20px", height: "20px"}}
              alt="Open"
              className="mr-4"
            />
            lophoccauvong15@gmail.com
          </a>
        </li>
        <li>
          <a href="/">
          <Image
              src={require("./../../../assets/images/icons8-phone-48.png")}
              style={{width: "25px", height: "25px"}}
              alt="Open"
              className="mr-4"
            />
            0979663851 (Ms Hiền)
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FooterSocial;
