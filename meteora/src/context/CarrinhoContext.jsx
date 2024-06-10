import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { carrinhoReducer } from "../reducers/carrinhoReducer";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

const estadoInicial = [];
export const CarrinhoProvider = ({ children }) => {
  const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial);
  const [quantidade, setQuantidade] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  const { totalTemp, quantidadeTemp } = useMemo(() => {
    return carrinho.reduce(
      (acc, item) => ({
        quantidadeTemp: acc.quantidadeTemp + item.quantidade,
        totalTemp: acc.totalTemp + item.preco * item.quantidade,
      }),
      {
        quantidadeTemp: 0,
        totalTemp: 0,
      }
    );
  }, [carrinho]);

  useEffect(() => {
    setQuantidade(quantidadeTemp);
    setValorTotal(totalTemp);
  });

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        dispatch,
        quantidade,
        valorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};
