import { useState } from "react";
import { useSelector } from "react-redux";
const AddressBook = ({
  setIndex,
  showModal,
  setShowModal,
  setAddressId,
  setPageIndex,
  setAddressChangeModal,
}) => {
  const addresses = useSelector((state) => state?.user?.userData?.addresses);
  const AddressReverse = [...(addresses ? addresses : [])].reverse();

  const handleAddressDeleteClick = (id) => {
    setPageIndex("ADDRESS BOOK");

    setAddressId(id);
    setShowModal(true);
  };

  return (
    <div className="addressBook">
      <div className="addressHeader">
        <div className="addressHeaderContainer">
          <div className="addressHeading">
            <p className="addressHeadingText">YOUR ADDRESSES</p>
          </div>
          <div
            onClick={() => {
              setIndex("PERSONAL DETAILS");
            }}
            className="addressAddButton common-btn-style"
          >
            <span>ADD A NEW ADDRESS</span>
          </div>
        </div>
        <div className="addressHeaderDivider"></div>
      </div>
      <div className="addressBody">
        <div className="addressList">
          {AddressReverse.length > 0 ? (
            AddressReverse?.map((e) => (
              <div key={e.id} className="addressSingleContainer">
                <div className="addressSingle">
                  <div className="addressDetails">
                    <div className="addressName">
                      <p>{e?.company}</p>
                    </div>
                    <div className="addressComplete">
                      <p>
                        {e?.streetLine1}, {e?.streetLine2}
                      </p>
                      <p>
                        {e?.province}, {e?.city}, {e?.country?.name},{" "}
                        {e?.postalCode}
                      </p>
                    </div>
                    <div className="addressMobile">
                      <p>{e?.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="addressButtons">
                    <div
                      onClick={() => {
                        setAddressId(e.id);
                        setIndex("PERSONAL DETAILS");
                      }}
                      className="addressEditButton common-btn-style-alt"
                    >
                      <span>EDIT</span>
                    </div>
                    <div
                      onClick={() => {
                        handleAddressDeleteClick(e?.id);
                      }}
                      className="addressEditButton common-btn-style-alt"
                    >
                      <span>DELETE</span>
                    </div>
                  </div>
                </div>
                <div className="addressDividerLine"></div>
              </div>
            ))
          ) : (
            <div className="notFoundAddress">
              <div className="notFoundIcon">
                <svg width="57.799" height="51.939" viewBox="0 0 57.799 51.939">
                  <g
                    id="Group_6407"
                    data-name="Group 6407"
                    transform="translate(-945.5 -526.97)"
                  >
                    <path
                      id="Path_4529"
                      data-name="Path 4529"
                      d="M955.483,536.991a2.491,2.491,0,1,1-2.491-2.491A2.492,2.492,0,0,1,955.483,536.991Zm0,9.965a2.491,2.491,0,1,1-2.491-2.491A2.492,2.492,0,0,1,955.483,546.957Zm-2.491,12.457a2.491,2.491,0,1,0-2.491-2.491A2.492,2.492,0,0,0,952.991,559.413Z"
                      transform="translate(4.965 7.478)"
                    />
                    <path
                      id="Path_4530"
                      data-name="Path 4530"
                      d="M998.376,576.8,948.549,526.97l-2.113,2.113,4.923,4.923h-1.873a3.985,3.985,0,0,0-3.986,3.986v31.889a3.985,3.985,0,0,0,3.986,3.986h41.735l5.042,5.042Zm-10.145-5.919-4.983-4.983H967.424V562.9h12.835l-6.976-6.976h-5.86v-2.99h2.87L954.349,537h-4.863a1,1,0,0,0-1,1v31.889a1,1,0,0,0,1,1Z"
                      transform="translate(0 0)"
                      fill-rule="evenodd"
                    />
                    <path
                      id="Path_4531"
                      data-name="Path 4531"
                      d="M956.957,535l2.956,2.99h20.05V535Zm23.006,9.965H966.809l2.956,2.99h10.2Zm0,9.965h-3.3l2.956,2.99h.347Z"
                      transform="translate(11.377 7.974)"
                    />
                    <path
                      id="Path_4532"
                      data-name="Path 4532"
                      d="M992.352,567.372H988.96l2.954,2.99h.438a3.985,3.985,0,0,0,3.986-3.986V534.486a3.985,3.985,0,0,0-3.986-3.986H952.509l2.956,2.99h36.888a1,1,0,0,1,1,1v31.889A1,1,0,0,1,992.352,567.372Z"
                      transform="translate(6.96 3.506)"
                    />
                  </g>
                </svg>
              </div>
              <div className="notFoundText">
                <p>No Address have been found.</p>
              </div>
              <div
                style={{
                  margin: "25px",
                }}
                onClick={() => {
                  setIndex("PERSONAL DETAILS");
                }}
                className="AddNewAddressBody common-btn-style"
              >
                <span>ADD A NEW ADDRESS</span>
              </div>
            </div>
          )}
          <div className="addressBody__AddNewAddressContainer">
            <div
              onClick={() => {
                setIndex("PERSONAL DETAILS");
              }}
              className="AddNewAddressBody common-btn-style"
            >
              <span>ADD A NEW ADDRESS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressBook;
