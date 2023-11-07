import React from "react";
import TransactionTable from "../TransactionTable";
class TransactionsBoth extends React.Component {
  render() {
    return (
      <div
        className="container"
        style={{
          marginTop: "30px",
        }}
      >
        <div className="row">
          <div className="col-md-6">
            <TransactionTable type="income" format="short" />
          </div>
          <div className="col-md-6">
            <TransactionTable type="expense" format="short" />
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionsBoth;
