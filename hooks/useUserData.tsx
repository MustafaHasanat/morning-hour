import { User } from "@/typess/user";
import { getUserByCondition } from "@/utils/sanity/user";
import { useEffect, useState } from "react";

const useUserData = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getData = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        const sanityUser = await getUserByCondition({ id: userId });

        if (sanityUser) {
          setUser(sanityUser);
        }
      }
    };

    getData();
  }, []);

  return user;
};

export default useUserData;
