import React from "react";
import styled from "styled-components";
import LiveshowItem from "../../Molecules/Cards/LiveshowItem";
import ContainerHistory from "../../Templates/Layout/ContainerHistory";
import { getAllLives } from "../../util/api/liveApi";
import { useState, useEffect } from "react";

export default function SalesHistory() {
  const [allLives, setAllLives] = useState(undefined);
  useEffect(() => {
    getAllLives(({ data }) => {
      setAllLives(data.liveContentList);
    });
  }, []);
  return (
    <>
      <ContainerHistory>
        {allLives &&
          allLives.map((show) => {
            return (
              <LiveshowItem
                key={show.id}
                show={show}
                isSearch={true}
                isHistory={true}
              />
            );
          })}
        {allLives &&
          allLives.map((show) => {
            return (
              <LiveshowItem
                key={show.id}
                show={show}
                isSearch={true}
                isHistory={true}
              />
            );
          })}
        <LiveshowItem isSearch={true} isHistory={true} />
        <LiveshowItem isSearch={true} isHistory={true} />
        <LiveshowItem isSearch={true} isHistory={true} />
        <LiveshowItem isSearch={true} isHistory={true} />
        <LiveshowItem isSearch={true} isHistory={true} />
        <LiveshowItem isSearch={true} isHistory={true} />
        <LiveshowItem isSearch={true} isHistory={true} />
        <LiveshowItem isSearch={true} isHistory={true} />
        <LiveshowItem isSearch={true} isHistory={true} />
        <LiveshowItem isSearch={true} isHistory={true} />
        <LiveshowItem isSearch={true} isHistory={true} />
        <LiveshowItem isSearch={true} isHistory={true} />
      </ContainerHistory>
    </>
  );
}
