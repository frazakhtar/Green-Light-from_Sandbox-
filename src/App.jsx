import "./styles.css";
import { useState } from "react";
function Cell({ filled, onClick, isDisabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={filled ? "cell cell-activated" : "cell"}
    />
  );
}

export default function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivated, setIsDeactivated] = useState(false);
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const deactivateCells = () => {
    setIsDeactivated(true);
    const timer = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();
        newOrder.pop();
        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivated(false);
        }
        return newOrder;
      });
    }, 1000);
  };

  const activateCells = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);
    console.log(newOrder);
    //deactivate
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };
  return (
    <div className="App">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${config[0].length}, 1fr)`,
        }}
      >
        {config.flat(1).map((value, index) => {
          return value ? (
            <Cell
              key={index}
              filled={order.includes(index)}
              onClick={() => {
                activateCells(index);
              }}
              isDisabled={order.includes(index) || isDeactivated}
            />
          ) : (
            <span></span>
          );
        })}
      </div>
    </div>
  );
}
