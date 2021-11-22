import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Admin from "./admin";
import {
  CreateBank,
  GetBank,
  DeleteBank,
  GetDebetCards,
  CreateDebetCard,
  DeleteDebet,
  UpadteBank,
} from "./../../redux/adminReducer";

const AdminCont = (props) => {
  const [succ] = useState(props.succ === true ? true : false);
  useEffect(() => {
    //
    props.GetBank();
    props.GetDebetCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [succ]);

  let CreateBank = (data) => {
    //создать банк
    props.CreateBank(data);
  };

  let UpadteBank = (data) => {
    //обновляю банк
    props.UpadteBank(data);
  };
  let DeleteBank = (id) => {
    //удалить банк
    props.DeleteBank(id);
  };
  let CreateDebetCard = (data) => {
    //создать дебетовую карту
    props.CreateDebetCard(data);
  };

  let DeleteDebet = (id) => {
    //удалить дебетовую карту
    props.DeleteDebet(id);
  };
  return (
    <Admin
      DeleteDebet={DeleteDebet}
      CreateBank={CreateBank}
      DeleteBank={DeleteBank}
      CreateDebetCard={CreateDebetCard}
      UpadteBank={UpadteBank}
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
  UpadteBank,
})(AdminCont);
