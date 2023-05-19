import { createContext, useState } from "react";
import Pepa from "./ProfilePictures/pepa.jpg";
import Borivoj from "./ProfilePictures/borivoj.jpg";

const roles = [
    {
        id: 0,
        name: "Signed out"
    },
    {
        id: 1,
        name: "User"
    },
    {
        id: 2,
        name: "Moderator"
    }
]

const users = [
    {
        id: 0,
        role: roles[1],
        userName: 'Pepa',
        picture: Pepa
    },
    {
        id: 1,
        role: roles[2],
        userName: 'Bořivoj',
        picture: Borivoj
    }
]

const UserContext = createContext();

export function UserProvider({ children }) {
    const alreadyLogged = JSON.parse(sessionStorage.getItem('authUser'));
    const [user, setUser] = useState(alreadyLogged ?? {role: roles[0]});

    const changeUser = (id) => {
        const user = users.find(user => user.id === id);
        const result = user ?? {
            role: roles[0]
        };

        setUser(result);
        sessionStorage.setItem('authUser', JSON.stringify(result));
        const splitUrl = window.location.href.split("/");
        const otherPage = splitUrl[3];
        if (otherPage !== "") {
            window.location.replace(window.location.href.replace(otherPage, ""));
        }
    }

    const isLoggedIn = () => {
        return user.role.id > 0;
    }

    const isUser = () => {
        return user.role.id === 1;
    }

    const isModerator = () => {
        return user.role.id === 2;
    }

    const canCreate = () => {
        if (user.role.id > 0) {
            return true;
        }
        return false;
    }

    const canValidate = () => {
        if (user.role.id === 2) {
            return true;
        }
        return false;
    }

    const value = {
        user,
        users,
        changeUser,
        isLoggedIn,
        isUser,
        isModerator,
        canCreate,
        canValidate
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;