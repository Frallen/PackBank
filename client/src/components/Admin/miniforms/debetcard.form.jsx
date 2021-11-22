import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Space,
  Table,
  Modal,
  Select,
} from "antd";
import {
  CloseOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import clas from "./../admin.module.scss";
//антд
const { confirm } = Modal;
const { Option } = Select;
//валидация полей лиценции и номера телефона
const validate = (values) => {
  const errors = {};

  if (!/^\d+$/.test(values.srok)) {
    errors.srok = "Только цифры";
  }

  return errors;
};

const DebetCardForm = (props) => {
  //стейт скрыть и показывать форму
  const [isShowBank, setShowBank1] = useState(false);
  //массив платежных систем
  const systems = [
    { type: "Visa" },
    { type: "MasterCard" },
    { type: "Мир" },
    { type: "Maestro" },
  ];

  //колонки таблицы
  const columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",

      responsive: ["lg"],
    },
    {
      title: "Принадлежит",
      dataIndex: "name_bank",
      key: "name_bank",
      responsive: ["lg"],
    },
    {
      title: "Название карты",
      dataIndex: "name_card",
      key: "name_card",
      responsive: ["lg"],
    },
    {
      title: "Срок действия",
      dataIndex: "srok",
      key: "srok",
      responsive: ["sm"],
    },
    {
      title: "Платежные системы",
      dataIndex: "pay_system",
      key: "pay_system",
      responsive: ["sm"],
    },
    {
      title: "Плата за смс",
      dataIndex: "sms_pay",
      key: "sms_pay",
      responsive: ["sm"],
    },
    {
      title: "Процент на остаток",
      dataIndex: "ostatok",
      key: "ostatok",
      responsive: ["sm"],
    },
    {
      title: "Процент кешбека",
      dataIndex: "cashback",
      key: "cashback",
      responsive: ["sm"],
    },
    {
      title: "Плата за обслуживание",
      dataIndex: "osblug_pay",
      key: "osblug_pay",
      responsive: ["sm"],
    },
    {
      title: "Изображения",
      dataIndex: "url_images",
      key: "url_images",
      responsive: ["sm"],
    },
    {
      title: "Действие",
      key: "action",
      fixed: "right",
      render: (text, record) => (
        <Space size="middle">
          <a> Изменить</a>
          <a onClick={() => showDeleteConfirm(text._id)}>Удалить</a>
        </Space>
      ),
    },
  ];

  let showDeleteConfirm = (id) => {
    confirm({
      title: "Вы хотите удалить карту?",
      icon: <ExclamationCircleOutlined />,
      content: "Все данные о карте будут удаленны",
      okText: "Подвердить",
      okType: "danger",
      cancelText: "Отменить",
      onOk() {
        props.DeleteDebet(id);
      },
      onCancel() {},
    });
  };

  const formik = useFormik({
    initialValues: {
      id_bank: "",
      name_bank: "",
      name_card: "",
      srok: "",
      pay_system: "",
      url_images: "",
      sms_pay: "",
      ostatok: "",
      cashback: "",
      osblug_pay: "",
    },
    validate,
    onSubmit: (values) => {
      //ищу в банках совпадение по айди
      let bank = props.data.filter((p) => p._id === values.id_bank);
      //беру название банка
      let name_bank = bank.map((p) => p.name_bank);
      //задаю в элемент
      values.name_bank = name_bank[0];
      //отправляю данные на серв
      if (!values.osblug_pay) {
        values.osblug_pay = "Нет";
      }
      if (!values.cashback) {
        values.cashback = "Нет";
      }
      if (!values.ostatok) {
        values.ostatok = "Нет";
      }
      if (!values.sms_pay) {
        values.sms_pay = "Нет";
      }

      props.CreateDebetCard(values);
      //закрываю форму
      setShowBank1(false);
    },
  });

  return (
    <div>
      <div className={clas.tableBlock_header}>
        <h3>Список карт</h3>
        <Button
          type="primary"
          onClick={() => setShowBank1(true)}
          icon={<PlusOutlined />}
          className={clas.addbtn}
        >
          Добавить дебетовую карту
        </Button>
      </div>
      <Table
        size="large"
        columns={columns}
        dataSource={props.dataDebet}
        className={clas.Table}
      ></Table>

      <Drawer
        title="Добавить новую дебетовую карту"
        width={720}
        onClose={() => setShowBank1(false)}
        visible={isShowBank}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => setShowBank1(false)}>Отменить</Button>
            <Button type="primary">Добавить карту</Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark onFinish={formik.handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="id_bank"
                label="Название банка"
                rules={[{ required: true, message: "Введите название банка" }]}
              >
                <Select
                  // onChange={formik.handleChange}
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
            <Col span={12}>
              <Form.Item
                name="name_card"
                label="Название карты"
                rules={[{ required: true, message: "Введите название карты" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  name="name_card"
                  onChange={formik.handleChange}
                  value={formik.values.name_card}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="srok"
                label="Срок действия карты"
                rules={[
                  {
                    required: true,
                    message: "Введите срок действия карты",
                  },
                ]}
                validateStatus={formik.errors.srok && "error"}
                help={formik.errors.srok}
              >
                <Input
                  style={{ width: "100%" }}
                  name="srok"
                  onChange={formik.handleChange}
                  value={formik.values.srok}
                  maxLength="1"
                  minLength="1"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="pay_system"
                label="Платежная система"
                rules={[
                  { required: true, message: "Выберите платежную систему" },
                ]}
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.List name="url_images" label="Ссылки на изображения банка">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "first"]}
                          fieldKey={[fieldKey, "first"]}
                          rules={[
                            { required: true, message: "Missing first name" },
                          ]}
                        >
                          <Input
                            placeholder="Ссылка "
                            name="url_images"
                            onChange={formik.handleChange}
                            value={formik.values.url_images}
                          />
                        </Form.Item>

                        <CloseOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Добавить ссылку
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="sms_pay" label="Плата за смс">
                <Input
                  name="sms_pay"
                  onChange={formik.handleChange}
                  value={formik.values.sms_pay}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="ostatok" label="Введите процент на остаток ">
                <Input
                  name="ostatok"
                  onChange={formik.handleChange}
                  value={formik.values.ostatok}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="cashback" label="Процент кешбека(если есть)">
                <Input
                  name="cashback"
                  onChange={formik.handleChange}
                  value={formik.values.cashback}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="osblug_pay"
                label="Введите плату сумму за обслуживание "
              >
                <Input
                  name="osblug_pay"
                  onChange={formik.handleChange}
                  value={formik.values.osblug_pay}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={props.loading}
              >
                Добавить банк
              </Button>
            </Col>
            <Col span={12}>
              <Button block onClick={() => setShowBank1(false)}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default DebetCardForm;
