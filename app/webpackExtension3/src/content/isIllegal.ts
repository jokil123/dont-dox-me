import { preProcessText } from "./preProcessText";

interface outShape {
  illegal: boolean;
  pos: [number, number][];
}

export const isIllegalNode = (node: Node, illegals: string[]): outShape => {
  let out: outShape = {
    illegal: false,
    pos: [],
  };

  let text = preProcessText(node.textContent ? node.textContent : "");

  illegals.forEach((illegal) => {
    let index = text.indexOf(illegal);

    if (index >= 0) {
      out.illegal = true;
      out.pos.push([index, index + illegal.length]);
    }
  });

  return out;
};
