import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Col, Row } from "antd";

const LayoutDefault = ({ children }) => (
  <>
    <Header navPosition="right" />
    <main className="site-content">{children}</main>
    <Row
      style={{
        width: "100%",
        position: "flex",
        bottom: "0px",
      }}
    >
      <Col span={12}></Col>
      <Col
        span={12}
        style={{
          textAlign: "right",
          fontSize: "14px",
        }}
      >
        <a
          href="https://forms.gle/6LHENFLi5t7fpumC9"
          target={"_blank"}
          rel="noopener noreferrer"
        >
          {" "}
          <span
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              padding: "20px",
              marginBottom: "20px",
            }}
            className="text-color-primary"
          >
            {" "}
            Phản hồi về hệ thống{" "}
          </span>
        </a>
      </Col>
    </Row>
    <Footer />
  </>
);

export default LayoutDefault;
