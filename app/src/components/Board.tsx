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
    items = list.filter((x) => query.filter((q) => x.normalize.indexOf(q) !== -1).length > 0);
  }

  return (
    <div className="board">
      {items.map((x, index) => (
        <div key={index} className="b_item">
          <div className="b_level">{x.level}</div>
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
            <span key={eIndex} className="b_ex">
              {ex}
            </span>
          ))}
          <div className="col_title">How To Use These Phrases In Your English: </div>
          {x.howtouses.map((ho: string, eIndex: number) => (
            <span key={eIndex} className="b_ex">
              {ho}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
