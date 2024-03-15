import React, { createContext, useContext, useState } from 'react';
import { BleManager, Device } from 'react-native-ble-plx';

interface BLEContextType {
  connectedDevice: Device | null;
  setConnectedDevice: (device: Device | null) => void;
}

const BLEContext = createContext<BLEContextType>({
  connectedDevice: null,
  setConnectedDevice: () => {},
});

export const useBLE = () => useContext(BLEContext);

export const BLEProvider: React.FC = ({ children }) => {
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  return (
    <BLEContext.Provider value={{ connectedDevice, setConnectedDevice }}>
      {children}
    </BLEContext.Provider>
  );
};
