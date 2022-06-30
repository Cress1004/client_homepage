import { Input } from "antd";
import { Button } from "antd";
import { Form } from "antd";
import React from "react";
const { Item } = Form;
const { TextArea } = Input;

function CVPage2(props) {
  const { t, formik, cvInfo, questions, changePage } = props;

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
    formik.setFieldValue("answers", answers);
  };
  
  return (
    <div>
      <h6>{t("answer_below_questions")}</h6>
      {questions?.map((question) => (
        <div>
          <Item label={question.content} required={question.isRequired}>
            <TextArea
              rows={3}
              className="upload-cv__note-text"
              onChange={(e) => changeAnswer(e, question)}
              onBlur={formik.handleBlur}
              placeholder={t("input_answer")}
              defaultValue={
                cvInfo?.answers.find((item) => item.questionId === question._id)
                  ?.content
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
}

export default CVPage2;
