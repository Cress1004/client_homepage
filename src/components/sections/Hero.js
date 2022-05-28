import React from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import Image from "../elements/Image";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  const outerClasses = classNames(
    "hero section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  return (
    <section {...props} className={outerClasses}>
      <h2 className="mt-0 mb-32 reveal-from-bottom" data-reveal-delay="200">
        Lớp học Cầu Vồng {" "}
        <span className="text-color-primary" data-reveal-delay="200">
        The Rainbow Class
        </span>
      </h2>
      <Image
        className="container"
        src={require("./../../assets/images/banner.jpg")}
        alt="Banner"
        data-reveal-delay="400"
      />
      <div className="container-sm">
        <div className={innerClasses}>
          <p
            className="reveal-from-bottom"
            data-reveal-delay="400"
            style={{ color: "blue" }}
          >
            Lớp học Cầu Vồng là một dự án phi lợi nhuận nhằm lan tỏa tri thức
            cho trẻ em có hoàn cảnh khó khăn.
            <br />
            The Rainbow Class is a non-profit project aiming to bring education
            to underprivileged children.
          </p>
          {/* <div
            className="hero-figure reveal-from-bottom illustration-element-01"
            data-reveal-value="20px"
            data-reveal-delay="800"
          ></div> */}
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
