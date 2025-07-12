import { Layout, Menu } from "antd";
import './App.css'
import Notes from './components/notes/Notes';

const { Header, Content, Footer } = Layout;

const items = [
  { label: 'Home', key: 'home' },
  { label: 'About', key: 'about' },
  { label: 'Contact', key: 'contact' },
]

function App() {
  return (
    <>
      <Layout style={{ minHeight: '100vh', width: '100vw' }}>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
        </Header>
        <Content style={{ padding: '10px' }}>
          <Notes />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          DMZ
        </Footer>
      </Layout>
    </>
  )
}

export default App
