import { Admin } from "../components/Api/api";

const SubmitStart = "SubmitStart";
const SubmitEnd = "SubmitEnd";
const Error = "Error";
const Clean = "Clean";
const GetDataBank = "GetDataBank";
const UpdateOneBank = "UpdateOneBank";
const GetDataDebet = "GetDataDebet";
const DeleteB = "DeleteB";
const DeleteD = "DeleteD";

let initialValues = {
  loading: false,
  error: null,
  succ: false,
  data: [],
  dataDebet: [],
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
    case GetDataBank:
      //в имеющися массив data(будь он пустой или нет)
      // копирую новый пришедший массив/объект и создаю новый
      // получается в массив data засовываю новые данные
      return { ...state, data: state.data.concat(action.data) };
    /*    case UpdateOneBank:
      return {
        ...state,
        data: action.data.map((p) => p._id === state.data.filter((item) => item._id === action.data._id)),
      };*/

    case GetDataDebet:
      return {
        ...state,
        dataDebet: state.dataDebet.concat(action.dataDebet),
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

    dispatch({ type: GetDataBank, data: snap.data });
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

//удалить банк
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
