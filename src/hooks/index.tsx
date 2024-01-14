import { initialiseReduxFromLocalStorage } from "../store/app.slice";
import { useAppDispatch as useDispatch } from "../store/hook";

export const useFetchInitialDataFromLocalStorage = () => {
  const dispatch = useDispatch();
  dispatch(initialiseReduxFromLocalStorage());
  return null;
};
