import React from "react";
import ContentDetails from "./ContentDetails";

function TransTable({ format, created, type, currency }) {
  const renderDocs = created?.docs?.map((doc) => {
    return (
      <ContentDetails
        item={doc}
        key={doc?._id}
        type={type}
        format={format}
        currency={currency}
      />
    );
  });

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          {format === "short" ? (
            <tr>
              <th scope="col">
                <small>Title</small>
              </th>
              <th scope="col">
                <small>Amount</small>
              </th>
            </tr>
          ) : (
            <tr>
              <th scope="col">
                <small>Desription</small>
              </th>
              <th scope="col">
                <small>Type</small>
              </th>
              <th scope="col">
                <small>Date</small>
              </th>
              <th scope="col">
                <small>Amount</small>
              </th>
              <th scope="col">
                <small>Action</small>
              </th>
            </tr>
          )}
        </thead>
        <tbody>{renderDocs}</tbody>
      </table>
    </div>
  );
}

export default TransTable;
