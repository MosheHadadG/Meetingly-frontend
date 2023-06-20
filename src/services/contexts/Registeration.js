import { createContext, useState } from "react";

export const registrationContext = createContext();

function RegistrationProvider({ children }) {
  const [step, setStep] = useState(0);

  const value = {
    step,
    setStep,
  };

  return (
    <registrationContext.Provider value={value}>
      {children}
    </registrationContext.Provider>
  );
}

export default RegistrationProvider;
