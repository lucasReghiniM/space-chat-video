import React from 'react';

// STYLE
import './styles.scss';

// ASSETS
import Logo from '../../assets/space-chat-logo.png'

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <div className="page-layout">
            <header className="page-layout__header">
                <img src={Logo} alt="Space Chat Logo" />
            </header>
            <main className="page-layout__content">
                {children}
            </main>
        </div>
    );
}

export default PageLayout;
