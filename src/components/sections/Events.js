import React from "react";
import classNames from "classnames";
import { SectionIntroProps } from "../../utils/SectionProps";
import SectionEvent from "./partials/SectionEvents";
import Image from "../elements/Image";

const propTypes = {
  ...SectionIntroProps.types,
};

const defaultProps = {
  ...SectionIntroProps.defaults,
};

const Events = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {
  const outerClasses = classNames(
    "testimonial section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "testimonial-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const tilesClasses = classNames("tiles-wrap", pushLeft && "push-left");

  const sectionHeader = {
    title: "Sự kiện",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionEvent data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>
            <div
              className="tiles-item reveal-from-right"
              data-reveal-delay="200"
            >
              <div className="tiles-item-inner">
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    <Image
                      src={require("./../../assets/images/thumbnail-offline.jpg")}
                      alt="hiring-image"
                      className={classNames("m-16")}
                      width={"80%"}
                      height={"80%"}
                    />
                    🎉 LỚP HỌC CẦU VỒNG TRỞ LẠI HỌC OFFLINE 🎉
                  </p>
                </div>
                <div
                  className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider"
                  style={{ textAlign: "right" }}
                >
                  <span className="testimonial-item-name text-color-high">
                    17/05/2022
                  </span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    <a href="https://www.facebook.com/therainbowclass/photos/a.225545847851370/1287147145024563/">
                      Xem thêm
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                    <Image
                      src={require("./../../assets/images/banh-hat-de.jpg")}
                      alt="hiring-image"
                      className={classNames("m-16")}
                      width={"80%"}
                      height={"80%"}
                    />
                    MUA BÁNH HẠT DẺ ĐỂ QUYÊN GÓP SỬA NHÀ CHO CHỊ TRANG KHUYẾT
                    TẬT Ở HÀ NỘI
                  </p>
                </div>
                <div
                  className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider"
                  style={{ textAlign: "right" }}
                >
                  <span className="testimonial-item-name text-color-high">
                    30/04/2022
                  </span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    <a href="https://www.facebook.com/therainbowclass/photos/a.184942138578408/1285805531825391/">
                      Xem thêm
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div
              className="tiles-item reveal-from-left"
              data-reveal-delay="200"
            >
              <div className="tiles-item-inner">
                <div className="testimonial-item-content">
                  <p className="text-sm mb-0">
                  <Image
                      src={require("./../../assets/images/da-ngoai.jpg")}
                      alt="hiring-image"
                      className={classNames("m-16")}
                      width={"80%"}
                      height={"80%"}
                    />
                    LỚP HỌC CẦU VỒNG TỔ CHỨC DÃ NGOẠI CHO HỌC SINH TẠI CÔNG VIÊN THỦ LỆ NGÀY 24/04
                  </p>
                </div>
                <div
                  className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider"
                  style={{ textAlign: "right" }}
                >
                  <span className="testimonial-item-name text-color-high">
                    26/04/2022
                  </span>
                  <span className="text-color-low"> / </span>
                  <span className="testimonial-item-link">
                    <a href="https://www.facebook.com/therainbowclass/photos/pcb.1268732263532718/1268732140199397/">Xem thêm</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Events.propTypes = propTypes;
Events.defaultProps = defaultProps;

export default Events;
