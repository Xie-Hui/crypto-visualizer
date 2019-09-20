import React from 'react';
import { Layout } from './components/layout';
import { DashboardContainer, ToolbarContainer, ChartsContainer } from './containers';

const App = () => (
    <Layout>
        <DashboardContainer>
            <ToolbarContainer />
            <ChartsContainer />
        </DashboardContainer>
    </Layout>
);

export default App;
