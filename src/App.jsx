import React from 'react';

// redux
import { Provider } from 'react-redux';
import store from './Redux/store';

import { FooterContent, CustomHeader, Layout } from './components/Layout';
import { DashboardContainer, ToolbarContainer, ChartsContainer, NavContainer } from './containers';
import { ThemeProvider } from '@material-ui/styles';
import { appTheme } from './styles/theme';

import { Root, Content, Footer, presets } from 'mui-layout';

const App = () => (
    <Provider store={store}>
        <ThemeProvider theme={appTheme}>
            <Layout>
                <Root className={'asdada'} config={{ ...presets.createCozyLayout() }}>
                    <CustomHeader />
                    <NavContainer />
                    <Content>
                        <DashboardContainer>
                            <ToolbarContainer />
                            <ChartsContainer />
                        </DashboardContainer>
                    </Content>
                    <Footer>
                        <FooterContent />
                    </Footer>
                </Root>
            </Layout>
        </ThemeProvider>
    </Provider>
);

export default App;
