import {UserIdProfile} from "./userProfileType";

export type ContactContextType = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  users: UserIdProfile[];
};