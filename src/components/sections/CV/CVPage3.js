import { Form } from "antd";
import { Table } from "antd";
import { Button } from "antd";
import { Input } from "antd";
import { Checkbox } from "antd";
import React from "react";
import { NOON_TIME, WEEKDAY } from "../../../common/constant";

const { Item } = Form;
const { TextArea } = Input;

function CVPage3(props) {
  const {
    t,
    formik,
    fieldError,
    changePage,
    setFreeTime,
    checkFreeTime,
    cvInfo,
  } = props;

  const columns = [
    {
      title: "",
      dataIndex: "time",
      fixed: true,
      width: 120,
    },
  ];

  WEEKDAY.map((item) => {
    if (item.key !== 0)
      columns.push({
        title: item.text,
        key: item.key,
        dataIndex: "status",
        render: (record) => (
          <Checkbox
            text={`${item.key}-${record.key}`}
            onChange={(e) => setFreeTime(e)}
            defaultChecked={checkFreeTime(item.key, record.key)}
          />
        ),
      });
  });

  const fixedData = NOON_TIME.map((item) => ({
    key: item.key,
    time: `${item.startTime} - ${item.endTime}`,
    status: {
      key: item.key,
      active: false,
    },
  }));

  const handleChangePDFFile = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      formik.setFieldValue("cvFile", file);
    }
  };

  const handleChangeAudioFile = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      formik.setFieldValue("audioFile", file);
    }
  };

  return (
    <div>
      <Item label={t("uploads_your_cv")} required>
        <input
          type="file"
          accept=".pdf"
          name="cvFile"
          onChange={(e) => handleChangePDFFile(e)}
          onBlur={formik.handleBlur}
        />
        {formik.errors.cvFile && formik.touched.cvFile && (
          <span className="custom__error-message">{formik.errors.cvFile}</span>
        )}
      </Item>
      <Item label={t("uploads_intro_english_audio")}>
        <p>[Định dạng MP3/MP4]</p>
        <input
          type="file"
          accept=".mp3, .mp4"
          name="intro_audio"
          onChange={(e) => handleChangeAudioFile(e)}
          onBlur={formik.handleBlur}
        />
        {formik.errors.audioFile && formik.touched.audioFile && (
          <span className="custom__error-message">
            {formik.errors.audioFile}
          </span>
        )}
      </Item>
      <Item label={t("free_time_table")} required>
        <Table
          className="upload-cv__free-time-table"
          columns={columns}
          dataSource={fixedData}
          pagination={false}
        />
        {formik.errors.freeTime && formik.touched.freeTime && (
          <span className="custom__error-message">
            {formik.errors.freeTime}
          </span>
        )}
      </Item>
      <Item label={t("free_time_note")}>
        <TextArea
          name="note"
          rows={3}
          className="upload-cv__note-text"
          onChange={formik.handleChange}
          defaultValue={cvInfo?.note || undefined}
        ></TextArea>
      </Item>
      <Item>
        <Button
          onClick={() => changePage(-1)}
          className={`upload-cv__button-prev`}
        >
          {t("prev_page")}
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className={
            !fieldError(formik)
              ? "upload-cv__submit-button upload-cv__submit-button--disable"
              : "upload-cv__submit-button"
          }
          disabled={!fieldError(formik)}
        >
          {t("submit")}
        </Button>
      </Item>
    </div>
  );
}

export default CVPage3;
