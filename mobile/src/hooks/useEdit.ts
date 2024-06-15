import { useContext } from "react";
import { EditSessionInfosContext } from "../context/editSessionInfos";

export function useEdit() {
  return useContext(EditSessionInfosContext)
}
