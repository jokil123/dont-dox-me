import './button.scss';

interface buttonProps {
     label: string,
     onClick?: any;
}

export const Button = (props : buttonProps) => {
     return (
          <div className="button">
               <button onClick={props.onClick}>{props.label}</button>
          </div>
        
     )
}