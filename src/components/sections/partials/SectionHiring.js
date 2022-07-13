import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Image from "../../elements/Image";

const propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    paragraph: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
  tag: PropTypes.oneOf(["h1", "h2", "h3"]),
};

const defaultProps = {
  children: null,
  tag: "h2",
};

const SectionHiring = ({ className, data, children, tag, ...props }) => {
  const classes = classNames("section-header", className);

  const Component = tag;
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <>
      {(data.title || data.paragraph) && (
        <div {...props} className={classes}>
          <div className="container">
            {isMobile ? (
              <>
                <div
                  className="mt-64 reveal-from-bottom"
                  data-reveal-delay="400"
                  style={{ textAlign: "justify" }}
                >
                  {children}
                  {data.title && (
                    <Component
                      className={classNames(
                        "mt-0",
                        data.paragraph ? "mb-16" : "mb-0"
                      )}
                    >
                      {data.title}
                    </Component>
                  )}
                  <a
                    href={`${
                      process.env.NODE_ENV === "production"
                        ? process.env.REACT_APP_AZURE_MANAGER_PAGE_URL
                        : process.env.REACT_APP_LOCAL_MANAGER_PAGE_URL
                    }login`}
                  >
                    <Image
                      src={require("./../../../assets/images/apply-banner.png")}
                      alt="hiring-image"
                      className={classNames("m-16")}
                      width={"80%"}
                      height={"80%"}
                    />
                  </a>
                  {data.paragraph && <p className="m-8">{data.paragraph}</p>}
                  <p
                    className="text-color-secondary mt-32"
                    style={{ textAlign: "center" }}
                  >
                    Đăng kí làm Tình Nguyện Viên <br />
                    <a
                      href={`${
                        process.env.NODE_ENV === "production"
                          ? process.env.REACT_APP_AZURE_MANAGER_PAGE_URL
                          : process.env.REACT_APP_LOCAL_MANAGER_PAGE_URL
                      }login`}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "blue",
                          fontSize: "28px",
                        }}
                      >
                        {" "}
                        Tại đây
                      </span>
                    </a>
                  </p>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div
                  style={{ float: "right", width: "60%", textAlign: "justify" }}
                  className="mt-64 reveal-from-bottom"
                  data-reveal-delay="400"
                >
                  {children}
                  {data.title && (
                    <Component
                      className={classNames(
                        "mt-0",
                        data.paragraph ? "mb-16" : "mb-0"
                      )}
                    >
                      {data.title}
                    </Component>
                  )}
                  {data.paragraph && <p className="m-8">{data.paragraph}</p>}
                  <p className="text-color-secondary mt-32">
                    Đăng kí làm Tình Nguyện Viên{" "}
                    <a
                      href={`${
                        process.env.NODE_ENV === "production"
                          ? process.env.REACT_APP_AZURE_MANAGER_PAGE_URL
                          : process.env.REACT_APP_LOCAL_MANAGER_PAGE_URL
                      }login`}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "blue",
                          fontSize: "40px",
                        }}
                      >
                        {" "}
                        Tại đây
                      </span>
                    </a>
                  </p>
                </div>
                <a
                  href={`${
                    process.env.NODE_ENV === "production"
                      ? process.env.REACT_APP_AZURE_MANAGER_PAGE_URL
                      : process.env.REACT_APP_LOCAL_MANAGER_PAGE_URL
                  }login`}
                  style={{ float: "left", width: "40%", clear: "left" }}
                  className="reveal-from-left"
                  data-reveal-delay="400"
                >
                  <Image
                    src={require("./../../../assets/images/apply-banner.png")}
                    alt="hiring-image"
                    className={classNames("m-16")}
                    width={"80%"}
                    height={"80%"}
                  />
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

SectionHiring.propTypes = propTypes;
SectionHiring.defaultProps = defaultProps;

export default SectionHiring;
