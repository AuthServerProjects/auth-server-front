import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";

// Mirrors backend ClientDropdownDto
export type SelectedClient = {
  clientId: number; // DB id → sent in X-Client-Db-Id header
  clientName: string;
} | null;

type SelectedClientContextValue = {
  selectedClient: SelectedClient;
  setSelectedClient: (client: SelectedClient) => void;
  clearSelectedClient: () => void;
};

const SelectedClientContext = createContext<
  SelectedClientContextValue | undefined
>(undefined);

export const SelectedClientProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedClient, setSelectedClientState] = useState<SelectedClient>(
    () => {
      const raw = localStorage.getItem("selected_client");
      return raw ? (JSON.parse(raw) as SelectedClient) : null;
    },
  );

  const setSelectedClient = (client: SelectedClient) => {
    setSelectedClientState(client);
    if (client) {
      localStorage.setItem("selected_client", JSON.stringify(client));
      localStorage.setItem("selected_client_db_id", String(client.clientId));
    } else {
      localStorage.removeItem("selected_client");
      localStorage.removeItem("selected_client_db_id");
    }
  };

  const value = useMemo(
    () => ({
      selectedClient,
      setSelectedClient,
      clearSelectedClient: () => setSelectedClient(null),
    }),
    [selectedClient],
  );

  return (
    <SelectedClientContext.Provider value={value}>
      {children}
    </SelectedClientContext.Provider>
  );
};

export const useSelectedClient = () => {
  const ctx = useContext(SelectedClientContext);
  if (!ctx) {
    throw new Error(
      "useSelectedClient must be used inside <SelectedClientProvider>",
    );
  }
  return ctx;
};
