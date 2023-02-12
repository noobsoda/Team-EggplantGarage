import React from "react";
import styled from "styled-components";
import LiveshowItem from "../../Molecules/Cards/LiveshowItem";
import ContainerHistory from "../../Templates/Layout/ContainerHistory";
import { getSalesHistory } from "../../util/api/liveApi";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function SalesHistory() {
  const [lives, setLives] = useState(undefined);
  const myId = useSelector((state) => state.user.userInfo.id);
  useEffect(() => {
    getSalesHistory(myId, ({ data }) => {
      console.log(data);
      //우선 뭐들어오는지 보고
      setLives(data);
    });
  }, []);
  return (
    <>
      <ContainerHistory>
        {lives &&
          lives.map((show) => {
            return (
              <LiveshowItem
                key={show.id}
                show={show}
                isSearch={true}
                isHistory={true}
              />
            );
          })}
      </ContainerHistory>
    </>
  );
}
