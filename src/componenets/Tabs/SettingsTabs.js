import React from "react";
import { getUserRole } from "../../shared/LoacalStorage";
import { UpdatePassword } from "../Auth/UpdatePassword";
import { ConfigCarrierCard } from "../Cards/ConfigCarrierCard";
import { ConfigShipperCard } from "../Cards/ConfigShipperCard";

const SettingsTabs = () => {
    const [openTab, setOpenTab] = React.useState(1);
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full  mb-3  rounded-lg  bg-transparent border-0">
                <div className="flex flex-wrap">
                    <div className="w-full">
                        <ul
                            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                            role="tablist"
                        >
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <a
                                    className={
                                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                        (openTab === 1
                                            ? "text-white bg-lightBlue-600"
                                            : "text-blueGray-600 bg-white")
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(1);
                                    }}
                                    data-toggle="tab"
                                    href="#updatePassword"
                                    role="tablist"
                                >
                                    Password
                                </a>
                            </li>
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <a
                                    className={
                                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                        (openTab === 2
                                            ? "text-white bg-lightBlue-600"
                                            : "text-blueGray-600 bg-white")
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(2);
                                    }}
                                    data-toggle="tab"
                                    href="#notifications"
                                    role="tablist"
                                >
                                    Notifications
                                </a>
                            </li>
                        </ul>
                        <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-3  rounded">
                            <div className=" py-1 flex-auto">
                                <div className={openTab === 1 ? "block" : "hidden"} id="updatePassword">
                                    <UpdatePassword />
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="notifications">
                                    {getUserRole() === "SHIPPER" && <ConfigShipperCard />}
                                    {getUserRole() === "CARRIER" && <ConfigCarrierCard />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
};

export default SettingsTabs;