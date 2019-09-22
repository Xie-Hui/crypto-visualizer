import React from 'react';
import { Layout } from './components/layout';
import { DashboardContainer, ToolbarContainer, ChartsContainer } from './containers';
import { ThemeProvider } from '@material-ui/styles';
import { appTheme } from './styles/theme';

const App = () => (
    <ThemeProvider theme={appTheme}>
        <Layout>
            <DashboardContainer>
                <ToolbarContainer />
                <ChartsContainer />
            </DashboardContainer>
        </Layout>
    </ThemeProvider>
);

export default App;
