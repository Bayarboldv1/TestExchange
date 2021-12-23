import { useState } from "react";
import { dataURLtoFile } from "./Share/helper";
import { Modal } from "antd";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function DocumentCropImage({ show, handleCancel, setfiles, files, picture }) {
  const [cropper, setCropper] = useState();

  const getCropData = () => {
    try {
      if (typeof cropper !== "undefined") {
        let img = cropper.getCroppedCanvas().toDataURL("image/jpeg", 0.9);
        setfiles({
          ...files,
          [picture.type]: dataURLtoFile(img, "newimage"),
        });
        // img.rotate(90)

        handleCancel();
      }
    } catch (e) {
      return;
    }
  };

  return (
    <Modal
      bodyStyle={{ height: 420 }}
      title="Бичиг баримт баталгаажуулалт"
      visible={show}
      onCancel={() => handleCancel()}
      footer={
        <div className="w-100 mt-2">
          <button className="btn btn-primary" onClick={() => getCropData()}>
            Сонгох
          </button>
          <button
            className="btn btn-danger ml-2"
            onClick={() => handleCancel()}
          >
            Буцах
          </button>
        </div>
      }
      style={{ width: "auto" }}
    >
      <div className="img_crop_wrapper mtop10 ">
        {picture.path && (
          <div className="img_crop_section">
            <Cropper
              style={{ height: 400, width: "auto" }}
              initialAspectRatio={1}
              preview=".img-preview"
              src={picture.path}
              viewMode={1}
              guides={true}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
          </div>
        )}
      </div>
    </Modal>
  );
}
export default DocumentCropImage;
