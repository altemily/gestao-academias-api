import React from "react";
import style from "./Calendario.module.css";

const Calendario = () => {
  return (
    <div className="calendario">
      <h2>Calendário</h2>
      <div className="dias-da-semana">
        <span>Dom</span>
        <span>Seg</span>
        <span>Ter</span>
        <span>Qua</span>
        <span>Qui</span>
        <span>Sex</span>
        <span>Sáb</span>
      </div>
      <div className="grade-calendario">
        {[...Array(42)].map((_, i) => (
          <div key={i} className="dia">{i + 1 <= 31 ? i + 1 : ""}</div>
        ))}
      </div>
    </div>
  );
};