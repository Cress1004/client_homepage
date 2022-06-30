import React, { useState } from "react";
import styles from "./styles.module.css";
import ReactMediaRecorder from "./ReactMediaRecorder";

function RecorderComponent(props) {
  const { formik, isVideo } = props;
  const mediaRecorderOptions = {
    mimeType: "video/webm;codecs=h264",
  };

  const [recording, setRecording] = useState(false);
  const [pauseRecord, setPauseRecord] = useState(false);
  const [stopRecord, setStopRecord] = useState(false);
  const [save, setSave] = useState(false);
  const [retry, setRetry] = useState(false);

  const handleStartRecording = (startRecording) => {
    setRecording(true);
    setRecording(true);
    setPauseRecord(false);
    startRecording();
  };

  const handlePauseRecording = (pauseRecording) => {
    setPauseRecord(true);
    pauseRecording();
  };

  const handleStopRecording = async (stopRecording, mediaBlob) => {
    setRecording(false);
    setStopRecord(true);
    stopRecording();
    setRetry(false);
  };

  const saveRecording = async (mediaBlob) => {
    setSave(true);
    setRecording(false);
    setStopRecord(false);

    const file = await fetch(mediaBlob)
      .then((r) => r.blob())
      .then(
        (blobFile) => new File([blobFile], "audioFile", { type: blobFile.type })
      );
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      formik.setFieldValue("audioFile", file);
    }
  };

  const resetRecord = () => {
    setSave(false);
    setRecording(false);
    setStopRecord(false);
    setRetry(true);
  };

  function renderVideo({
    status,
    startRecording,
    pauseRecording,
    stopRecording,
    mediaBlob,
  }) {
    return (
      <div>
        <div className={styles.recorder_library_box}>
          <div className={styles.recorder_box}>
            <div className={styles.recorder_box_inner}>
              <div className={styles.reco_header}>
                <h5 className={styles.h5}>{status}</h5>
                <span className={styles.close_icons}></span>
              </div>

              <div className={styles.record_section}>
                <div className={styles.btn_wrapper}>
                  {/* {isVideo ? (
                    <button
                      onClick={() => saveRecording(mediaBlob)}
                      className={`${styles.btn} ${styles.watch_btn}`}
                      disabled={!mediaBlob}
                    >
                      Watch
                    </button>
                  ) : null} */}
                  <button
                    onClick={() => saveRecording(mediaBlob)}
                    className={`${styles.btn} ${styles.save_btn}`}
                    disabled={!mediaBlob}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => resetRecord()}
                    className={`${styles.btn} ${styles.clear_btn}`}
                  >
                    Retry
                  </button>
                </div>
                <div className={styles.duration_section}>
                  <div className={styles.audio_section}>
                    {isVideo ? null : (
                      <>
                        {" "}
                        {mediaBlob && !retry ? (
                          <video width="320" height="240" controls>
                            <source src={mediaBlob} type="video/mp4" />
                          </video>
                        ) : null}
                      </>
                    )}
                  </div>
                  <div className={styles.duration}>
                    {/* <span className={styles.mins}>
                    {time.m !== undefined
                      ? `${time.m <= 9 ? "0" + time.m : time.m}`
                      : "00"}
                  </span>
                  <span className={styles.divider}>:</span>
                  <span className={styles.secs}>
                    {time.s !== undefined
                      ? `${time.s <= 9 ? "0" + time.s : time.s}`
                      : "00"}
                  </span> */}
                  </div>
                  {!recording ? (
                    <p className={styles.help}>
                      {save ? (
                        <span>Your record has been saved</span>
                      ) : (
                        <>
                          {" "}
                          {mediaBlob && !retry ? null : (
                            <span>Press the microphone to record</span>
                          )}
                        </>
                      )}
                    </p>
                  ) : (
                    <p className={styles.help}>{`Recording ${
                      isVideo ? "video" : "audio"
                    }`}</p>
                  )}
                </div>
                {!recording ? (
                  <>
                    {save || (!retry && mediaBlob) ? null : (
                      <a
                        onClick={() => handleStartRecording(startRecording)}
                        href=" #"
                        className={styles.mic_icon}
                      >
                        <span className={styles.microphone_icon_sec}>
                          <svg
                            className={styles.mic_icon_svg}
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 1000 1000"
                            enableBackground="new 0 0 1000 1000"
                          >
                            <g>
                              <path d="M500,683.8c84.6,0,153.1-68.6,153.1-153.1V163.1C653.1,78.6,584.6,10,500,10c-84.6,0-153.1,68.6-153.1,153.1v367.5C346.9,615.2,415.4,683.8,500,683.8z M714.4,438.8v91.9C714.4,649,618.4,745,500,745c-118.4,0-214.4-96-214.4-214.4v-91.9h-61.3v91.9c0,141.9,107.2,258.7,245,273.9v124.2H346.9V990h306.3v-61.3H530.6V804.5c137.8-15.2,245-132.1,245-273.9v-91.9H714.4z" />
                            </g>
                          </svg>
                        </span>
                      </a>
                    )}
                  </>
                ) : (
                  <div className={styles.record_controller}>
                    <a
                      onClick={() =>
                        handleStopRecording(stopRecording, mediaBlob)
                      }
                      href=" #"
                      className={`${styles.icons} ${styles.stop}`}
                      disabled={stopRecord}
                    >
                      <span className={styles.stop_icon}></span>
                    </a>
                    <a
                      onClick={
                        !pauseRecord
                          ? () => handlePauseRecording(pauseRecording)
                          : () => handleStartRecording(startRecording)
                      }
                      href=" #"
                      className={`${styles.icons} ${styles.pause}`}
                      disabled={stopRecord}
                    >
                      {pauseRecord ? (
                        <span className={styles.play_icons}></span>
                      ) : (
                        <span className={styles.pause_icons}></span>
                      )}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ReactMediaRecorder
      video={isVideo}
      mediaRecorderOptions={mediaRecorderOptions}
      render={renderVideo}
      askPermissionOnMount={true}
    />
  );
}

export default RecorderComponent;
