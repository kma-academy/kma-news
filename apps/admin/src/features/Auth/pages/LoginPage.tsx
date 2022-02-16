import { Row, Col } from 'antd'
import { LoginForm } from '../components/LoginForm'

function LoginPage() {
  return (
    <Row style={{ paddingTop: 50 }}>
      <Col span={8} offset={8}>
        <LoginForm />
      </Col>
    </Row>
  )
}
export default LoginPage
