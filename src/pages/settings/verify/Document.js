import { useState, useContext, useEffect } from "react";
import { message } from "antd";
import Service from "../../../service/user/index";
import { toBase64 } from "./Share/helper";
import DocumentCropImage from "./DocumenCropImage";
import { SiteContext } from "../../../context/SiteContext/SiteContext";
let imgType = ["image/png", "image/jpg", "image/jpeg"];

function Document() {
  const currentUser = useContext(SiteContext);
  const changeIdVerification = useContext(SiteContext);
  const [status, setstatus] = useState("loading");
  const [loading, setloading] = useState(false);
  const [files, setfiles] = useState({
    IDBackImage: null,
    IDFrontImage: null,
  });

  const [picture, setPicture] = useState(null);
  const [backPicture, setBackPicture] = useState(null);

  const [imgz, setimgz] = useState({
    path: " ",
    type: "",
  });
  const [show, setshow] = useState(false);
  // useEffect(() => {
  //   if (currentUser?.idVerification === 1) {
  //     getStatus();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const getStatus = () => {
  //   try {
  //     Service.checkUserStatusId()
  //       .then((res) => {
  //         if (res?.data) changeIdVerification(res.data);
  //       })
  //       .catch((e) => {
  //         setstatus("fail");
  //       })
  //       .finally((e) => {
  //         setstatus("fail");
  //       });
  //   } catch (e) {
  //     return;
  //   }
  // };

  // const gt = () => {
  //   try {
  //     Service.checkUserStatusId()
  //       .then((res) => {
  //         if (res?.data) {
  //           changeIdVerification(res.data);
  //           message.success("Таны хүсэлтийг амжилттай илгээлээ");
  //           setstatus("done");
  //           setimgz({
  //             path: " ",
  //             type: "",
  //           });
  //         }
  //       })
  //       .catch((e) => {
  //         changeIdVerification(1);
  //       })
  //       .finally((e) => {
  //         setloading(false);
  //       });
  //   } catch (e) {
  //     window.location.reload();
  //   }
  // };

  const onSendHandler = () => {
    try {
      if (!files["IDBackImage"] || !files["IDFrontImage"]) {
        return message.error("Зургыг гүйцэт оруулна уу!");
      }
      setloading(true);
      const formData = new FormData();

      formData.append("IDFrontImage", files["IDFrontImage"]);
      formData.append("IDBackImage", files["IDBackImage"]);
      Service.saveIdInfo(formData)
        .then((res) => {
          if (res.data.status === 200) {
            message.success("Таны хүсэлтийг амжилттай илгээлээ");
            setstatus("done");
            setTimeout(() => 7000);
          } else {
            message.error("Алдаа гарлаа1");
          }
        })
        .catch((e) => {
          e.response?.status === 400
            ? message.error(e.response?.data?.error)
            : message.error("Алдаа гарлаа2");
        });
    } catch (e) {
      return message.error("Алдаа гарлаа...");
    }
  };

  const onHideHandler = () => {
    setimgz({
      path: " ",
      type: "",
    });
    setshow(false);
  };
  const onChangeHandler = async (event, type) => {
    setPicture(URL.createObjectURL(event.target.files[0]));
    // setBackPicture(URL.createObjectURL(event.target.files[0]));

    if (event.target.files.length > 0) {
      let data = event.target.files[0];
      if (!imgType.includes(data.type)) {
        return message.error("Та зөвхөн JPG,JPEG болон PNG зураг оруулна уу ?");
      }
      if (8388608 < data.size) {
        return message.error("Таны зургийн хэмжээ нь 8 MB-аас ихгүй байна. ");
      }
      setimgz({
        ...imgz,
        path: await toBase64(event.target.files[0]),
        type: type,
      });
      setshow(true);
      event.target.value = "";
    }
  };

  if (currentUser?.idVerification === 1) {
    return (
      <>
        {status !== "loading" && (
          <div className="w-100 alert alert-secondary">
            <p>Таны хүсэлт хүлээгдэж буй төлөвт байна</p>
          </div>
        )}
      </>
    );
  }
  if (currentUser?.idVerification === 3) {
    return (
      <div className="w-100 alert alert-success mb-4">
        <span>Таны бичиг баримт баталгаажсан байна.</span>
      </div>
    );
  }
  return (
    <>
      <div className="container">
        <div className="header mt-5">
          <h2 className="card-title"> Хэрэглэгчийн мэдээлэл баталгаажуулах</h2>
        </div>
        {currentUser?.idVerification === 2 && (
          <div className="w-100 alert alert-danger mb-4">
            <span>Таны хүсэлт буцаагдсан байна. Та дахин илгээнэ үү ?</span>
          </div>
        )}
        <div className="body row">
          <div className="w-100 mt-5 mb-5">
            <p className="alert alert-danger">
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
                      // height="100px"
                      className=" d-flex justify-content-center"
                      alt="FrontImage"
                    />
                  )}
                </label>{" "}
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
                      // height="100px"
                      className=" d-flex justify-content-center"
                      alt="BackImage"
                    />
                  )}
                </label>
                :
              </div>
            </div>
          </div>

          {/* <div className="col">
            <div className="card">
              <p>Иргэний үнэмлэхийн ард талын зураг</p>
              <div className="uploadCard">
                <label className="fileUpload row">
                  <input
                    type="file"
                    onChange={(e) => onChangeHandler(e, "IDBack")}
                  />
                  Зураг хуулах
                </label>
                {files.IDBack && (
                  <img
                    src={picture && picture}
                    width="100px"
                    style={{ borderRadius: 5 }}
                    className=" d-flex justify-content-center"
                    alt="BackImage"
                  />
                )}
              </div>
            </div>
          </div> */}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => (loading ? null : onSendHandler())}
          disabled={loading}
        >
          {loading ? "Илгээж байна..." : "Илгээх"}
        </button>
        {show && (
          <DocumentCropImage
            show={show}
            handleCancel={() => onHideHandler()}
            imgz={imgz}
            setfiles={setfiles}
            files={files}
          />
        )}
      </div>
    </>
    // <div className="w-100">
    //   {currentUser?.idVerification === 2 && (
    //     <div className="w-100 alert alert-danger mb-4">
    //       <span>Таны хүсэлт буцаагдсан байна. Та дахин илгээнэ үү ?</span>
    //     </div>
    //   )}

    //   <div className="w-100">
    //     <label className="white-c">Иргэний үнэмлэхний урд талын зураг :</label>{" "}

    //   </div>

    //   <div className="w-100 mt-5">
    //     <label className="white-c">Иргэний үнэмлэхний ард талын зураг : </label>{" "}

    // </div>
    //   <div className="w-100 mt-5">

    //   </div>

    // </div>
  );
}
export default Document;
