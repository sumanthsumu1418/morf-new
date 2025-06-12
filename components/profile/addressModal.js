const AddressModal = ({setAddressModal,modalText}) => {
    return (
      <div className="addressModal">
        <div className="addressModal__Container">
          <div className="Top">
            <div className="crossButton" onClick={() => {
              setAddressModal(false)

            }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32.719"
                height="32.719"
                viewBox="0 0 32.719 32.719"
              >
                <g
                  id="Group_1679"
                  data-name="Group 1679"
                  transform="translate(16.359 -14.945) rotate(45)"
                >
                  <line
                    id="Line_1277"
                    data-name="Line 1277"
                    x2="44.271"
                    transform="translate(0 22.135)"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <line
                    id="Line_1278"
                    data-name="Line 1278"
                    x2="44.271"
                    transform="translate(22.135 0) rotate(90)"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                </g>
              </svg>
            </div>
          </div>
          <div className="Bottom">
            <div className="bottomContainer">
              <div
                className="checkIcon"
                style={{ background: "url(/icons/successfulIcon.svg)" }}
              ></div>
              <div className="text">
                {modalText === "Password" || modalText === "Email" ? (
                  <p>{modalText} Changed Successfully</p>
                ) : (
                  <p>{modalText} Added Successfully</p>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default AddressModal;