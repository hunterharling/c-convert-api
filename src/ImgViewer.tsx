import React from "react";

const ImgViewer: React.FC<{
  img: string;
  imgName: string;
}> = (props) => {
  return (
    <div className="img-viewer">
      <p>{props.imgName}</p>
      <img src={"/uploads/"+props.img} />
    </div>
  );
};

export default ImgViewer;
