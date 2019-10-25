const assign = state => fn => {
  state.fn = fn;
}

const managed = fn => {
    const state = { fn };

    function managedFunc() {
      return state.fn.apply(void 0, arguments);
    }

    managedFunc.assign = assign(state);
    managedFunc.clone = () => managed(state.fn);
    return managedFunc;
  }
}