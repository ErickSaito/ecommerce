import { Divider, Layout } from 'antd';
import 'antd/dist/antd.css';
import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import logo from './assets/logo.png'
import { PageMain } from './components/PageMain/PageMain';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Switch>
          <Layout>
            <Layout.Header className={styles.header}>
              <img alt="logo" src={logo} width="100"/>
              <Divider />
            </Layout.Header>
            <Layout.Content className={styles.contentContainer}>
              <Route exact path="/" component={PageMain} />
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Layout.Content>
          </Layout>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
