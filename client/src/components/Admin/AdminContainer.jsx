import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Admin from "./admin";
import {
  CreateBank,
  GetBank,
  DeleteBank,
  GetDebetCards,
  CreateDebetCard,
  DeleteResp,
  DeleteDebet,
} from "./../../redux/adminReducer";

const AdminCont = (props) => {
  const [succ] = useState(props.succ === true ? true : false);
  useEffect(() => {
    //
    props.GetBank();
    props.GetDebetCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [succ]);

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

  let DeleteDebet = (id) => {
    props.DeleteDebet(id);
  };
  return (
    <Admin
      DeleteDebet={DeleteDebet}
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
    loading: state.admin.loading,
  };
};

export default connect(MapState, {
  CreateBank,
  GetBank,
  DeleteBank,
  GetDebetCards,
  CreateDebetCard,
  DeleteDebet,
  DeleteResp,
})(AdminCont);
