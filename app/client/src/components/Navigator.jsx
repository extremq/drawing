import { useNavigate } from "react-router-dom";

const Navigator = ({to, children, className}) => {
    const navigate = useNavigate();

    const handleNavigation = (event) => {
        event.preventDefault();
        navigate(to);
    }

    return  (
        <a className={className} href={to} onClick={handleNavigation}>
            {children}
        </a>
    )
}

export default Navigator;