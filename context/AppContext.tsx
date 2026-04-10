import { createContext, useContext } from 'react';

interface AppContextType {
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  activeTab: string;
  setActiveTab: (t: string) => void;
}

// Export the context object so TabsLayout can use AppContext.Provider directly
export const AppContext = createContext<AppContextType>({
  drawerOpen: false,
  setDrawerOpen: () => {},
  activeTab: 'home',
  setActiveTab: () => {},
});

export const useAppContext = () => useContext(AppContext);
