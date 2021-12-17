import { useState } from "react";
import { dataURLtoFile } from "./Share/helper";
import { Modal } from "antd";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function DocumentCropImage({ imgz, show, handleCancel, setfiles, files }) {
  const [cropper, setCropper] = useState();
  const getCropData = () => {
    try {
      if (typeof cropper !== "undefined") {
        let base64 = cropper.getCroppedCanvas().toDataURL();
        setfiles({
          ...files,
          [imgz.type]: dataURLtoFile(base64, "newimage"),
        });
        handleCancel();
      }
    } catch (e) {
      return;
    }
  };

  return (
    <Modal
      title="Бичиг баримт баталгаажуулалт"
      visible={show}
      onCancel={() => handleCancel()}
      footer={null}
      style={{ width: "auto" }}
    >
      <div className="img_crop_wrapper mtop10">
        {imgz.path && (
          <div className="img_crop_section">
            <Cropper
              style={{ height: "100%", width: "auto" }}
              initialAspectRatio={1}
              preview=".img-preview"
              src={imgz.path}
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
      </div>
    </Modal>
  );
}
export default DocumentCropImage;
