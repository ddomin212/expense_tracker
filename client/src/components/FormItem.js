import React from "react";

function FormItem({ formik, name, type }) {
  return (
    <>
      <div className="mb-3 input-group">
        <input
          value={formik.values[name]}
          onChange={formik.handleChange(name)}
          onBlur={formik.handleBlur(name)}
          className="form-control"
          type={type ? type : "text"}
          placeholder={`Enter ${name}`}
        />
      </div>
      <div className="text-danger mb-2">
        {formik.touched[name] && formik.errors[name]}
      </div>
    </>
  );
}

export default FormItem;
