import { Select } from "antd";
import { Button } from "antd";
import { Input } from "antd";
import { Form } from "antd";
import React from "react";

const { Item } = Form;
const { Option } = Select;

function CVPage1(props) {
  const { t, formik, classList, cvInfo, changePage } = props;
  return (
    <div>
      {" "}
      <Item label={t("user_name")} required>
        <Input
          name="userName"
          placeholder={t("input_name")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          defaultValue={cvInfo ? cvInfo.userName : undefined}
        />
        {formik.errors.userName && formik.touched.userName && (
          <span className="custom__error-message">
            {formik.errors.userName}
          </span>
        )}
      </Item>
      <Item label={t("email")} required>
        <Input
          name="email"
          placeholder={t("input_email")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          defaultValue={cvInfo ? cvInfo.email : undefined}
        />
        {formik.errors.email && formik.touched.email && (
          <span className="custom__error-message">{formik.errors.email}</span>
        )}
      </Item>
      <Item label={t("phone_number")} required>
        <Input
          name="phoneNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t("input_phone_number")}
          defaultValue={cvInfo?.phoneNumber || undefined}
        />
        {formik.errors.phoneNumber && formik.touched.phoneNumber && (
          <span className="custom__error-message">
            {formik.errors.phoneNumber}
          </span>
        )}
      </Item>
      <Item label={t("register_class")} required>
        <Select
          showSearch
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          placeholder={t("input_select_class")}
          onChange={(value) => formik.setFieldValue("selectedClass", value)}
          defaultValue={cvInfo?.selectedClass || undefined}
        >
          {classList.length
            ? classList.map((option) => (
                <Option key={option._id} value={option._id}>
                  {option.name}
                </Option>
              ))
            : null}
        </Select>
        {formik.errors.selectedClass && formik.touched.selectedClass && (
          <span className="custom__error-message">
            {formik.errors.selectedClass}
          </span>
        )}
      </Item>
      <Item style={{ padding: "-30px" }}>
        <Button
          onClick={() => changePage(1)}
          className={`upload-cv__button-next`}
        >
          {t("next_page")}
        </Button>
      </Item>
    </div>
  );
}

export default CVPage1;
