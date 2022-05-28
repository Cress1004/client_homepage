import React from "react";
import classNames from "classnames";
import { SectionHiringProps } from "../../utils/SectionProps";
import SectionHiring from "./partials/SectionHiring";

const propTypes = {
  ...SectionHiringProps.types,
};

const defaultProps = {
  ...SectionHiringProps.defaults,
};

const FeaturesHiring = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  pushLeft,
  ...props
}) => {
  const outerClasses = classNames(
    "features-split section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const tilesClasses = classNames(
    "tiles-wrap center-content",
    pushLeft && "push-left"
  );

  const sectionHeader = {
    title: "Tuyển Tình Nguyện viên",
    paragraph:
      "Lớp học Cầu Vồng là tổ chức từ thiện phi lợi nhuận giúp đỡ những mảnh đời bất hạnh, kém may mắn cả về vật chất và tinh thần, mở các lớp học cho các trẻ em nghèo cũng như giúp đỡ các em nhỏ bị chậm phát triển hay tự kỉ. Lớp học Cầu Vồng đang cần tìm những Tình nguyện viên thực sự tâm huyết và có trách nhiệm.",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHiring data={sectionHeader} className="center-content" />
          <div className={tilesClasses}></div>
        </div>
      </div>
    </section>
  );
};

FeaturesHiring.propTypes = propTypes;
FeaturesHiring.defaultProps = defaultProps;

export default FeaturesHiring;
