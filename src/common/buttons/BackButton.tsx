import { useNavigate } from "react-router-dom";

interface Props {
    iconStyle?: string;
}

const BackButton = ({ iconStyle }: Props) => {
    const navigate = useNavigate();

    const back = () => navigate(-1);

    return (
        <button onClick={back}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-8 ${iconStyle}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
        </button>
    );
};

export default BackButton;
