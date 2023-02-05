import styles from './App.module.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { HomePage, SignInPage, RegisterPage, DetailPage } from './pages/'
const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/signIn" component={SignInPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/detail/:touristRouterId" component={DetailPage}></Route>
          <Route render={() => <h1>404</h1>}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
