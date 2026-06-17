"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { Modal, ModalForm, ModalActions } from "@/components/molecules/Modal";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";

interface UpgradeModalContextData {
  requirePlan: (plan: "pro" | "enterprise") => void;
}

const UpgradeModalContext = createContext<UpgradeModalContextData>({} as UpgradeModalContextData);

export function UpgradeModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<{
    open: boolean;
    plan: "pro" | "enterprise";
  }>({ open: false, plan: "pro" });

  const requirePlan = useCallback((plan: "pro" | "enterprise") => {
    setModalState({ open: true, plan });
  }, []);

  const handleClose = useCallback(() => {
    setModalState((prev) => ({ ...prev, open: false }));
  }, []);

  const planName = modalState.plan === "enterprise" ? "Enterprise" : "Pro";

  return (
    <UpgradeModalContext.Provider value={{ requirePlan }}>
      {children}

      <Modal
        open={modalState.open}
        onClose={handleClose}
        title="Funcionalidade exclusiva"
      >
        <ModalForm>
          <Text as="p" size="sm" align="center">
            Esta funcionalidade está disponível apenas para assinantes{" "}
            <strong>{planName}</strong>. Faça o upgrade para desbloquear.
          </Text>
          <ModalActions>
            <Button type="button" variant="outline" onClick={handleClose}>
              Entendi
            </Button>
          </ModalActions>
        </ModalForm>
      </Modal>
    </UpgradeModalContext.Provider>
  );
}

export const useUpgradeModal = () => useContext(UpgradeModalContext);
