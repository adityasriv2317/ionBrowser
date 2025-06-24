function rgbaToHex(rgba: string) {
  if (rgba.startsWith("#")) {
    rgba = rgba.slice(1); // remove leading #
    return rgba;
  }

  const match = rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]*)\)?$/);
  if (!match) return null;

  let [_, r, g, b, a] = match;
  r = parseInt(r).toString(16).padStart(2, "0");
  g = parseInt(g).toString(16).padStart(2, "0");
  b = parseInt(b).toString(16).padStart(2, "0");

  if (a === "") {
    return `${r}${g}${b}`; // no alpha
  } else {
    a = Math.round(parseFloat(a) * 255)
      .toString(16)
      .padStart(2, "0");
    return `${r}${g}${b}${a}`;
  }
}

export function colorCompare(
  hex: string,
  setStatusBarAccent: (
    value: "light-content" | "dark-content" | "default"
  ) => void
) {
  const cleanHex = rgbaToHex(hex) || hex;

  const hexComponents = {
    a: cleanHex.slice(0, 2),
    g: cleanHex.slice(2, 4),
    b: cleanHex.slice(4, 6),
  };

  if (
    hexComponents.g < "90" ||
    hexComponents.b < "90" ||
    hexComponents.a < "160"
  ) {
    setStatusBarAccent("light-content");
  } else {
    setStatusBarAccent("dark-content");
  }
}
