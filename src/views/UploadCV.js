import React from "react";
import { Form, message } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import "./style/upload-cv.scss";
import * as Yup from "yup";
import { LIMIT_PDF_FILE_SIZE, phoneRegExp } from "../common/constant";
import { calcFileSize } from "../common/function";
import { useState } from "react";
import { useEffect } from "react";
import apis from "../apis";
import ThanksPage from "./ThanksPage";
import CVPage1 from "../components/sections/CV/CVPage1";
import CVPage2 from "../components/sections/CV/CVPage2";
import CVPage3 from "../components/sections/CV/CVPage3";

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
      audioFile: "",
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
      audioFile: Yup.mixed(),
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
        backgroundSize: "500%",
        marginBottom: "-1000px",
        paddingBottom: "1000px",
      }}
    >
      <section className="section pt-0">
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
                        <CVPage1
                          t={t}
                          formik={formik}
                          classList={classList}
                          cvInfo={cvInfo}
                          changePage={changePage}
                        />
                      );
                    case 2:
                      return (
                        <CVPage2
                          t={t}
                          formik={formik}
                          cvInfo={cvInfo}
                          questions={questions}
                          changePage={changePage}
                        />
                      );
                    case 3:
                      return (
                        <CVPage3
                          t={t}
                          formik={formik}
                          fieldError={fieldError}
                          changePage={changePage}
                          setFreeTime={setFreeTime}
                          checkFreeTime={checkFreeTime}
                          cvInfo={cvInfo}
                        />
                      );
                    default:
                      return null;
                  }
                })()}
              </div>
            </Form>
          </>
        )}
      </section>{" "}
    </div>
  );
}

export default UploadCV;
