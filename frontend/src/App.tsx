import { Layout } from "antd";
import { GithubOutlined } from '@ant-design/icons';
import './App.css'
import Notes from './components/Notes';

const { Content, Footer } = Layout;

function App() {
  return (
    <>
      <Layout style={{ minHeight: '100vh', width: '100vw' }}>
        <Content style={{ padding: '10px' }}>
          <Notes />
        </Content>
        <Footer style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          Unprivate -
          <a href="https://github.com/diegomzal/unprivate" target="_blank" rel="noopener noreferrer" style={{ color: '#888' }}>
            <GithubOutlined style={{ fontSize: 22, verticalAlign: 'middle' }} />
          </a>
        </Footer>
      </Layout>
    </>
  )
}

export default App
