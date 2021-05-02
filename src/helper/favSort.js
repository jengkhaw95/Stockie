const favSort = (s, f) => {
  //  const r = s.sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase());
  //  if (f.data) {
  //    const u = [...r].reduce(
  //      (a, b) => {
  //        if (f.data.includes(b.product_no)) {
  //          a.fav.push(b);
  //        } else {
  //          a.nfav.push(b);
  //        }
  //        return a;
  //      },
  //      { fav: [], nfav: [] }
  //    );
  //    return [...u.fav, ...u.nfav];
  //  } else {
  //    return s;
  //  }
  return [...s].sort((a, b) => {
    if (f.includes(a.product_no) && f.includes(b.product_no)) {
      return 0;
    } else {
      if (f.includes(a.product_no)) {
        return -1;
      }
      return 1;
    }
  });
};

export { favSort };
