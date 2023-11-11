import React from "react";

const RenderDateSelect = (formik) => {
  return (
    <div className="col-md-4 d-flex d-xl-flex justify-content-evenly align-items-center align-self-center justify-content-xl-center align-items-xl-center">
      <input
        name="startDate"
        className="form-control-lg d-flex justify-content-center align-items-center"
        type="date"
        style={{
          marginRight: "14px",
        }}
        value={formik.values.startDate}
        onChange={formik.handleChange("startDate")}
        onBlur={formik.handleBlur("startDate")}
      />
      <input
        name="endDate"
        className="form-control-lg d-flex justify-content-center align-items-center"
        type="date"
        value={formik.values.endDate}
        onChange={formik.handleChange("endDate")}
        onBlur={formik.handleBlur("endDate")}
      />
    </div>
  );
};

const RenderAmountSelect = (formik) => {
  return (
    <div className="col-md-5 d-flex justify-content-evenly wrap mt-2 mt-md-0">
      <input
        name="min"
        className="form-control-lg"
        type="number"
        style={{
          maxWidth: "30%",
        }}
        placeholder="Min"
        value={formik.values.min}
        onChange={formik.handleChange("min")}
        onBlur={formik.handleBlur("min")}
      />
      <input
        name="max"
        className="form-control-lg"
        type="number"
        style={{
          maxWidth: "30%",
        }}
        placeholder="Max"
        value={formik.values.max}
        onChange={formik.handleChange("max")}
        onBlur={formik.handleBlur("max")}
      />
    </div>
  );
};

const RenderTypeSelect = (formik) => {
  return (
    <div className="col-md-2 d-none d-md-flex justify-content-md-start ">
      <select
        name="type"
        className="form-select-lg d-md-block justify-content-md-center align-items-md-center"
        value={formik.values.type}
        onChange={formik.handleChange("type")}
        onBlur={formik.handleBlur("type")}
      >
        <optgroup label="Typ transakce">
          <option selected value={""}></option>
          <option selected value={"fio"}>
            Fio
          </option>
          <option value={"degiro"}>DeGiro</option>
          <option value={"xtb"}>XTB</option>
        </optgroup>
      </select>
    </div>
  );
};

const Filters = ({ shown, formik }) => {
  return (
    shown && (
      <div>
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <div className="row d-lg-flex d-xl-flex justify-content-lg-center justify-content-xl-center align-items-xl-center">
              <RenderDateSelect formik={formik} />
              <RenderAmountSelect formik={formik} />
              <RenderTypeSelect formik={formik} />
              <div class="col d-flex justify-content-center">
                <input
                  class="btn btn-primary"
                  type="submit"
                  style={{ marginTop: "10px" }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Filters;
