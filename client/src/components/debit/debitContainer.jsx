import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Debit from "./debit";

let DebitCont = (props) => {
  return <Debit></Debit>;
};

let mapProps = (state) => {};

export default compose(connect(mapProps, {}))(DebitCont);
