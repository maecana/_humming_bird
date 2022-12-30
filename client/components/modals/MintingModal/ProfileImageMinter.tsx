import { NextPage } from "next";
import { useState } from "react";

const ProfileImageMinter: NextPage = () => {
    const [status, setStatus] = useState<string>("initial");

    const modalChildren = (modalStatus = status) => {
        switch(modalStatus) {
            case 'iniital':
                break;
            default:
                break;
        }
    }

    return <>{modalChildren(status)}</>
};

export default ProfileImageMinter;