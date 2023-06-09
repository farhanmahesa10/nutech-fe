const cutSentence = (data, cut) => {
  if (!data) {
    return;
  }
  return data.length > cut - 3 ? data.substring(0, cut - 3) + "..." : data;
};

const integrateImage = (url) => {
  return `${process.env.REACT_APP_BASE_API_URL}/${url}` || "";
};

const spliter = (str = "", separator = ",") => {
  return str.split(separator);
};

const scrollToId = (id) => {
  const element = document.getElementById(id);
  element.scrollIntoView({
    behavior: "smooth",
  });
};

const baseUrl = (path) => {
  return `${process.env.REACT_APP_BASE_URL}${path}` || "";
};
const baseAPIUrl = (path) => {
  return `${process.env.REACT_APP_BASE_API_URL}${path}` || "";
};

const IDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});
export {
  IDR,
  cutSentence,
  integrateImage,
  spliter,
  scrollToId,
  baseUrl,
  baseAPIUrl,
};
