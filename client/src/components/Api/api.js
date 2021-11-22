import * as axios from "axios";

export const Admin = {
  //создать банк
  NewBank(data) {
    return axios
      .post(
        "/api/admin/bank/create",
        {
          name_bank: data.name_bank,
          license: data.license,
          url: data.url,
          phone_number: data.phone_number,
          url_images: data.url_images,
          About: data.About,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => resp);
  },
  //получить все банки
  GetBanks() {
    return axios.get("/api/admin/bank/get").then((resp) => resp);
  },
  //удалить банк
  DeleteBank(id) {
    return axios
      .delete(
        //удаляю банк по url id
        `/api/admin/bank/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => resp);
  },
  //обновить запсь о банке
  UpdateBank(data) {
    return axios
      .patch(`/api/admin/bank/update/${data.idbank}`, {
        name_bank: data.name_bank,
        license: data.license,
        url: data.url,
        phone_number: data.phone_number,
        url_images: data.url_images,
        About: data.About,

        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => resp);
  },
  //создать дебетовую карту
  CreateDebet(data) {
    return axios
      .post(
        "/api/admin/debet/create",
        {
          id_bank: data.id_bank,
          name_bank: data.name_bank,
          name_card: data.name_card,
          srok: data.srok,
          pay_system: data.pay_system,
          sms_pay: data.sms_pay,
          ostatok: data.ostatok,
          cashback: data.cashback,
          osblug_pay: data.osblug_pay,
          url_images: data.url_images,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => resp);
  },
  //получить все дебтовые карты
  GetALLDebet() {
    return axios.get("/api/admin/debet/get").then((resp) => resp);
  },
  DeleteDebet(id) {
    return axios
      .delete(`/api/admin/debet/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => resp);
  },
};

export const Auth = {
  //регистрация
  NewUser(data) {
    return axios
      .post(
        "/api/auth/registration",
        { Email: data.Email, Password: data.Password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => resp);
  },
  //авотризация юзера
  Enter(data) {
    return axios
      .post(
        "/api/auth/login",
        { Email: data.Email, Password: data.Password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        if (resp.data.token) {
          localStorage.setItem("userData", JSON.stringify(resp.data));
        }
        return resp.data;
      });
  },
  // LogOut выйти
  logout() {
    localStorage.removeItem("userData");
  },
  //вход в админку
  Admin(data) {
    return axios
      .post(
        "/api/auth/admin",
        {
          Password: data.Password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        if (resp.data.token) {
          localStorage.setItem("userData", JSON.stringify(resp.data));
        }
        return resp.data;
      });
  },
};
