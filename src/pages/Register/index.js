import "./style.css";
import { Form, Input, Button } from "antd";
import { useUserStore } from "../../providers/User/UserProvider";
import { useHistory } from "react-router-dom";

const Register = () => {
  const UserStore = useUserStore();
  let history = useHistory();

  const onFinish = () => {
    UserStore.createUser();
    history.push("/");
  };

  return (
    <div className="form-login">
      <Form
        layout="vertical"
        name="basic"
        className="form-login-register"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Usuário"
          name="user"
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Por favor, insira seu nome de usuário!",
            },
          ]}
        >
          <Input
            value={UserStore.username}
            onChange={(e) => UserStore.updateField("username", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          tooltip="This is a required field"
          rules={[
            { required: true, message: "Por favor, insira sua senha!" },
            {
              pattern: new RegExp(
                "(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})"
              ),
              message:
                "Sua senha deve ter pelo menos 8 caracteres, sendo um caracter especial, um númerico e um caracter alfanúmerico.",
            },
          ]}
        >
          <Input.Password
            value={UserStore.password}
            onChange={(e) => UserStore.updateField("password", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Confirmação Password"
          name="confirm_password"
          tooltip="This is a required field"
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
          <Input.Password
            value={UserStore.confirmPassword}
            onChange={(e) =>
              UserStore.updateField("confirmPassword", e.target.value)
            }
          />
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

export default Register;
