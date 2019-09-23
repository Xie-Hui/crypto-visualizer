import React from 'react';

// redux
import { Provider } from 'react-redux';
import store from './Redux/store';

import { Layout } from './components/layout';
import { DashboardContainer, ToolbarContainer, ChartsContainer } from './containers';
import { ThemeProvider } from '@material-ui/styles';
import { appTheme } from './styles/theme';

const App = () => (
    <Provider store={store}>
        <ThemeProvider theme={appTheme}>
            <Layout>
                <DashboardContainer>
                    <ToolbarContainer />
                    <ChartsContainer />
                </DashboardContainer>
            </Layout>
        </ThemeProvider>
    </Provider>
);

export default App;
