import { Admin } from "../components/Api/api";

const SubmitStart = "SubmitStart";
const SubmitEnd = "SubmitEnd";
const Error = "Error";

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
        succ: action.succ,
        data: action.data,
        dataDebet: action.dataDebet,
      };
    case Error:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default AdminReducer;
//создать банк
export const CreateBank = (data) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    await Admin.NewBank(data);

    dispatch({ type: SubmitEnd, succ: true });
  } catch (err) {
    dispatch({ type: Error, error: err.response.data.message });
  }
};
//получить записи о всех банках
export const GetBank = () => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.GetBanks();

    dispatch({ type: SubmitEnd, data: snap.data });
  } catch (err) {
    dispatch({ type: Error, error: err.response.data.message });
  }
};
//удалить банк
export const DeleteBank = (id) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    await Admin.DeleteBank(id);
    dispatch({ type: SubmitEnd, succ: true });
  } catch (err) {
    dispatch({ type: Error, error: err.response.data.message });
  }
};

//создать дебетовую карту
export const CreateDebetCard = (data) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    await Admin.CreateDebet(data);
    dispatch({ type: SubmitEnd, succ: true });
  } catch (err) {
    dispatch({ type: Error, error: err.response.data.message });
  }
};
//получить дебетовые карты
export const GetDebetCards =()=> async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.GetALLDebet();
    dispatch({ type: SubmitEnd, dataDebet: snap.data });
  } catch (err) {
    dispatch({ type: Error, error: err.response.data.message });
  }
};
