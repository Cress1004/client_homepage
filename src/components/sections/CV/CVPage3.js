import { Form, Radio } from "antd";
import { Table } from "antd";
import { Button } from "antd";
import { Input } from "antd";
import { Checkbox } from "antd";
import React, { useState } from "react";
import { NOON_TIME, WEEKDAY } from "../../../common/constant";
import RecorderComponent from "../../recorder/RecorderComponent";

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

  const [isRecord, setIsRecord] = useState(true);
  // const [isVideo, setIsVideo] = useState(false);

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
    return null;
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

  const onChangeOption = (e) => {
    setIsRecord(e.target.value);
  };

  // const handleChangeVideo = (value) => {
  //   setIsVideo(value === "video" ? true : false);
  // };

  return (
    <div>
      <Item label={t("uploads_intro_english_audio")}>
        <Radio.Group onChange={onChangeOption} defaultValue={isRecord}>
          <Radio value={true}>{t("live_recording")}</Radio>
          <Radio value={false}>{t("upload_file")}</Radio>
        </Radio.Group>
      </Item>
      {isRecord ? (
        // <Item label="select_type_recording">
        //   <Select
        //     placeholder={t("select_type_recording")}
        //     onChange={(value) => handleChangeVideo(value)}
        //     defaultValue="video"
        //   >
        //     <Option key="1" value="video">
        //       Video
        //     </Option>
        //     <Option key="2" value="audio">
        //       Audio
        //     </Option>
        //   </Select>
        // </Item>
        <RecorderComponent formik={formik} t={t} isVideo={false} />
      ) : (
        <>
          <Item label="Tải lên file định dạng MP3/WAV/MP4">
            <input
              type="file"
              accept=".mp3, .mp4, .wav"
              name="intro_audio"
              onChange={(e) => handleChangeAudioFile(e)}
              onBlur={formik.handleBlur}
            />
          </Item>
        </>
      )}
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
