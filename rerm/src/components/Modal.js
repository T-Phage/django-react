// import './modal.css';
import { Link } from 'react-router-dom';

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName= show ? "modal display-block":"modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                {/* <button type="button" onClick={handleClose}>
                    Close
                </button> */}
                {/* <Link to={"/sign-in"}>Ok</Link> */}
            </section>
        </div>
    )
}

export default Modal