import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { AppContext } from '../../context/AppContext';
import DrawerMenu from '../../components/layout/DrawerMenu';
import BottomNav from '../../components/layout/BottomNav';
import { MockUser } from '../../constants/MockData';

export default function TabsLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const router = useRouter();
  const pathname = usePathname();

  // Sync activeTab with current route
  useEffect(() => {
    if (pathname.includes('/explorar')) setActiveTab('explorar');
    else if (pathname.includes('/certificados')) setActiveTab('certificados');
    else if (pathname.includes('/pedidos')) setActiveTab('pedidos');
    else if (pathname.includes('/perfil')) setActiveTab('perfil');
    else setActiveTab('home');
  }, [pathname]);

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    const routes: Record<string, string> = {
      home: '/(tabs)',
      explorar: '/(tabs)/explorar',
      certificados: '/(tabs)/certificados',
      pedidos: '/(tabs)/pedidos',
      perfil: '/(tabs)/perfil',
    };
    router.navigate(routes[tab] as any);
  };

  return (
    <AppContext.Provider value={{ drawerOpen, setDrawerOpen, activeTab, setActiveTab }}>
      <View style={styles.root}>
        {/* Tab screens — native tab bar hidden, we use custom BottomNav */}
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
          }}
        >
          <Tabs.Screen name="index" />
          <Tabs.Screen name="explorar" />
          <Tabs.Screen name="certificados" />
          <Tabs.Screen name="pedidos" />
          <Tabs.Screen name="perfil" />
        </Tabs>

        {/* Custom bottom navigation */}
        <BottomNav activeTab={activeTab} onTabPress={handleTabPress} />

        {/* Drawer overlay */}
        <DrawerMenu
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          activeItem={activeTab}
          userName={MockUser.name}
          userEmail={MockUser.email}
        />
      </View>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
