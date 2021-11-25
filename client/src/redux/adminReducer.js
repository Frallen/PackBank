import { Admin } from "../components/Api/api";

import {
  SubmitStart,
  SubmitEnd,
  Error,
  Clean,
  GetDataBank,
  GetDataDebet,
  GetDataCrd,
  UpdateOneBank,
  UpdateOneDebet,
  UpdateOneCrd,
  DeleteB,
  DeleteD,
  DeleteC,
} from "./const/const.admin";

let initialValues = {
  loading: false,
  error: null,
  succ: false,
  data: [],
  dataDebet: [],
  dataCreditCard: [],
};

const AdminReducer = (state = initialValues, action) => {
  switch (action.type) {
    case SubmitStart:
      return {
        ...state,
        loading: true,
      };
    case SubmitEnd:
      return {
        ...state,
        error: null,
        loading: false,
        succ: true,
      };
    //Получить все банки
    case GetDataBank:
      //в имеющися массив data(будь он пустой или нет)
      // копирую новый пришедший массив/объект и создаю новый
      // получается в массив data засовываю новые данные
      return { ...state, data: state.data.concat(action.data) };
    //Получить все дебетовые карты
    case GetDataDebet:
      return {
        ...state,
        dataDebet: state.dataDebet.concat(action.dataDebet),
      };
    //Получить все кредитные карты
    case GetDataCrd:
      return {
        ...state,
        dataCreditCard: state.dataCreditCard.concat(action.dataCreditCard),
      };

    case UpdateOneBank:
      return {
        ...state,
        data: state.data.map((p) =>
          p._id === action.data._id ? action.data : p
        ),
      };
    case UpdateOneDebet:
      return {
        ...state,
        dataDebet: state.dataDebet.map((p) =>
          p._id === action.data._id ? action.data : p
        ),
      };
    case UpdateOneCrd:
      return {
        ...state,
        dataCreditCard: state.dataCreditCard.map((p) =>
          p._id === action.data._id ? action.data : p
        ),
      };

    //удалить банк
    case DeleteB:
      return {
        ...state,
        //  фильтрую массив,   возвращаю те элементы которые не равны удалленному id
        //беру имеющиеся данные банка, проверяю каждый элемент и возвращаю те которые не равны удаленному id
        data: state.data.filter((item) => item._id !== action.id),
      };
    //удалить дебет
    case DeleteD:
      return {
        ...state,
        //  фильтрую массив,   возвращаю те элементы которые не равны удалленному id
        //беру имеющиеся данные банка, проверяю каждый элемент и возвращаю те которые не равны удаленному id
        dataDebet: state.dataDebet.filter((item) => item._id !== action.id),
      };
    //Удалить кредитную карту
    case DeleteC:
      return {
        ...state,
        //  фильтрую массив,   возвращаю те элементы которые не равны удалленному id
        //беру имеющиеся данные банка, проверяю каждый элемент и возвращаю те которые не равны удаленному id
        dataCreditCard: state.dataCreditCard.filter(
          (item) => item._id !== action.id
        ),
      };
    case Error:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case Clean: {
      return {
        ...state,
        succ: false,
        data: null,
      };
    }
    default:
      return state;
  }
};

export const Clear = () => ({ type: Clean });

export default AdminReducer;
//создать банк
export const CreateBank = (data) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.NewBank(data);

    dispatch({ type: SubmitEnd });
    //получаю банк в виде объекта
    dispatch({ type: GetDataBank, data: snap.data.bank });
  } catch (err) {
    dispatch({ type: Error, error: err.message });
  }
};

//получить записи о всех банках
export const GetBank = () => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.GetBanks();

    dispatch({ type: SubmitEnd });
    dispatch({ type: GetDataBank, data: snap.data });
  } catch (err) {
    dispatch({ type: Error, error: err.message });
  }
};
//получить записи о всех банках
export const UpadteBank = (data) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.UpdateBank(data);

    dispatch({ type: SubmitEnd });

    dispatch({ type: UpdateOneBank, data: snap.data });
  } catch (err) {
    dispatch({ type: Error, error: err.message });
  }
};
//удалить банк
export const DeleteBank = (id) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.DeleteBank(id);

    dispatch({ type: SubmitEnd });
    dispatch({ type: DeleteB, id: snap.data.id });
  } catch (err) {
    dispatch({ type: Error, error: err.message });
  }
};
//получить дебетовые карты
export const GetDebetCards = () => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.GetALLDebet();
    dispatch({ type: SubmitEnd });
    dispatch({ type: GetDataDebet, dataDebet: snap.data });
  } catch (err) {
    dispatch({ type: Error, error: err.message });
  }
};
//создать дебетовую карту
export const CreateDebetCard = (data) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.CreateDebet(data);
    dispatch({ type: SubmitEnd, succ: true });
    dispatch({ type: GetDataDebet, dataDebet: snap.data.card });
  } catch (err) {
    dispatch({ type: Error, error: err.message });
  }
};
//обновить дебетовую карту

export const UpdateDebetCard = (data) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.UpdateDebet(data);
    dispatch({ type: SubmitEnd });
    dispatch({ type: UpdateOneDebet, data: snap.data });
  } catch (err) {
    dispatch({ type: Error, error: err.message });
  }
};

//удалить дебетовую карту
export const DeleteDebet = (id) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.DeleteDebet(id);

    dispatch({ type: SubmitEnd });
    dispatch({ type: DeleteD, id: snap.data.id });
  } catch (err) {
    dispatch({ type: Error, error: err.message });
  }
};

//получить кредитные карты
export const GetCreditCards = () => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.GetALLCreditCrd();
    dispatch({ type: SubmitEnd });
    dispatch({ type: GetDataCrd, dataCreditCard: snap.data });
  } catch (err) {
    dispatch({ type: Error, error: err.message });
  }
};
//создать кредитную карту
export const CreateCreditCard = (data) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.CreateCreditCard(data);
    dispatch({ type: SubmitEnd, succ: true });
    dispatch({ type: GetDataCrd, dataCreditCard: snap.data.cardcrd });
  } catch (err) {
    dispatch({ type: Error, error: err.message });
  }
};
//обновить кредитную карту

export const UpdateCreditCard = (data) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.UpdateCreditCrd(data);
    dispatch({ type: SubmitEnd });
    dispatch({ type: UpdateOneCrd, data: snap.data });
  } catch (err) {
    dispatch({ type: Error, error: err.message });
  }
};

//удалить кредитную карту
export const DeleteCreditCard = (id) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.DeleteCreditCrd(id);

    dispatch({ type: SubmitEnd });
    dispatch({ type: DeleteC, id: snap.data.id });
  } catch (err) {
    dispatch({ type: Error, error: err.message });
  }
};
