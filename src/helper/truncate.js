const truncate = (s) => {
  const l = 16;
  return s.length > l ? s.slice(0, l - 1) + "..." : s;
};

module.exports = truncate;
