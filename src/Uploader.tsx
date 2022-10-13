import React, { useState } from "react";
import axios from "axios";
import { IoMdArrowDropdown, SiConvertio } from "./Icons";
import ImgViewer from "./ImgViewer";

const Uploader = () => {
  const [file, setFile] = useState<File>();
  const [fileType, setFileType] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [newImg, setNewImg] = useState("");

  const uploadFile = () => {
    let url = "http://0.0.0.0:8002/upload_endpoint";

    console.log(file);

    let form = new FormData();
    let randomFileName = fileType + "__" + Math.floor(Math.random()*10000000) +"."+ file?.name.split(".")[1];
    // This does attach the image, even though ts complains
    // @ts-ignore
    form.append("file", file, randomFileName);

    if (file && fileType) {
      axios.post(url, form).then((res) => {
        setNewImg(res.data);
      });
    }
  };

  const attachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("value", e.target.value);
    if (e && e.target && e.target.files) setFile(e.target.files[0]);
  };

  return (
    <div className="uploader">
      <p>Attach your source file:</p>
      <input
        type="file"
        onChange={(e) => attachFile(e)}
        id="file"
        name="myfile"
      />

      <p>Select the file type that you want your file to be converted to:</p>
      <div className="file-selector">
        {isOpen ? (
          <>
            <div
              className="option"
              onClick={() => {
                setFileType("jpg");
                setOpen(false);
              }}
            >
              Jpeg
            </div>
            <div
              className="option"
              onClick={() => {
                setFileType("png");
                setOpen(false);
              }}
            >
              PNG
            </div>
          </>
        ) : (
          <div className="option" onClick={() => setOpen(!isOpen)}>
            <IoMdArrowDropdown />
            {fileType ? fileType : "File type"}
          </div>
        )}
      </div>

      <p>Convert:</p>
      <button type="button" onClick={uploadFile}>
        <SiConvertio />
        Convert
      </button>

      {newImg ? (
        <ImgViewer
          img={newImg}
          imgName={file ? file.name.split(".")[0] + "." + fileType : ""}
        />
      ) : null}
    </div>
  );
};

export default Uploader;
