import "./style.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { useTodosStore } from "../../providers/Todo/TodoProvider";
import React, { useState } from "react";

const Home = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const todoStore = useTodosStore();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="form-login">
      <Form
        name="basic"
        labelCol={{ span: 12 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Usuário"
          name="user"
          rules={[
            {
              required: true,
              message: "Por favor, insira seu nome de usuário!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              min: 8,
              pattern: new RegExp(
                "(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})"
              ),
              required: true,
              message: "Por favor, insira sua senha!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirmação Password"
          name="confirm_password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Por favor, confirme a senha escolhida!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("As senhas não conferem, por favor verifique!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Home;
