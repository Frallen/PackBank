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
} from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import clas from "./../admin.module.scss";
//антд
const { confirm } = Modal;

const BankForm = (props) => {
  //валидация полей лицензии и номера телефона
  const validate = (values) => {
    const errors = {};

    if (!/^\d+$/.test(values.license)) {
      errors.license = "Только цифры";
    }
    //разложить массив до объекта и привести в строку тк пришедшие номера лицензий Numbers like int
    let checklicense = props.data.map((p) => p.license.toString());
    //чекаю номер из формы
    let ismatch = checklicense.includes(values.license);

    if (!idbank && ismatch) {
      errors.license = "Банк с такой лицензией уже существует";
    }

    if (!/^\d+$/.test(values.phone_number)) {
      errors.phone_number = "Только цифры";
    }

    return errors;
  };

  const [form] = Form.useForm();
  //стейт скрыть и показывать форму
  const [isShowBank, setShowBank1] = useState(false);
  const [idbank, setUpdId] = useState(null);
  //колонки таблицы
  const columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",

      responsive: ["lg"],
    },
    {
      title: "Название банка",
      dataIndex: "name_bank",
      key: "name_bank",
      responsive: ["lg"],
    },
    {
      title: "№ лицензии",
      dataIndex: "license",
      key: "license",
      responsive: ["lg"],
    },
    {
      title: "Ссылка на банк",
      dataIndex: "url",
      key: "url",
      responsive: ["lg"],
    },
    {
      title: "Номера телефонов",
      dataIndex: "phone_number",
      key: "phone_number",
      responsive: ["lg"],
    },
    {
      title: "Действие",
      key: "action",
      fixed: "right",
      render: (text, record) => (
        <Space size="small">
          <a onClick={() => ChangeBank(record)}> Изменить</a>
          <a onClick={() => showDeleteConfirm(text._id)}>Удалить</a>
        </Space>
      ),
    },
  ];
  const formik = useFormik({
    initialValues: {
      name_bank: "",
      url: "",
      license: "",
      phone_number: "",
      url_images: "",
      About: "",
    },
    validate,
    onSubmit: (values) => {
      values.idbank = idbank;
      //отправляю данные на серв
      idbank ? props.UpadteBank(values) : props.CreateBank(values);
      setUpdId(null);
      //закрываю форму
      setShowBank1(false);

      form.resetFields();
    },
  });

  let ChangeBank = (record) => {
    setShowBank1(true);
    setUpdId(record._id);
    formik.setFieldValue("name_bank", record.name_bank);
    formik.setFieldValue("url", record.url);
    formik.setFieldValue("license", record.license);
    formik.setFieldValue("phone_number", record.phone_number);
    formik.setFieldValue("url_images", record.url_images);
    formik.setFieldValue("About", record.About);
  };
  let showDeleteConfirm = (id) => {
    confirm({
      title: "Вы хотите удалить банк?",
      icon: <ExclamationCircleOutlined />,
      content: "Все данные о банке, продукты будут удаленны",
      okText: "Подвердить",
      okType: "danger",
      cancelText: "Отменить",
      onOk() {
        props.DeleteBank(id);
      },
      onCancel() {},
    });
  };

  return (
    <div>
      <div className={clas.tableBlock_header}>
        <h3>Список банков</h3>
        <Button
          type="primary"
          onClick={() => setShowBank1(true)}
          icon={<PlusOutlined />}
          className={clas.addbtn}
        >
          Добавить банк
        </Button>
      </div>
      <Table
        size="large"
        columns={columns}
        dataSource={props.data}
        className={clas.Table}
      ></Table>

      <Drawer
        title="Добавить новый банк"
        width={720}
        onClose={() => setShowBank1(false)}
        visible={isShowBank}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => setShowBank1(false)}>Отменить</Button>
            <Button type="primary">Добавить банк</Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          onFinish={formik.handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Название банка"
                rules={[{ required: true, message: "Введите название банка" }]}
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.name_bank}
                  name="name_bank"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Сайт банка"
                rules={[{ required: true, message: "Вставьте ссылку на банк" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  addonBefore="http://"
                  name="url"
                  onChange={formik.handleChange}
                  value={formik.values.url}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Номер лицензии банка"
                rules={[
                  {
                    required: true,
                    message: "Введите номер лицензии банка от ЦБ",
                  },
                ]}
                validateStatus={formik.errors.license && "error"}
                help={formik.errors.license}
              >
                <Input
                  style={{ width: "100%" }}
                  name="license"
                  onChange={formik.handleChange}
                  value={formik.values.license}
                  maxLength="13"
                  minLength="13"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Телефон банка(общий)"
                type="tel"
                rules={[{ required: true, message: "Введите телефон банка" }]}
                validateStatus={formik.errors.phone_number && "error"}
                help={formik.errors.phone_number}
              >
                <Input
                  addonBefore={"+"}
                  style={{ width: "100%" }}
                  minLength="11"
                  maxLength="11"
                  name="phone_number"
                  onChange={formik.handleChange}
                  value={formik.values.phone_number}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                rules={[{ required: true, message: "Missing first name" }]}
              >
                <Input
                  placeholder="Ссылка "
                  name="url_images"
                  onChange={formik.handleChange}
                  value={formik.values.url_images}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Описание банка"
                rules={[
                  {
                    required: true,
                    message: "Необходимо описание банка",
                  },
                ]}
              >
                <Input.TextArea
                  showCount
                  maxLength={200}
                  name="About"
                  onChange={formik.handleChange}
                  value={formik.values.About}
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

export default BankForm;
