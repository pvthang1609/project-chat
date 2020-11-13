import React from "react";
import './fileField.scss'

export default function FileField(props) {
  const { field, form } = props;
  const { value } = field;
  const { files } = value;

  const handleChange = (event) => {
    form.setFieldValue("files", event.currentTarget.files);
  };
  return (
    <div>
      <div className="review-image">
        {files
          ? Object.values(files).map((e, index) => (
              <img key={index} src={window.URL.createObjectURL(e)} alt="none" />
            ))
          : null}
      </div>
      <input
        id="files"
        name="files"
        type="file"
        onChange={handleChange}
        multiple
        accept="image/*"
      />
    </div>
  );
}
