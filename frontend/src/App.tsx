import { ConfigProvider, Layout, theme } from "antd";
import { GithubOutlined } from '@ant-design/icons';
import Notes from './components/Notes';
import styled from "styled-components";
import { useTheme } from "./components/store/ThemeContext";

const { Content, Footer } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;


function App() {
  const { theme } = useTheme();

  return (
    <>
      <ConfigProvider theme={{
        algorithm: theme === "dark" ? darkAlgorithm : defaultAlgorithm,
      }}>
        <Layout style={{ minHeight: '100vh', width: '100vw'}}>
          <Content style={{ padding: '10px' }}>
            <Notes />
          </Content>
          <StyledFooter>
            Unprivate -
            <a href="https://github.com/diegomzal/unprivate" target="_blank" rel="noopener noreferrer" style={{ color: '#888' }}>
              <GithubOutlined style={{ fontSize: 22, verticalAlign: 'middle' }} />
            </a>
          </StyledFooter>
        </Layout>
      </ConfigProvider>
    </>
  )
}

const StyledFooter = styled(Footer)`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export default App
