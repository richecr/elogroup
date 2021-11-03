import { Form, Input, Button, Checkbox, Divider, notification } from "antd";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import uuid from "uuid/v4";

import { useLeadStore } from "../../providers/Lead/LeadProvider";
import "./style.css";

const openNotificationWithIcon = (type) => {
    notification[type]({
        message: "Lead salvo com sucesso!",
        description: "Seu lead foi salvo com sucesso!",
    });
};

const NewLead = ({ setTitleHeader }) => {
    const plainOptions = ["RPA", "produto Digital", "Analytics", "BPM"];
    const [content, setContent] = useState();
    const [fone, setFone] = useState();
    const [email, setEmail] = useState();

    const [opportunitiesChecked, setOpportunitiesChecked] = useState([]);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);

    const LeadStore = useLeadStore();
    const history = useHistory();

    const onFinish = () => {
        const lead_save = {
            id: uuid(),
            content: content,
            fone: fone,
            email: email,
            opportunities: opportunitiesChecked,
            status: "Cliente em Potencial",
        };
        LeadStore.save_lead(lead_save);
        setTitleHeader("Painel de Leads");
        openNotificationWithIcon("success");
        history.push("/leads");
    };

    const onChange = (list) => {
        setOpportunitiesChecked(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = (e) => {
        setOpportunitiesChecked(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const validation = (_, __, callback) => {
        if (opportunitiesChecked.length > 0) {
            return callback();
        }

        return callback("Você deve selecionar pelo menos uma oportunidade!");
    };

    return (
        <div className="form-login">
            <Form
                layout="vertical"
                name="basic"
                className="form-new-lead"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Nome"
                    name="nome"
                    tooltip="This is a required field"
                    rules={[
                        {
                            required: true,
                            message: "Por favor, insira seu nome para o Lead!",
                        },
                    ]}
                >
                    <Input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Telefone"
                    name="fone"
                    tooltip="This is a required field"
                    rules={[
                        {
                            required: true,
                            message:
                                "Por favor, insira o telefone para o Lead!",
                        },
                    ]}
                >
                    <Input
                        value={fone}
                        onChange={(e) => setFone(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="email"
                    name="email"
                    tooltip="This is a required field"
                    rules={[
                        {
                            required: true,
                            message: "Por favor, insira o email para o Lead!",
                        },
                    ]}
                >
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Oportunidades"
                    name="opportunities"
                    tooltip="This is a required field"
                    rules={[{ validator: validation }]}
                >
                    <Checkbox
                        indeterminate={indeterminate}
                        onChange={onCheckAllChange}
                        checked={checkAll}
                    >
                        Selecionar todos
                    </Checkbox>
                    <Divider />
                    <Checkbox.Group
                        className="check-opportunities"
                        options={plainOptions}
                        value={opportunitiesChecked}
                        onChange={onChange}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "20%" }}
                    >
                        Salvar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default NewLead;
