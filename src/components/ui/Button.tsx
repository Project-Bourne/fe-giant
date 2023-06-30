import { ButtonModel } from "@/models/ui/components.models";

function Button(props: ButtonModel) {
    const  { value, type, onClick, background, size } = props;

    const btnSize = () => {
        if(size === 'sm') return '25%' ;
        if(size === 'md') return '50%' ;
        if(size === 'lg') return '75%' ;
        if(size === 'xl') return '100%';
    }

    return(
        <button 
            className="rounded-md p-3 text-white" 
            style={{ background: `${background}`, width: `${btnSize()}` }}
            type={type}
            onClick={onClick}>{value}</button>
    )
}

export default Button;