import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Image from "../../elements/Image";

const propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    paragraph: PropTypes.array,
  }).isRequired,
  children: PropTypes.node,
  tag: PropTypes.oneOf(["h1", "h2", "h3"]),
};

const defaultProps = {
  children: null,
  tag: "h2",
};

const SectionIntro = ({ className, data, children, tag, ...props }) => {
  const classes = classNames("section-header", className);

  const Component = tag;
  const paragraph = data.paragraph;
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <>
      {(data.title || paragraph) && (
        <div {...props} className={classes}>
          <div className="reveal-from-bottom" data-reveal-delay="800">
            <div className="container">
              {isMobile ? (
                <>
                  {" "}
                  <div
                    style={{
                      textAlign: "justify",
                    }}
                  >
                    {children}
                    {data.title && (
                      <Component
                        className={classNames(
                          "mt-0",
                          paragraph ? "mb-16" : "mb-0"
                        )}
                      >
                        {data.title}
                      </Component>
                    )}
                    <a href="https://facebook.com/therainbowclass/photos/a.184942138578408/1252316485174296/">
                      <Image
                        src={require("./../../../assets/images/vvc.jpg")}
                        alt="vvc-image"
                      />
                    </a>
                    {paragraph.length > 0 && (
                      <>
                        {paragraph.map((i, index) => (
                          <>
                            {index === paragraph.length / 2 ? (
                              <>
                                <a href="/">
                                  {" "}
                                  <Image
                                    src={require("./../../../assets/images/member.jpg")}
                                    alt="apply-image"
                                  />
                                </a>
                              </>
                            ) : null}
                            <p className="m-16">{i}</p>
                          </>
                        ))}
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div
                    style={{
                      float: "left",
                      width: "65%",
                      textAlign: "justify",
                    }}
                  >
                    {children}
                    {data.title && (
                      <Component
                        className={classNames(
                          "mt-0",
                          paragraph ? "mb-16" : "mb-0"
                        )}
                      >
                        {data.title}
                      </Component>
                    )}
                    {paragraph.length > 0 && (
                      <>
                        {paragraph.map((i) => (
                          <p className="m-16">{i}</p>
                        ))}
                      </>
                    )}
                  </div>
                  <div
                    style={{ float: "right", width: "35%", clear: "right" }}
                    className={classNames("mt-48")}
                  >
                    {" "}
                    <a href="https://facebook.com/therainbowclass/photos/a.184942138578408/1252316485174296/">
                      <Image
                        src={require("./../../../assets/images/vvc.jpg")}
                        alt="vvc-image"
                        className={classNames("m-16")}
                      />
                    </a>
                    <a href="/">
                      {" "}
                      <Image
                        src={require("./../../../assets/images/member.jpg")}
                        alt="apply-image"
                        className={classNames("m-16")}
                      />
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

SectionIntro.propTypes = propTypes;
SectionIntro.defaultProps = defaultProps;

export default SectionIntro;
