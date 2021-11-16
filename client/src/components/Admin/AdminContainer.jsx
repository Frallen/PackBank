import React, { useEffect } from "react";
import { connect } from "react-redux";
import Admin from "./admin";
import {
  CreateBank,
  GetBank,
  DeleteBank,
  GetDebetCards,
  CreateDebetCard,
} from "./../../redux/adminReducer";

const AdminCont = (props) => {
  useEffect(() => {
    props.GetBank();
    props.GetDebetCards();
  }, [props.succ === true]);

  /* useEffect(() => {
    
  }, [props.succ === true]);
*/
  let CreateDebetCard = (data) => {
    props.CreateDebetCard(data);
  };

  let CreateBank = (data) => {
    //создать банк
    props.CreateBank(data);
  };

  let DeleteBank = (id) => {
    //удалить банк
    props.DeleteBank(id);
  };

  return (
    <Admin
      CreateBank={CreateBank}
      DeleteBank={DeleteBank}
      CreateDebetCard={CreateDebetCard}
      {...props}
    ></Admin>
  );
};

let MapState = (state) => {
  return {
    data: state.admin.data,
    dataDebet: state.admin.dataDebet,
    succ: state.admin.succ,
  };
};

export default connect(MapState, {
  CreateBank,
  GetBank,
  DeleteBank,
  GetDebetCards,
  CreateDebetCard,
})(AdminCont);
