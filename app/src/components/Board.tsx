import React from "react";
import Highlighter from "react-highlight-words";

interface Props {
  list: any[];
  lookup: string;
}

function Board(props: Props) {
  const { list = [], lookup } = props;
  const query = lookup
    .toLowerCase()
    .split(" ")
    .filter((x) => !!x && x.length > 1);

  let items = list;

  if (query.length) {
    // filter at level 1
    const stList = list.filter((x) => x.search_level_st.indexOf(lookup.toLowerCase()) !== -1);

    // filter at level 2
    const ndList = list.filter(
      (x) =>
        query.filter((q) => x.search_level_nd.indexOf(q) !== -1).length > 0 &&
        stList.filter((s) => s.header === x.header).length === 0
    );

    // filter at level 3
    const rdList = list.filter(
      (x) =>
        query.filter((q) => x.search_level_rd.indexOf(q) !== -1).length > 0 &&
        stList.filter((s) => s.header === x.header).length === 0 &&
        ndList.filter((n) => n.header === x.header).length === 0
    );

    items = [...stList, ...ndList, ...rdList];
  }

  return (
    <div className="board">
      {items.map((x, index) => (
        <div key={index} className="b_item">
          <div className="b_levels">
            {x.levels.map((l: string, index: number) => (
              <div className="b_level" key={index}>
                # {l}
              </div>
            ))}
          </div>
          <Highlighter
            highlightClassName="highlighted"
            className="b_header"
            searchWords={query}
            autoEscape={true}
            textToHighlight={x.header}
          />
          <Highlighter
            highlightClassName="highlighted"
            className="b_sumary"
            searchWords={query}
            autoEscape={true}
            textToHighlight={x.sumary}
          />
          <div className="col_title">10 expressions to Use In Speaking And Writing:</div>
          {x.expressions.map((ex: string, eIndex: number) => (
            <Highlighter
              key={eIndex}
              highlightClassName="highlighted"
              className="b_ex"
              searchWords={query}
              autoEscape={true}
              textToHighlight={ex}
            />
          ))}
          <div className="col_title">How To Use These Phrases In Your English: </div>
          {x.howtouses.map((ho: string, eIndex: number) => (
            <Highlighter
              key={eIndex}
              highlightClassName="highlighted"
              className="b_ex"
              searchWords={query}
              autoEscape={true}
              textToHighlight={ho}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
