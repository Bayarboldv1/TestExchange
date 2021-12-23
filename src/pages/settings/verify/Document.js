import { useState, useContext, useEffect } from "react";
import { message } from "antd";
import Service from "../../../service/user/index";
import { toBase64 } from "./Share/helper";
import { useHistory } from "react-router";
import DocumentCropImage from "./DocumenCropImage";
import { SiteContext } from "../../../context/SiteContext/SiteContext";
import { UserConsumer } from "../../../context/UserContext";
import { ThemeConsumer } from "../../../context/ThemeContext/ThemeContext";
let imgType = ["image/png", "image/jpg", "image/jpeg"];

function Document() {
  let history = useHistory();
  const currentUser = useContext(SiteContext);
  const changeIdVerification = useContext(SiteContext);
  const [status, setstatus] = useState("loading");
  const [loading, setloading] = useState(false);
  const [files, setfiles] = useState({
    IDBackImage: null,
    IDFrontImage: null,
  });
  function refresh() {
    window.location.reload(false);
  }

  console.log("files", files);

  const [picture, setPicture] = useState({
    path: "",
    type: "",
  });

  const [show, setshow] = useState(false);

  const onSendHandler = () => {
    try {
      if (!files["IDBackImage"] || !files["IDFrontImage"]) {
        return message.error("Зургыг гүйцэт оруулна уу!");
      }
      setloading(true);
      const formData = new FormData();
      formData.append("IDFrontImage", files["IDFrontImage"]);
      formData.append("IDBackImage", files["IDBackImage"]);
      console.log("Formdata", formData);
      Service.saveIdInfo(formData)
        .then((res) => {
          if (res.data.status === 200) {
            message.success("Таны хүсэлтийг амжилттай илгээлээ");
            // history.push("/settings");
            // setTimeout(function () {
            //   window.location.reload(false);
            // }, 800);
            setstatus("done");
            setTimeout(() => 7000);
          } else {
            setloading(false);
            message.error("Алдаа гарлаа");
          }
        })
        .catch((e) => {
          e.response?.status === 400
            ? message.error(e.response?.data?.message)
            : message.error("Алдаа гарлаа");
          setloading(false);
        });
    } catch (e) {
      return message.error("Алдаа гарлаа...");
    }
  };

  const onHideHandler = () => {
    setPicture({
      path: " ",
      type: "",
    });
    setshow(false);
  };
  const onChangeHandler = async (event, type) => {
    if (event.target.files.length > 0) {
      let data = event.target.files[0];
      if (!imgType.includes(data.type)) {
        return message.error("Та зөвхөн JPG,JPEG болон PNG зураг оруулна уу ?");
      }
      if (8388608 < data.size) {
        return message.error("Таны зургийн хэмжээ нь 8 MB-аас ихгүй байна. ");
      }
      setPicture({
        ...picture,
        path: await toBase64(event.target.files[0]),
        type: type,
      });
      setshow(true);
      event.target.value = "";
    }
  };

  // useEffect(() => {
  //   onSendHandler();
  // }, []);
  return (
    <>
      <div className="container">
        <div className="header mt-5 d-flex justify-content-center">
          <ThemeConsumer>
            {({ data }) => {
              return (
                <h3
                  className="card-title"
                  style={{ color: data.theme === "dark" ? "white" : "black" }}
                >
                  Хэрэглэгчийн мэдээлэл баталгаажуулах{" "}
                </h3>
              );
            }}
          </ThemeConsumer>
        </div>
        <UserConsumer>
          {({ user }) => {
            return user.user.statusId === 3 ? (
              <>
                <div className="body row">
                  <div className="w-100 mt-5 mb-3 ">
                    <p className="alert alert-warning">
                      <strong>
                        Таны иргэний үнэмлэх дээрх мэдээлэл тод, гаргацтай байх
                        шаардлагатай болохыг анхаарана уу.
                      </strong>
                    </p>
                  </div>
                  <div className="col">
                    <div className="card">
                      <p>Иргэний үнэмлэхийн урд талын зураг</p>
                      <div className="uploadCard">
                        <label className="fileUpload">
                          <input
                            style={{ display: "none" }}
                            type="file"
                            onChange={(e) => onChangeHandler(e, "IDFrontImage")}
                          />
                          {files.IDFrontImage && (
                            <img
                              src={"/img/done.png"}
                              style={{ borderRadius: 5 }}
                              className=" d-flex justify-content-center"
                              alt="FrontImage"
                            />
                          )}
                        </label>
                        :
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card">
                      <p>Иргэний үнэмлэхийн ард талын зураг</p>
                      <div className="uploadCard">
                        <label className="fileUpload">
                          <input
                            style={{ display: "none" }}
                            class="hidden"
                            type="file"
                            onChange={(e) => onChangeHandler(e, "IDBackImage")}
                          />
                          {files.IDBackImage && (
                            <img
                              src={"/img/done.png"}
                              width="max-content"
                              style={{
                                borderRadius: 5,
                              }}
                              className=" d-flex justify-content-center"
                              alt="BackImage"
                            />
                          )}
                        </label>
                        :
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-success mt-3 d-flex justify-content-center"
                  onClick={() => (loading ? null : onSendHandler())}
                  disabled={loading}
                >
                  {loading ? <img src={"svg/loading.svg"} /> : "Илгээх"}
                </button>

                {show && (
                  <DocumentCropImage
                    show={show}
                    handleCancel={() => onHideHandler()}
                    // imgz={imgz}
                    picture={picture}
                    setfiles={setfiles}
                    files={files}
                  />
                )}
              </>
            ) : user.user.statusId === 6 ? (
              <>
                <div className="body row">
                  <div className="w-100 d-flex justify-content-center">
                    <img src="svg/idVerify/alert.svg" />
                  </div>
                  <div className="w-100 ">
                    <p className="alert alert-danger">
                      <strong>
                        Таны иргэний үнэмлэх баталгаажуулалт буцаагдсан байна.
                        Та дахин хүсэлт илгээнэ үү
                      </strong>
                    </p>
                  </div>
                  <div className="w-100 mt-2 mb-3">
                    <p className="alert alert-warning">
                      <strong>
                        Таны иргэний үнэмлэх дээрх мэдээлэл тод, гаргацтай байх
                        шаардлагатай болохыг анхаарана уу.
                      </strong>
                    </p>
                  </div>
                  <div className="col">
                    <div className="card">
                      <p>Иргэний үнэмлэхийн урд талын зураг</p>
                      <div className="uploadCard">
                        <label className="fileUpload">
                          <input
                            style={{ display: "none" }}
                            type="file"
                            onChange={(e) => onChangeHandler(e, "IDFrontImage")}
                          />
                          {files.IDFrontImage && (
                            <img
                              src={"/img/done.png"}
                              style={{ borderRadius: 5 }}
                              className=" d-flex justify-content-center"
                              alt="FrontImage"
                            />
                          )}
                        </label>
                        :
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card">
                      <p>Иргэний үнэмлэхийн ард талын зураг</p>
                      <div className="uploadCard">
                        <label className="fileUpload">
                          <input
                            style={{ display: "none" }}
                            class="hidden"
                            type="file"
                            onChange={(e) => onChangeHandler(e, "IDBackImage")}
                          />
                          {files.IDBackImage && (
                            <img
                              src={"/img/done.png"}
                              width="max-content"
                              style={{
                                borderRadius: 5,
                              }}
                              className=" d-flex justify-content-center"
                              alt="BackImage"
                            />
                          )}
                        </label>
                        :
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-success mt-3 d-flex justify-content-center"
                  onClick={() => (loading ? null : onSendHandler())}
                  disabled={loading}
                >
                  {loading ? <img src={"svg/loading.svg"} /> : "Илгээх"}
                </button>

                {show && (
                  <DocumentCropImage
                    show={show}
                    handleCancel={() => onHideHandler()}
                    // imgz={imgz}
                    picture={picture}
                    setfiles={setfiles}
                    files={files}
                  />
                )}
              </>
            ) : user.user.statusId === 5 ? (
              <>
                <div className="w-100 mt-5 mb-5">
                  <p className="alert alert-success">
                    <strong>
                      Таны иргэний үнэмлэх баталгаажуулалт шалгагдаж байна.
                    </strong>
                  </p>
                </div>
                <div className="d-flex justify-content-center">
                  <img src="svg/idVerify/looking.svg" />
                </div>
              </>
            ) : (
              <></>
            );
          }}
        </UserConsumer>
      </div>
    </>
  );
}
export default Document;

// {currentUser?.idVerification === 6 && (
//   <div className="w-100 alert alert-danger mb-4">
//     <span>Таны хүсэлт буцаагдсан байна. Та дахин илгээнэ үү ?</span>
//   </div>
// )}
