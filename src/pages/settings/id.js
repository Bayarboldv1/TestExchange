import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import ImageUpload from "../../components/ImageUpload";

// import { useState, useContext, useEffect } from "react";
// import { message } from "antd";
// import Service from "./verify/Service/Index";
// import { toBase64 } from "./verify/helper";
// import DocumentCropImage from "./DocumenCropImage";
// import { SiteContext } from "../../context/SiteContext/SiteContext";
// let imgType = ["image/png", "image/jpg", "image/jpeg"];

function Id() {
  return (
    <>
      <div className="container">
        <div className="header mt-5">
          <h2> Хэрэглэгчийн мэдээлэл баталгаажуулах</h2>
        </div>
        <div className="body row">
          <div className="col">
            <div className="card">
              <p>Иргэний үнэмлэхийн урд талын зураг</p>
              <div className="card">
                <ImageUpload />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <p>Иргэний үнэмлэхийн ард талын зураг</p>
              <div className="card">
                <ImageUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // const {
  //   state: { currentUser },
  //   changeIdVerification,
  // } = useContext(SiteContext);
  // const [status, setstatus] = useState("loading");
  // const [loading, setloading] = useState(false);
  // const [files, setfiles] = useState({
  //   idBack: null,
  //   idFront: null,
  // });
  // const [imgz, setimgz] = useState({
  //   path: " ",
  //   type: "",
  // });
  // const [show, setshow] = useState(false);
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

  // const onSendHandler = () => {
  //   try {
  //     if (!files["idBack"] || !files["idFront"]) {
  //       return message.error("Зургыг гүйцэт оруулна уу!");
  //     }
  //     setloading(true);
  //     const formData = new FormData();
  //     formData.append("idBack", files["idBack"]);
  //     formData.append("idFront", files["idFront"]);
  //     Service.storeDocumentImage(formData)
  //       .then((res) => {
  //         if (res) {
  //           setTimeout(() => {
  //             gt();
  //           }, 7000);
  //         } else {
  //           message.error("Алдаа гарлаа");
  //         }
  //       })
  //       .catch((e) => {
  //         e.response?.status === 400
  //           ? message.error(e.response?.data?.error)
  //           : message.error("Алдаа гарлаа");
  //       });
  //   } catch (e) {
  //     return;
  //   }
  // };

  // const onHideHandler = () => {
  //   setimgz({
  //     path: " ",
  //     type: "",
  //   });
  //   setshow(false);
  // };
  // const onChangeHandler = async (event, type) => {
  //   if (event.target.files.length > 0) {
  //     let data = event.target.files[0];
  //     if (!imgType.includes(data.type)) {
  //       return message.error("Та зөвхөн JPG,JPEG болон PNG зураг оруулна уу ?");
  //     }
  //     if (8388608 < data.size) {
  //       return message.error("Таны зургийн хэмжээ нь 8 MB-аас ихгүй байна. ");
  //     }
  //     setimgz({
  //       ...imgz,
  //       path: await toBase64(event.target.files[0]),
  //       type: type,
  //     });
  //     setshow(true);
  //     event.target.value = "";
  //   }
  // };

  // if (currentUser?.idVerification === 1) {
  //   return (
  //     <>
  //       {status !== "loading" && (
  //         <div className="w-100 alert alert-secondary">
  //           <p>Таны хүсэлт хүлээгдэж буй төлөвт байна</p>
  //         </div>
  //       )}
  //     </>
  //   );
  // }
  // if (currentUser?.idVerification === 3) {
  //   return (
  //     <div className="w-100 alert alert-success mb-4">
  //       <span>Таны бичиг баримт баталгаажсан байна.</span>
  //     </div>
  //   );
  // }
  // return (
  //   <div className="w-100">
  //     {currentUser?.idVerification === 2 && (
  //       <div className="w-100 alert alert-danger mb-4">
  //         <span>Таны хүсэлт буцаагдсан байна. Та дахин илгээнэ үү ?</span>
  //       </div>
  //     )}
  //     <div className="w-100 mt-5 mb-5">
  //       <p className="alert alert-danger">
  //         <strong>
  //           Таны иргэний үнэмлэх дээрх мэдээлэл тод, гаргацтай байх шаардлагатай
  //           болохыг анхаарана уу.
  //         </strong>
  //       </p>
  //     </div>
  //     <div className="w-100">
  //       <label className="white-c">Иргэний үнэмлэхний урд талын зураг :</label>{" "}
  //       <label className="custom-file-upload">
  //         <input type="file" onChange={(e) => onChangeHandler(e, "idFront")} />
  //         Зураг хуулах
  //       </label>
  //       {files.idFront && (
  //         <img
  //           src="/img/done.png"
  //           width="30px"
  //           height="20px"
  //           className="ml-4"
  //           alt="FrontImage"
  //         />
  //       )}
  //     </div>

  //     <div className="w-100 mt-5">
  //       <label className="white-c">Иргэний үнэмлэхний ард талын зураг : </label>{" "}
  //       <label className="custom-file-upload">
  //         <input type="file" onChange={(e) => onChangeHandler(e, "idBack")} />
  //         Зураг хуулах
  //       </label>
  //       {files.idBack && (
  //         <img
  //           src="/img/done.png"
  //           width="30px"
  //           height="20px"
  //           className="ml-4"
  //           alt="BackImage"
  //         />
  //       )}
  //     </div>
  //     <div className="w-100 mt-5">
  //       <button
  //         className="btn btn-primary"
  //         onClick={() => (loading ? null : onSendHandler())}
  //         disabled={loading}
  //       >
  //         {loading ? "Илгээж байна..." : "Илгээх"}
  //       </button>
  //     </div>
  //     {show && (
  //       <DocumentCropImage
  //         show={show}
  //         handleCancel={() => onHideHandler()}
  //         imgz={imgz}
  //         setfiles={setfiles}
  //         files={files}
  //       />
  //     )}
  //   </div>
  // );
}

export default Id;
