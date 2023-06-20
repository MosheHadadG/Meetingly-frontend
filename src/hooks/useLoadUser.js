import { useLoadUserQuery } from "../redux/slices/authApiSlice";

const useLoadUser = (token) => {
  let name = "LoadUserOnRefresh";
  const {
    data: userData,
    error: loadUserError,
    isLoading,
    isSuccess,
  } = useLoadUserQuery(name, {
    skip: !token,
  });
  if (loadUserError) {
    return loadUserError;
  }
  return { userData, isLoading, isSuccess };
};

export default useLoadUser;
