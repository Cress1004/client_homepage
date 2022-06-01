import React from "react";
import { Button, Checkbox, Form, Input, Select, Table, message } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import "./style/upload-cv.scss";
import * as Yup from "yup";
import {
  LIMIT_PDF_FILE_SIZE,
  NOON_TIME,
  phoneRegExp,
  WEEKDAY,
} from "../common/constant";
import { calcFileSize } from "../common/function";
import { useState } from "react";
import { useEffect } from "react";
import apis from "../apis";
import ThanksPage from "./ThanksPage";

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

function UploadCV(props) {
  const { t } = useTranslation();
  const [classList, setClasses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [isSubmmited, setSubmitted] = useState(false);
  const cvInfo = JSON.parse(localStorage.getItem("cvInfo"));

  const fetchListClassName = async () => {
    const data = await apis.classes.getListClassWithName();
    if (data?.success) {
      setClasses(data.classes);
    } else if (!data.success) {
      message.error(data.message);
    } else {
      message.error("Error");
    }
  };

  const fetchQuestions = async () => {
    const data = await apis.cvQuestion.getQuestions();
    if (data?.success) {
      setQuestions(data.questions);
    } else if (!data.success) {
      message.error(data.message);
    } else {
      message.error("Error");
    }
  };

  useEffect(() => {
    fetchListClassName();
    fetchQuestions();
  }, []);

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

  const checkFreeTime = (currWeekday, currNoon) => {
    if (cvInfo?.freeTime.length) {
      var freeTime = cvInfo.freeTime.find(
        (item) => item.toString() === `${currWeekday}-${currNoon}`.toString()
      );
      return freeTime ? true : false;
    }
    return false;
  };

  const setFreeTime = (e) => {
    const freeTimeList = formik.values.freeTime;
    formik.setFieldValue(
      "freeTime",
      e.target.checked
        ? [...freeTimeList, e.target.text]
        : freeTimeList.filter((item) => item !== e.target.text)
    );
  };

  const fixedData = NOON_TIME.map((item) => ({
    key: item.key,
    time: `${item.startTime} - ${item.endTime}`,
    status: {
      key: item.key,
      active: false,
    },
  }));

  const fetchUploadCV = async (formData) => {
    const data = await apis.upload.uploadCV(formData);
    if (data.success) {
      localStorage.removeItem("cvInfo");
      setSubmitted(true);
    } else if (!data.success) {
      alert(data.message);
    } else {
      alert(t("fail_to_get_api"));
    }
  };

  const formik = useFormik({
    initialValues: {
      userName: cvInfo?.userName,
      email: cvInfo?.email,
      phoneNumber: cvInfo?.phoneNumber,
      selectedClass: cvInfo?.selectedClass,
      cvFile: "",
      freeTime: cvInfo && cvInfo.freeTime ? cvInfo.freeTime : [],
      note: cvInfo?.note,
      answers: cvInfo && cvInfo.answers ? cvInfo.answers : [],
      // audioFile: "",
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string().required(t("required_name_message")),
      email: Yup.string()
        .email(t("invalid_email_message"))
        .required(t("required_email_message")),
      phoneNumber: Yup.string()
        .matches(phoneRegExp, t("invalid_phone_number"))
        .required(t("required_phone_number_message")),
      selectedClass: Yup.string().required(t("required_class_message")),
      cvFile: Yup.mixed()
        .required(t("required_file_message"))
        .test(
          "fileSize",
          `${t(`file_size_must_be_less_than`)} ${LIMIT_PDF_FILE_SIZE} MB`,
          (value) => {
            return value?.size <= calcFileSize(LIMIT_PDF_FILE_SIZE);
          }
        )
        .test("type", t("only_pdf_accept"), (value) => {
          return value && ["application/pdf"].includes(value.type);
        }),
      // audioFile: Yup.mixed()
      // .test("type", t("only_mp3_mp4_accept"), (value) => {
      //   return value && ["application/pdf"].includes(value.type);
      // }),
      freeTime: Yup.array()
        .of(Yup.string())
        .test({
          message: t("required_free_time"),
          test: (arr) => arr?.length >= 1,
        }),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        const formData = new FormData();
        for (var key in values) {
          const value = values[key];
          if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else formData.append(key, value);
        }
        fetchUploadCV(formData);
        setSubmitting(false);
      }, 400);
    },
  });

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

  const changeAnswer = (e, question) => {
    const answers = formik.values.answers;
    const currentAnswerIndex = answers.findIndex(
      (item) => item.questionId === question._id
    );
    if (currentAnswerIndex !== -1) {
      answers[currentAnswerIndex].questionId = question._id;
      answers[currentAnswerIndex].content = e.target.value;
    } else
      answers.push({
        questionId: question._id,
        content: e.target.value,
      });
    // answers
    formik.setFieldValue("answers", answers);
  };

  const changePage = (i) => {
    const currentPage = page;
    setPage(currentPage + i);
    window.localStorage.setItem("cvInfo", JSON.stringify(formik.values));
  };

  const fieldError = (formik) => {
    return (
      !formik.errors.userName &&
      !formik.errors.email &&
      !formik.errors.phoneNumber &&
      !formik.errors.cvFile &&
      !formik.errors.selectedClass &&
      !formik.errors.freeTime
    );
  };

  return (
    <div
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "200%",
      }}
      className="reveal-from-right"
    >
      {isSubmmited ? (
        <ThanksPage />
      ) : (
        <>
          {" "}
          <div className="upload-cv__title">{t("upload_cv")}</div>
          <Form
            layout="vertical"
            className="upload-cv__form"
            onSubmit={formik.handleSubmit}
          >
            <div>
              {(() => {
                switch (page) {
                  case 1:
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
                          {formik.errors.userName &&
                            formik.touched.userName && (
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
                            <span className="custom__error-message">
                              {formik.errors.email}
                            </span>
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
                          {formik.errors.phoneNumber &&
                            formik.touched.phoneNumber && (
                              <span className="custom__error-message">
                                {formik.errors.phoneNumber}
                              </span>
                            )}
                        </Item>
                        <Item label={t("register_class")} required>
                          <Select
                            showSearch
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            placeholder={t("input_select_class")}
                            onChange={(value) =>
                              formik.setFieldValue("selectedClass", value)
                            }
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
                          {formik.errors.selectedClass &&
                            formik.touched.selectedClass && (
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
                  case 2:
                    return (
                      <div>
                        <h6>{t("answer_below_questions")}</h6>
                        {questions?.map((question) => (
                          <div>
                            <Item
                              label={question.content}
                              required={question.isRequired}
                            >
                              <TextArea
                                rows={3}
                                className="upload-cv__note-text"
                                onChange={(e) => changeAnswer(e, question)}
                                onBlur={formik.handleBlur}
                                placeholder={t("input_phone_number")}
                                defaultValue={
                                  cvInfo?.answers.find(
                                    (item) => item.questionId === question._id
                                  )?.content
                                }
                              />
                            </Item>
                          </div>
                        ))}{" "}
                        <Item style={{ padding: "-30px" }}>
                          <Button
                            onClick={() => changePage(-1)}
                            className={`upload-cv__button-prev`}
                          >
                            {t("prev_page")}
                          </Button>
                          <Button
                            onClick={() => changePage(1)}
                            className={`upload-cv__button-next`}
                          >
                            {t("next_page")}
                          </Button>
                        </Item>
                      </div>
                    );
                  case 3:
                    return (
                      <>
                        <Item label={t("uploads_your_cv")} required>
                          <input
                            type="file"
                            accept=".pdf"
                            name="cvFile"
                            onChange={(e) => handleChangePDFFile(e)}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.cvFile && formik.touched.cvFile && (
                            <span className="custom__error-message">
                              {formik.errors.cvFile}
                            </span>
                          )}
                        </Item>
                        <Item label={t("uploads_intro_english_audio")}>
                          <input
                            type="file"
                            accept=".mp3, .mp4"
                            name="intro_audio"
                            onChange={(e) => handleChangeAudioFile(e)}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.audioFile &&
                            formik.touched.audioFile && (
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
                          ></Table>
                          {formik.errors.freeTime &&
                            formik.touched.freeTime && (
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
                      </>
                    );
                }
              })()}
            </div>
          </Form>
        </>
      )}
    </div>
  );
}

export default UploadCV;
