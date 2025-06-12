import copyTextToClipboard from "./shared/utility";

const ProductShare = ({ onClose, currSlug }) => {
  return (
    <div className="resetCustomiser">
      <div className="resetCustomiser__Container">
        <div className="resetCustomiser__Container__resetTop">
          <div className="crossButton" onClick={onClose}>
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
        <div
          style={{
            background: "#000",
            color: "#fff",
          }}
          className="resetCustomiser__Container__resetBottom resetCustomiser__Container__productShare"
        >
          <div className="socialShare-items">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/shoes/${currSlug}`}
              target="_blank"
              rel="noreferrer"
              className="socialShare-items-one"
            >
              <svg
                className="socialIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="18.514"
                height="35.656"
                viewBox="0 0 18.514 35.656"
              >
                <g
                  id="Group_311"
                  data-name="Group 311"
                  transform="translate(18.514) rotate(90)"
                >
                  <path
                    id="f"
                    d="M35.653,6.5H19.391V1.04L13.049.222V6.5H9c-1.839,0-3.085-.508-3.085-3.142V0H.249A46.328,46.328,0,0,0,0,4.889c0,4.84,2.955,8.152,8.378,8.152h4.675v5.473H19.4V13.041H35.656Z"
                    transform="translate(0)"
                    fill="#fff"
                  />
                </g>
              </svg>
              <span> Facebook </span>
            </a>

            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.origin}/shoes/${currSlug}&title=&summary=&source=`}
              target="_blank"
              rel="noreferrer"
              className="socialShare-items-one"
            >
              <svg
                className="socialIcon"
                id="Group_1"
                data-name="Group 1"
                xmlns="http://www.w3.org/2000/svg"
                width="25.593"
                height="23.374"
                viewBox="0 0 25.593 23.374"
              >
                <path
                  id="Path_1"
                  data-name="Path 1"
                  d="M.831,23.372H4.157a.831.831,0,0,0,.83-.83h0V8a.833.833,0,0,0-.829-.832H.831A.831.831,0,0,0,0,8H0V22.542a.831.831,0,0,0,.83.832h0Z"
                  fill="#fff"
                />
                <path
                  id="Path_2"
                  data-name="Path 2"
                  d="M.831,4.614H4.157a.828.828,0,0,0,.83-.826V.829A.829.829,0,0,0,4.158,0H.831A.829.829,0,0,0,0,.827V3.783a.831.831,0,0,0,.83.832h0Z"
                  fill="#fff"
                />
                <path
                  id="Path_3"
                  data-name="Path 3"
                  d="M24.34,8.856a5.08,5.08,0,0,0-2.069-1.518,7.508,7.508,0,0,0-3.016-.594A7.39,7.39,0,0,0,13.575,9.3c-.308.341-.539.271-.539-.195V8a.832.832,0,0,0-.831-.834H9.234A.831.831,0,0,0,8.4,8h0V22.544a.831.831,0,0,0,.831.829h3.327a.831.831,0,0,0,.832-.828h0V17.483a16.284,16.284,0,0,1,.381-4.33,3.575,3.575,0,0,1,1.411-1.886,4,4,0,0,1,2.326-.709,2.965,2.965,0,0,1,1.731.5,2.779,2.779,0,0,1,1.037,1.386,14.891,14.891,0,0,1,.319,3.95v6.141a.829.829,0,0,0,.829.829h3.329a.829.829,0,0,0,.831-.827V14.3a15.633,15.633,0,0,0-.269-3.352A5.5,5.5,0,0,0,24.34,8.856Z"
                  fill="#fff"
                />
              </svg>

              <span> LinkedIn </span>
            </a>

            <a
              href={`https://wa.me/?text=${window.location.origin}/shoes/${currSlug}`}
              className="socialShare-items-one"
            >
              <svg
                className="socialIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30.144"
                viewBox="0 0 30 30.144"
              >
                <g id="whatsapp.46d36d08" transform="translate(30) rotate(90)">
                  <path
                    id="Path_8"
                    data-name="Path 8"
                    d="M30.144,30,22.4,27.88a14.936,14.936,0,1,1,7.485-12.944h0a14.962,14.962,0,0,1-1.818,7.14Zm-4.783-8.285.268-.454a12.394,12.394,0,0,0,1.732-6.32h0a12.428,12.428,0,1,0-5.818,10.511l.476-.3L26.6,26.411Z"
                    transform="translate(0 0)"
                    fill="#fff"
                  />
                  <path
                    id="Path_9"
                    data-name="Path 9"
                    d="M10.452.045c-.158.094-.246.343-.433.716S8.929,2.969,8.8,3.311s-.188.59.187.839,1.215.965,1.461,1.182.283.435.095.809a10.184,10.184,0,0,1-1.853,3A11.212,11.212,0,0,1,6.112,11.22c-.375.217-.577.024-.761-.159s-.437-.373-.654-.56a2.548,2.548,0,0,0-.625-.373.683.683,0,0,0-.651.032c-.188.093-2.026.839-2.773,1.15s-.634.611-.634.839S0,12.616,0,12.865a1.366,1.366,0,0,0,.467,1A4.187,4.187,0,0,0,3.58,15.166a7.248,7.248,0,0,0,3.861-1.525,16.605,16.605,0,0,0,5.638-6.374,20.955,20.955,0,0,0,.793-2.128,5.1,5.1,0,0,0,.151-2.351A3.847,3.847,0,0,0,12.248.268a3.132,3.132,0,0,0-1.8-.222Z"
                    transform="translate(8.045 7.366)"
                    fill="#fff"
                    fillRule="evenodd"
                  />
                </g>
              </svg>

              <span> Whatsapp </span>
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${window.location.origin}/shoes/${currSlug}`}
              target="_blank"
              rel="noreferrer"
              className="socialShare-items-one"
            >
              <svg
                className="socialIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="30.239"
                height="22.21"
                viewBox="0 0 30.239 22.21"
              >
                <path
                  id="Path_410"
                  data-name="Path 410"
                  d="M27.438,5.446a15.565,15.565,0,0,1-1.4,7.247q-.191.423-.4.818a16.526,16.526,0,0,1-10.1,8.159q-.5.14-.984.243C7.754,23.364,0,18.551,0,18.551a19.789,19.789,0,0,0,6.771-.011c1.487-.311,2.906-.833,4.375-1.191-.844.206-1.758-.526-2.406-.979A11.9,11.9,0,0,1,6.8,14.653,12.339,12.339,0,0,1,4.127,2.644c.116-.373.364-1.169.542-1.658A16.336,16.336,0,0,0,16.22,6.778c-.433-1.632.333-5.726,3.994-6.591A5.617,5.617,0,0,1,25.84,1.751,9.039,9.039,0,0,0,29.4.387c-.167,1.4-2.264,3.1-2.264,3.1a11.975,11.975,0,0,0,3.1-.866A10.706,10.706,0,0,1,27.438,5.446Z"
                  transform="translate(0 0.025)"
                  fill="#fff"
                />
              </svg>

              <span> Twitter </span>
            </a>

            <div
              onClick={() => {
                copyTextToClipboard(
                  `${window.location.origin}/shoes/${currSlug}`
                );
                onClose();
              }}
              className="socialShare-items-one"
            >
              <svg
                className="socialIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="24.321"
                height="24.18"
                viewBox="0 0 24.321 24.18"
              >
                <g
                  id="Group_289"
                  data-name="Group 289"
                  transform="translate(-0.002 0.002)"
                >
                  <path
                    id="Path_411"
                    data-name="Path 411"
                    d="M10.522,17.446a1.681,1.681,0,0,1-.138.177q-1.216,1.22-2.435,2.437a3.564,3.564,0,0,1-1.55.955,2.527,2.527,0,0,1-3.185-1.621,2.49,2.49,0,0,1-.1-.4,2.961,2.961,0,0,1,.749-2.435c.082-.1.168-.192.259-.282,1.539-1.54,3.085-3.073,4.617-4.622a2.967,2.967,0,0,1,4.186-.27l.054.049a1.457,1.457,0,0,0,2.057-.123l.009-.01A1.511,1.511,0,0,0,15,9.186,5.411,5.411,0,0,0,10.976,7.6,6.185,6.185,0,0,0,6.6,9.506q-2.313,2.306-4.62,4.619A6.437,6.437,0,0,0,.2,17.264a4.855,4.855,0,0,0,.225,3.342,5.542,5.542,0,0,0,6.065,3.5,6.361,6.361,0,0,0,3.587-1.861q2.058-2.054,4.112-4.111a1.171,1.171,0,0,0,.09-.108A5.058,5.058,0,0,1,10.522,17.446Z"
                    fill="#fff"
                  />
                  <path
                    id="Path_412"
                    data-name="Path 412"
                    d="M23.844,3.549A5.778,5.778,0,0,0,14.4,1.719c-1.54,1.352-2.907,2.889-4.358,4.337a.233.233,0,0,0-.032.055,5.092,5.092,0,0,1,3.722.592c.04-.048.092-.12.153-.182.806-.807,1.6-1.625,2.425-2.413a4.534,4.534,0,0,1,1.032-.762,2.554,2.554,0,0,1,3.809,1.835,2.918,2.918,0,0,1-.9,2.566Q17.844,10.194,15.4,12.6a2.9,2.9,0,0,1-4.074.137,1.468,1.468,0,0,0-2.075.073l-.013.015a1.507,1.507,0,0,0,.041,2.131h0a5.706,5.706,0,0,0,.933.742,5.857,5.857,0,0,0,7.03-.684A57.921,57.921,0,0,0,22.5,9.794C25.083,6.69,24.3,4.648,23.844,3.549Z"
                    fill="#fff"
                  />
                </g>
              </svg>

              <span> Copy Link </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShare;
