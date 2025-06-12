const Reset = ({index,setIndex,state,handleResetClick}) => {
    return (
      <div
        className="accordionWrapper"
       
        onClick={() => setIndex("SOLE" === index ? null : "SOLE")}
      >
        <div className="accordion" style={{justifyContent:"center"}}>
          <div className="resetContainer">
            <div className="resetBody">Are you sure you want to reset?</div>
            <button className="resetButton" onClick={handleResetClick}>
              Click to Reset
            </button>
          </div>
        </div>
      </div>
    );
}
 
export default Reset;