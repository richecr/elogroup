import { Form, Input, Button, notification } from "antd";
import { Link, useHistory } from "react-router-dom";

import { useUserStore } from "../../providers/User/UserProvider";

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Login incorreto!",
    description: "Nome de usuário ou senha incorreto!",
  });
};

const Login = ({ setTitleHeader }) => {
  const UserStore = useUserStore();
  let history = useHistory();

  const onFinish = () => {
    UserStore.login();
    if (UserStore.is_logged) {
      setTitleHeader("Painel de Leads");
      history.push("/leads");
    } else {
      openNotificationWithIcon("error");
    }
  };

  return (
    <div className="form-login">
      <Form
        layout="vertical"
        name="basic"
        className="form-login-register"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 25 }}
        onFinish={onFinish}
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
          <Input
            value={UserStore.username}
            onChange={(e) => UserStore.updateField("username", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
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

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Entrar
          </Button>
        </Form.Item>
      </Form>

      <Link to="/register">Registrar-se</Link>
    </div>
  );
};

export default Login;
