export const isLoggedIn = () => {
  if (typeof window !== "undefined") {
    const authToken = localStorage.getItem("accessToken");
    return !!authToken;
  }
  return false;
};
