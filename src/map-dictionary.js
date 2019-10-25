import { reduce } from './list-fn';

const Node = () => ({ next: new Map() });

const addTokenNode = (map, token, node) => {
  map.set(token, node);
  return node;
}

const ensureTokenNode = ({ next }, token) => next.get(token) || addTokenNode(next, token, Node());

const set = root => (tokens, value) => {
  reduce(tokens, ensureTokenNode, root).value = value;
}

const recursiveReadNodes = (node, tokens, i, l) => (
  i < l
    ? node && recursiveReadNodes(node.next.get(tokens[i]), tokens, i + 1, l)
    : node.value
);

const get = root => tokens => recursiveReadNodes(root, tokens, 0, tokens.length);

const MapDictionaryInterface = root => ({
  set: set(root),
  get: get(root),
});

const MapDictionary = () => MapDictionaryInterface(Node());

export default MapDictionary;
