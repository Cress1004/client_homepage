import React from "react";
import classNames from "classnames";
import { SectionIntroProps } from "../../utils/SectionProps";
import SectionIntro from "./partials/SectionIntro";

const propTypes = {
  ...SectionIntroProps.types,
};

const defaultProps = {
  ...SectionIntroProps.defaults,
};
const FeaturesIntro = ({
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
    "features-tiles section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-tiles-inner section-inner pt-0",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const tilesClasses = classNames(
    "tiles-wrap center-content",
    pushLeft && "push-left"
  );

  const sectionIntro = {
    title: "Giới thiệu lớp học",
    paragraph: [
      `Lớp học cầu vồng là một dự án từ thiện phi lợi nhuận nhằm lan tỏa tri thức cho các bạn sinh viên và trẻ em có hoàn cảnh khó khăn. Các bạn TNV sẽ được tham gia lớp tiếng Anh miễn phí do giáo viên bản ngữ dạy và sẽ cam kết dạy học văn hóa tại các lớp tình thương cho trẻ em nghèo. Đây không chỉ là cơ hội tốt để các bạn TNV nâng cao khả năng nghe nói tiếng Anh với người nước ngoài, mà còn là nơi để các bạn đem kiến thức của mình truyền lại cho những trẻ em nghèo trong thành phố.`,
      `"Hạnh phúc giữ trong tay chỉ còn là hạt; hạnh phúc mang ra san sẻ mới trổ hoa." - Ernest Hemingway`,
      `Xuất phát tận tâm từ tấm lòng yêu thương, luôn hy vọng có thể giúp đỡ cũng như chia sẻ phần nào sự thiệt thòi của những em nhỏ - những hoàn cảnh không may mắc bệnh tự kỉ, chậm phát triển và những cảnh đời khó khăn. Lớp học Cầu vồng - một tổ chức phi lợi nhuận được thành lập nhằm tạo điều kiện giúp đỡ, động viên những mảnh đời kém may mắn về cả vật chất lẫn tình thương, đồng thời tìm kiếm những bạn TNV - những trái tim nhiệt huyết để hỗ trợ dạy học các lớp học tình thương để các em nhỏ có thêm cơ hội mở rộng cánh cửa tương lai.`,
      `Và hơn ai hết, chúng mình luôn hiểu được phần nào sự khó khăn, vất vả và trân quý các bạn TNV khi dành toàn bộ tâm huyết và sự yêu thương cho những em nhỏ khó khăn. Vậy nên, Lớp học Cầu vồng luôn hỗ trợ mở các lớp học tiếng Anh do giáo viên bản ngữ trực tiếp giảng dạy và lớp học IELTS online, nhằm giúp các bạn TNV bổ sung kiến thức cho bản thân cũng như tự tin hơn trong giao tiếp để có thể truyền đạt lại cho các em.`,
      `"Cho đi chính là nhận lại".`,
      `Hãy tham gia Lớp Học Cầu Vồng để vừa được học vừa được dạy nào các bạn!`,
    ],
    image: "./../../assets/images/vvc.jpg",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionIntro data={sectionIntro} />
          <div className={tilesClasses}></div>
        </div>
      </div>
    </section>
  );
};

FeaturesIntro.propTypes = propTypes;
FeaturesIntro.defaultProps = defaultProps;

export default FeaturesIntro;
