"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Modal, ModalForm, ModalActions } from "@/components/molecules/Modal";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";

interface UpgradeModalContextData {
  requirePlan: (plan: "pro" | "enterprise") => void;
}

const UpgradeModalContext = createContext<UpgradeModalContextData>({} as UpgradeModalContextData);

export function UpgradeModalProvider({ children }: { children: ReactNode }) {
  const t = useTranslations("upgrade");
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
        title={t("titulo")}
      >
        <ModalForm>
          <Text as="p" size="sm" align="center">
            {t("descricao", { plan: planName })}
          </Text>
          <ModalActions>
            <Button type="button" variant="outline" onClick={handleClose}>
              {t("entendi")}
            </Button>
          </ModalActions>
        </ModalForm>
      </Modal>
    </UpgradeModalContext.Provider>
  );
}

export const useUpgradeModal = () => useContext(UpgradeModalContext);
