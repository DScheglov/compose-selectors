const assign = state => fn => {
  state.fn = fn;
}

const manageable = fn => {
    const state = { fn };

    function manageableFunc() {
      return state.fn.apply(void 0, arguments);
    }

    manageableFunc.assign = assign(state);
    manageableFunc.clone = () => manageable(state.fn);

    return manageableFunc;
  }
}