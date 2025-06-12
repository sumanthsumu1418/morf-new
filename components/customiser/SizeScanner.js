const SizeScanner = ({ showModalSize, setShowModalSize, handleResetClick }) => {
  return (
    <div className="resetCustomiser">
      <div className="resetCustomiser__Container">
        <div className="resetCustomiser__Container__resetTop">
          <div className="crossButton" onClick={() => setShowModalSize(false)}>
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
        <div className="resetCustomiser__Container__resetBottom">
          <div className="resetCustomiser__Container__resetBottom__qr">
            <img src="/images/customiser/size_qr.svg" alt="" />
          </div>

          <div className="resetCustomiser__Container__resetBottom__text">
            <p className="textHeader" style={{ marginBottom: 0 }}>
              Please scan this code and <br /> follow the steps to find the
              perfect fit size.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeScanner;
