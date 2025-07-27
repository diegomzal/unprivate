import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useTheme } from "../store/ThemeContext";

function LightSwitch() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Wrapper>
            <Switch
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
                checked={theme === "dark"}
                onChange={toggleTheme}
            />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    margin-left: auto;
    align-items: center;
    gap: 8px;
    margin-top: 30px;
`
export default LightSwitch;