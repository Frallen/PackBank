import { Button, Checkbox, Col, Row, Select } from "antd";
import React from "react";
import clas from "./debit.module.scss";
import logoalf from "./../../images/alfa.webp";
import { Form } from "antd";
import { useFormik } from "formik";

let Debit = (props) => {
  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: {
      id_bank: "",
      name_bank: "",
      name_card: "",
      pay_system: "",
      sms_pay: "",
      ostatok: "",
      cashback: "",
      osblug_pay: "",
    },
    onSubmit: (values) => {
      //ищу в банках совпадение по айди
      let bank = props.dataDebet.filter((p) => p.id_bank === values.id_bank);
      //беру название банка
      let name_bank = bank.map((p) => p.name_bank);
      //задаю в элемент
      values.name_bank = name_bank[0];
    },
  });
  //массив платежных систем
  const systems = [
    { type: "Visa" },
    { type: "MasterCard" },
    { type: "Мир" },
    { type: "Maestro" },
  ];

  const { Option } = Select;
  return (
    <div className={clas.Main}>
      <Form
        className={clas.Filters}
        form={form}
        layout="horizontal"
        onFinish={formik.handleSubmit}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="Банки">
              <Select
                value={formik.values.id_bank}
                onChange={(value) => {
                  formik.setFieldValue("id_bank", value);
                }}
                onSelect={formik.handleChange}
              >
                {
                  //беру данные об банках,а именно id и название банка и пихаю в селект
                  props.data &&
                    props.data.map((p, index) => (
                      <Option key={index} value={p._id}>
                        {p.name_bank}
                      </Option>
                    ))
                }
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Платежная система"
              validateStatus={formik.errors.pay_system && "error"}
              help={formik.errors.pay_system}
            >
              <Select
                onChange={(value) => {
                  formik.setFieldValue("pay_system", value);
                }}
                value={formik.values.pay_system}
              >
                {systems.map((p, index) => (
                  <Select.Option key={index} value={p.type}>
                    {p.type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Form.Item>
            <Checkbox onChange={formik.values.cashback}>Кешбек</Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox onChange={formik.values.sms_pay}>
              Бесплатное sms обслуживание
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Checkbox onChange={formik.values.osblug_pay}>
              Бесплатное обслуживание карты
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox onChange={formik.values.ostatok}>
              Процент на остаток
            </Checkbox>
          </Form.Item>
        </Row>
        <Row gutter={16}>
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={props.loading}
          >
            Добавить банк
          </Button>
        </Row>
      </Form>

      <div className={clas.card_block}>
        {props.dataDebet.map((i) => (
          <div className={clas.card}>
            <div className={clas.card_img}>
              <img src={i.url_images}  key={i.id} alt="" />
            </div>
            <div className={clas.card_info}>
              <ul className={clas.card_info_atribut}>
                <li className={clas.card_info_atribut_item}  key={i.id}>{i.name_card}</li>
                <li className={clas.card_info_atribut_item} key={i.id}>{i.name_bank}</li>
                <li className={clas.card_info_atribut_item} key={i.id}>Срок выпуска {i.srok}</li>
                <li className={clas.card_info_atribut_item} key={i.id}>Платежная система {i.pay_system}</li>
                <li className={clas.card_info_atribut_item} key={i.id}>Плата за смс {i.sms_pay}</li>
                <li className={clas.card_info_atribut_item} key={i.id}>Остаток по карте {i.ostatok}</li>
                <li className={clas.card_info_atribut_item} key={i.id}>Кешбек {i.cashback}</li>
                <li className={clas.card_info_atribut_item} key={i.id}>Плата за обслуживание {i.osblug_pay}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Debit;
