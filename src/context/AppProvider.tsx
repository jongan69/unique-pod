import React, { createContext, useState } from 'react'
interface AppContextInterface {
    currentWalletAddress: string,
    key: string,
    email: string,
    userInfo: object,
    nfts: Array<[]>
}

export const AppContext = createContext<AppContextInterface | any>({});

export const AppProvider = (props: { children: any }) => {
    // To get in
    // Logged in: false, guest, or true: bool | string
        /*
    false -> auth stack
    guest ->  no wallet
    true -> get the async stored password 
    */

    // if email but no password, set logged in false and throw toast for check your email
    const [loggedin, setLoggedin] = useState<boolean | string>(false);
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");


    // To use
    const [userInfo, setUserInfo] = useState({});
    const [currentWalletAddress, setCurrentWalletAddress] = useState<string>("");
    const [lastBalance, setLastBalance] = useState<number>(0);
    const [seed, setSeed] = useState<string>("");
    const [key, setKey] = useState<string>("");
    const [nfts, setNfts] = useState({});

    console.log(loggedin !== 'guest' ?`User is logged in: ${loggedin}` :`User is ${loggedin}`);

    return (
        <AppContext.Provider value={{ currentWalletAddress, setCurrentWalletAddress, key, setKey, email, setEmail, userInfo, setUserInfo, nfts, setNfts, setLoggedin, loggedin, password, setPassword,lastBalance, setLastBalance, seed, setSeed }}>
            {props.children}
        </AppContext.Provider >
    )
};

export default AppProvider;

