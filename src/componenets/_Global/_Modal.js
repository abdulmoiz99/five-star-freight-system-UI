import React, { useEffect } from "react";

export default function DeleteModal(props) {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [props.showModal])
    return (
        <>
            {props.showModal ? (
                <>
                    <div
                        className="justify-center items-center flex "
                        style={{
                            position: 'absolute',
                            top: '3%',
                            right: '50%',
                            left: '50%',
                        }}
                        onClick={() => props.setShowModal(false)}
                    >
                        <div className="relative ">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col outline-none focus:outline-none bg-white"
                                style={{ width: '400px' }}
                            >
                                {/*header*/}
                                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-xl font-semibold">
                                        Confirmation
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => props.setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none hover:shadow-xl">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-2 flex-auto">
                                    <p className="my-4 text-blueGray-500" style={{ marginLeft: '20px' }}>
                                        Are you sure to delete this record?
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-1 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => props.setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => props.deleteHandler()}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}