// frontend/src/components/XpNotification.jsx
import React, { useState, useEffect } from "react";
import "./XpNotification.css";

function XpNotification({ message, initialBottom, finalBottom, onFadeOut }) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentBottom, setCurrentBottom] = useState(initialBottom - 20); // Começa ligeiramente abaixo da initialBottom para o movimento inicial
  const [opacity, setOpacity] = useState(0); // Começa invisível

  useEffect(() => {
    // Fase 1: Animar para a posição inicial visível e fade-in
    const showTimer = setTimeout(() => {
      setCurrentBottom(initialBottom); // Sobe para a posição inicial
      setOpacity(1); // Fica visível
    }, 50); // Um pequeno delay para garantir a montagem antes da transição

    // Fase 2: Começar o fade-out e continuar subindo
    const fadeOutTimer = setTimeout(() => {
      setCurrentBottom(finalBottom); // Continua subindo para a posição final
      setOpacity(0); // Começa a desaparecer
    }, 1500 + 50); // (Tempo para aparecer + tempo que fica visível antes de começar a sumir)

    // Fase 3: Remover o componente da DOM completamente após a animação
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      if (onFadeOut) {
        onFadeOut(); // Notifica o pai para remover esta notificação específica
      }
    }, 2000 + 50); // (Tempo total da animação: 0.5s (show) + 1.5s (visible) + 0.5s (fade-out) = 2.5s. Ajustei para 2s + 50ms)

    // Limpeza dos timers
    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [message, initialBottom, finalBottom, onFadeOut]); // Dependências para re-executar se props mudarem

  if (!isVisible) return null;

  return (
    <div
      className="xp-notification"
      style={{ bottom: `${currentBottom}px`, opacity: opacity }}
    >
      {message}
    </div>
  );
}

export default XpNotification;
